import { Schema } from 'prosemirror-model';

export const singleLinePlainTextSchema = new Schema({
	nodes: {
		doc: { content: 'text*' },
		text: { inline: true }
	},
	marks: {}
});

export const multiLinePlainTextSchema = new Schema({
	nodes: {
		doc: { content: 'paragraph+' },
		paragraph: {
			content: 'inline*',
			group: 'block',
			parseDOM: [{ tag: 'p' }],
			toDOM() { return ['p', 0]; }
		},
		text: { group: 'inline' },
		hard_break: {
			inline: true,
			group: 'inline',
			selectable: false,
			parseDOM: [{ tag: 'br' }],
			toDOM() { return ['br']; }
		}
	},
	marks: {}
});

export const singleLineRichTextSchema = new Schema({
	nodes: {
		doc: { content: 'text*' },
		text: { inline: true }
	},
	marks: {
		link: {
			attrs: { href: {}, title: { default: null } },
			inclusive: false,
			parseDOM: [{
				tag: 'a[href]',
				getAttrs(dom: HTMLElement | string) {
					if (typeof dom === 'string') return {};
					return { href: (dom as HTMLElement).getAttribute('href'), title: (dom as HTMLElement).getAttribute('title') };
				}
			}],
			toDOM(node) { const { href, title } = node.attrs; return ['a', { href, title }, 0]; }
		},
		em: {
			parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
			toDOM() { return ['em', 0]; }
		},
		strong: {
			parseDOM: [
				{ tag: 'strong' }, { tag: 'b' },
				{ style: 'font-weight', getAttrs(value: HTMLElement | string) { return /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null; } }
			],
			toDOM() { return ['strong', 0]; }
		}
	}
});

export const multiLineRichTextSchema = new Schema({
	nodes: {
		doc: { content: 'block+' },
		paragraph: {
			content: 'inline*',
			group: 'block',
			parseDOM: [{ tag: 'p' }],
			toDOM() { return ['p', 0]; }
		},
		blockquote: {
			content: 'block+',
			group: 'block',
			defining: true,
			parseDOM: [{ tag: 'blockquote' }],
			toDOM() { return ['blockquote', 0]; }
		},
		heading: {
			attrs: { level: { default: 1 } },
			content: 'inline*',
			group: 'block',
			defining: true,
			parseDOM: [
				{ tag: 'h2', getAttrs() { return { level: 1 }; } },
				{ tag: 'h3', getAttrs() { return { level: 2 }; } },
				{ tag: 'h4', getAttrs() { return { level: 3 }; } }
			],
			toDOM(node) { return [`h${node.attrs.level + 1}`, 0]; }
		},
		image: {
			inline: false,
			attrs: { src: {}, alt: { default: null }, title: { default: null }, width: { default: null }, height: { default: null } },
			group: 'block',
			draggable: true,
			parseDOM: [{
				tag: 'img[src]',
				getAttrs(dom: HTMLElement | string) {
					if (typeof dom === 'string') return {};
					const el = dom as HTMLElement;
					return { src: el.getAttribute('src'), alt: el.getAttribute('alt'), title: el.getAttribute('title'), width: el.getAttribute('width'), height: el.getAttribute('height') };
				}
			}],
			toDOM(node) {
				const { src, alt, title, width, height } = node.attrs;
				const attrs: Record<string, string | null> = { src, alt, title };
				if (width) attrs.width = width;
				if (height) attrs.height = height;
				return ['img', attrs];
			}
		},
		ordered_list: {
			content: 'list_item+',
			group: 'block',
			attrs: { order: { default: 1 } },
			parseDOM: [{
				tag: 'ol',
				getAttrs(dom: HTMLElement | string) {
					if (typeof dom === 'string') return {};
					const el = dom as HTMLElement;
					return { order: el.hasAttribute('start') ? +el.getAttribute('start')! : 1 };
				}
			}],
			toDOM(node) { return node.attrs.order === 1 ? ['ol', 0] : ['ol', { start: node.attrs.order }, 0]; }
		},
		bullet_list: {
			content: 'list_item+',
			group: 'block',
			parseDOM: [{ tag: 'ul' }],
			toDOM() { return ['ul', 0]; }
		},
		list_item: {
			content: 'paragraph block*',
			defining: true,
			parseDOM: [{ tag: 'li' }],
			toDOM() { return ['li', 0]; }
		},
		text: { group: 'inline' },
		hard_break: {
			inline: true,
			group: 'inline',
			selectable: false,
			parseDOM: [{ tag: 'br' }],
			toDOM() { return ['br']; }
		}
	},
	marks: {
		link: {
			attrs: { href: {}, title: { default: null } },
			inclusive: false,
			parseDOM: [{
				tag: 'a[href]',
				getAttrs(dom: HTMLElement | string) {
					if (typeof dom === 'string') return {};
					const el = dom as HTMLElement;
					return { href: el.getAttribute('href'), title: el.getAttribute('title') };
				}
			}],
			toDOM(node) { const { href, title } = node.attrs; return ['a', { href, title }, 0]; }
		},
		em: {
			parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
			toDOM() { return ['em', 0]; }
		},
		strong: {
			parseDOM: [
				{ tag: 'strong' }, { tag: 'b' },
				{ style: 'font-weight', getAttrs(value: HTMLElement | string) { return /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null; } }
			],
			toDOM() { return ['strong', 0]; }
		}
	}
});
