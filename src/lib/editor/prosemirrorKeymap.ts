import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import {
	toggleMark,
	setBlockType,
	wrapIn,
	joinUp,
	lift,
	selectParentNode,
	chainCommands,
	exitCode
} from 'prosemirror-commands';
import { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import type { Schema } from 'prosemirror-model';
import type { Command } from 'prosemirror-state';
import type { Plugin } from 'prosemirror-state';

// ─── buildKeymap ──────────────────────────────────────────────────────────
// Builds a keymap plugin for the given schema. Schema must have the marks/nodes
// used in the bindings (bold, italic, heading, lists, blockquote, hard_break).
export function buildKeymap(schema: Schema): Plugin {
	const keys: Record<string, Command> = {};

	// ── Undo / Redo ──────────────────────────────────────────────────────
	keys['Mod-z'] = undo;
	keys['Shift-Mod-z'] = redo;
	keys['Mod-y'] = redo; // Windows-style redo

	// ── Text formatting ──────────────────────────────────────────────────
	if (schema.marks.strong) {
		const bold = toggleMark(schema.marks.strong);
		keys['Mod-b'] = bold;
		keys['Mod-B'] = bold;
	}

	if (schema.marks.em) {
		const italic = toggleMark(schema.marks.em);
		keys['Mod-i'] = italic;
		keys['Mod-I'] = italic;
	}

	// ── Lists ────────────────────────────────────────────────────────────
	if (schema.nodes.bullet_list) {
		keys['Shift-Ctrl-8'] = wrapInList(schema.nodes.bullet_list);
	}

	if (schema.nodes.ordered_list) {
		keys['Shift-Ctrl-9'] = wrapInList(schema.nodes.ordered_list);
	}

	if (schema.nodes.list_item) {
		keys['Enter'] = splitListItem(schema.nodes.list_item);
		keys['Mod-['] = liftListItem(schema.nodes.list_item);
		keys['Mod-]'] = sinkListItem(schema.nodes.list_item);
		keys['Mod-BracketLeft'] = liftListItem(schema.nodes.list_item);
	}

	// ── Blockquote ───────────────────────────────────────────────────────
	if (schema.nodes.blockquote) {
		keys['Ctrl->'] = wrapIn(schema.nodes.blockquote);
	}

	// ── Headings (Shift-Ctrl-1 through Shift-Ctrl-6, mapped to levels 1-3) ─
	if (schema.nodes.heading) {
		// h2 = level 1
		keys['Shift-Ctrl-1'] = setBlockType(schema.nodes.heading, { level: 1 });
		// h3 = level 2
		keys['Shift-Ctrl-2'] = setBlockType(schema.nodes.heading, { level: 2 });
		// h4 = level 3
		keys['Shift-Ctrl-3'] = setBlockType(schema.nodes.heading, { level: 3 });
		// Extra heading shortcuts (levels 4-6 map back to 1-3)
		keys['Shift-Ctrl-4'] = setBlockType(schema.nodes.heading, { level: 1 });
		keys['Shift-Ctrl-5'] = setBlockType(schema.nodes.heading, { level: 2 });
		keys['Shift-Ctrl-6'] = setBlockType(schema.nodes.heading, { level: 3 });
	}

	// ── Paragraph ────────────────────────────────────────────────────────
	if (schema.nodes.paragraph) {
		keys['Shift-Ctrl-0'] = setBlockType(schema.nodes.paragraph);
	}

	// ── Join up / Lift / Select parent ───────────────────────────────────
	keys['Alt-ArrowUp'] = joinUp;
	keys['Mod-BracketLeft'] = lift;
	keys['Escape'] = selectParentNode;

	// ── Hard break ───────────────────────────────────────────────────────
	if (schema.nodes.hard_break) {
		const hardBreakCmd: Command = chainCommands(exitCode, (state, dispatch) => {
			if (dispatch) {
				dispatch(
					state.tr
						.replaceSelectionWith(schema.nodes.hard_break.create())
						.scrollIntoView()
				);
			}
			return true;
		});
		keys['Mod-Enter'] = hardBreakCmd;
		keys['Shift-Enter'] = hardBreakCmd;
	}

	return keymap(keys);
}

// ─── historyPlugin ────────────────────────────────────────────────────────
// Export history plugin separately so callers can add it to their plugin list.
export { history };
