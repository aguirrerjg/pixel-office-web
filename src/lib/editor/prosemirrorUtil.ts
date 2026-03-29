import { DOMParser as ProseDOMParser, DOMSerializer, type Schema, type MarkType, type NodeType, type Node as ProseMirrorNode } from 'prosemirror-model';
import type { EditorState, Transaction } from 'prosemirror-state';

// ─── toHTML ────────────────────────────────────────────────────────────────
// Serialize an EditorState to an HTML string via DOMSerializer.
export function toHTML(state: EditorState): string {
	const fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(
		state.doc.content
	);
	const div = document.createElement('div');
	div.appendChild(fragment);
	return div.innerHTML;
}

// ─── toPlainText ───────────────────────────────────────────────────────────
// Extract plain text content from an EditorState.
export function toPlainText(state: EditorState): string {
	return state.doc.textContent;
}

// ─── fromHTML ──────────────────────────────────────────────────────────────
// Parse an HTML string into a ProseMirror document node using the given schema.
export function fromHTML(schema: Schema, content: string): ProseMirrorNode {
	const div = document.createElement('div');
	div.innerHTML = content;
	return ProseDOMParser.fromSchema(schema).parse(div);
}

// ─── markActive ───────────────────────────────────────────────────────────
// Returns true if the given mark type is active at the current selection.
export function markActive(state: EditorState, type: MarkType): boolean {
	const { from, $from, to, empty } = state.selection;
	if (empty) {
		return !!type.isInSet(state.storedMarks || $from.marks());
	}
	return state.doc.rangeHasMark(from, to, type);
}

// ─── canInsert ─────────────────────────────────────────────────────────────
// Check whether a node of the given type can be inserted at the current selection.
export function canInsert(state: EditorState, nodeType: NodeType): boolean {
	const { $from } = state.selection;
	for (let d = $from.depth; d >= 0; d--) {
		const index = $from.index(d);
		if ($from.node(d).canReplaceWith(index, index, nodeType)) {
			return true;
		}
	}
	return false;
}

// ─── blockTypeActive ──────────────────────────────────────────────────────
// Returns true if the current selection is inside a block of the given node type
// and (optionally) matching attrs.
export function blockTypeActive(
	state: EditorState,
	nodeType: NodeType,
	attrs?: Record<string, unknown>
): boolean {
	const { $from, to } = state.selection;
	let sameBlock = false;
	state.doc.nodesBetween($from.pos, to, (node) => {
		if (node.type === nodeType) {
			if (!attrs) {
				sameBlock = true;
			} else {
				sameBlock = Object.entries(attrs).every(
					([key, val]) => node.attrs[key] === val
				);
			}
		}
	});
	return sameBlock;
}

// ─── linkActive ───────────────────────────────────────────────────────────
// Returns true if the cursor/selection is inside a link mark.
export function linkActive(state: EditorState): boolean {
	const linkType = state.schema.marks.link;
	if (!linkType) return false;
	return markActive(state, linkType);
}

// ─── markApplies ──────────────────────────────────────────────────────────
// Check whether a mark type can be applied to any of the given ranges.
export function markApplies(
	doc: ProseMirrorNode,
	ranges: readonly { $from: ReturnType<ProseMirrorNode['resolve']>; $to: ReturnType<ProseMirrorNode['resolve']> }[],
	type: MarkType
): boolean {
	for (const { $from, $to } of ranges) {
		let can = $from.depth === 0 ? doc.inlineContent && doc.type.allowsMarkType(type) : false;
		doc.nodesBetween($from.pos, $to.pos, (node) => {
			if (can) return false;
			can = node.inlineContent && node.type.allowsMarkType(type);
		});
		if (can) return true;
	}
	return false;
}

// ─── getMarkAtCurrentSelection ────────────────────────────────────────────
// Returns the mark of the given type at the cursor position (if any).
export function getMarkAtCurrentSelection(
	state: EditorState,
	type: MarkType
): import('prosemirror-model').Mark | undefined {
	const { $from } = state.selection;
	return type.isInSet(state.storedMarks || $from.marks()) ?? undefined;
}

// ─── markExtend ───────────────────────────────────────────────────────────
// Extends the current selection to cover the full extent of a mark of the given type
// surrounding the cursor. Returns a transaction or null if not applicable.
export function markExtend(
	state: EditorState,
	type: MarkType
): Transaction | null {
	const { $from, $to } = state.selection;
	const startMark = type.isInSet(state.storedMarks || $from.marks());
	if (!startMark) return null;

	let startPos = $from.pos;
	let endPos = $to.pos;

	// Walk backwards to find start of mark
	while (startPos > 0) {
		const resolved = state.doc.resolve(startPos - 1);
		if (!startMark.isInSet(resolved.marks())) break;
		startPos--;
	}

	// Walk forwards to find end of mark
	const docSize = state.doc.content.size;
	while (endPos < docSize) {
		const resolved = state.doc.resolve(endPos + 1);
		if (!startMark.isInSet(resolved.marks())) break;
		endPos++;
	}

	if (startPos === $from.pos && endPos === $to.pos) return null;

	const tr = state.tr.setSelection(
		state.selection.constructor.create
			? (state.selection.constructor as { create: (doc: ProseMirrorNode, anchor: number, head: number) => import('prosemirror-state').Selection }).create(state.doc, startPos, endPos)
			: state.tr.selection
	);
	return tr;
}
