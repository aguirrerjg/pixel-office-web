import { markApplies, canInsert } from '$lib/editor/prosemirrorUtil';
import type { EditorState } from 'prosemirror-state';

export function createLink(state: EditorState, ...rest: unknown[] /*, dispatch, cb*/) {
	const schema = state.schema;
	const markType = schema.marks.link;
	if (!markType) return false;
	// @ts-ignore
	const { $cursor, ranges, from, to } = state.selection;
	const allowed = markApplies(state.doc, ranges, markType);
	const hasLink = state.doc.rangeHasMark(from, to, markType);
	// Disable if either the cursor is collapsed, the mark does not apply or is already present
	if ($cursor || !allowed || hasLink) return false;
	return true;
}

export function insertImage(
	state: EditorState,
	...rest: unknown[] /*, dispatch, editorView, src*/
) {
	const nodeType = state.schema.nodes.image;
	if (!nodeType) return false;
	if (!canInsert(state, nodeType)) return false;
	return true;
}
