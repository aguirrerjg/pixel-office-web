import {
	inputRules,
	wrappingInputRule,
	textblockTypeInputRule,
	smartQuotes,
	ellipsis,
	emDash,
	type InputRule
} from 'prosemirror-inputrules';
import type { Schema } from 'prosemirror-model';
import type { Plugin } from 'prosemirror-state';

// ─── blockquoteRule ───────────────────────────────────────────────────────
// "> " at start of a textblock → wrap in blockquote
function blockquoteRule(schema: Schema): InputRule | null {
	if (!schema.nodes.blockquote) return null;
	return wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote);
}

// ─── orderedListRule ──────────────────────────────────────────────────────
// "1. " at start → ordered list (captures the starting number)
function orderedListRule(schema: Schema): InputRule | null {
	if (!schema.nodes.ordered_list) return null;
	return wrappingInputRule(
		/^(\d+)\.\s$/,
		schema.nodes.ordered_list,
		(match) => ({ order: +match[1] }),
		(match, node) => node.childCount + node.attrs.order === +match[1]
	);
}

// ─── bulletListRule ───────────────────────────────────────────────────────
// "- " or "* " at start → bullet list
function bulletListRule(schema: Schema): InputRule | null {
	if (!schema.nodes.bullet_list) return null;
	return wrappingInputRule(/^\s*([-*])\s$/, schema.nodes.bullet_list);
}

// ─── headingRule ──────────────────────────────────────────────────────────
// "# " → h2 (level 1), "## " → h3 (level 2), "### " → h4 (level 3)
// Levels map: 1 hashes = level 1 (h2), 2 = level 2 (h3), 3 = level 3 (h4)
function headingRule(schema: Schema, maxLevel: number): InputRule | null {
	if (!schema.nodes.heading) return null;
	return textblockTypeInputRule(
		new RegExp('^(#{1,' + maxLevel + '})\\s$'),
		schema.nodes.heading,
		(match) => ({ level: match[1].length })
	);
}

// ─── buildInputRules ──────────────────────────────────────────────────────
// Returns an inputRules plugin for the given schema.
// Rules included: smartQuotes, ellipsis, emDash, blockquote, ordered list,
// bullet list, headings (up to level 3).
export function buildInputRules(schema: Schema): Plugin {
	const rules: InputRule[] = [
		...smartQuotes,
		ellipsis,
		emDash
	];

	const bq = blockquoteRule(schema);
	if (bq) rules.push(bq);

	const ol = orderedListRule(schema);
	if (ol) rules.push(ol);

	const ul = bulletListRule(schema);
	if (ul) rules.push(ul);

	const h = headingRule(schema, 3);
	if (h) rules.push(h);

	return inputRules({ rules });
}
