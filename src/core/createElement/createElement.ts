import type { TextVNode, VNode } from './createElement.types';

function createTextElement(text: string): TextVNode {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: [],
		},
	};
}

export function createElement({
	type,
	props,
	children,
}: {
	type: string;
	props?: Record<string, unknown>;
	children: (VNode | string)[];
}): VNode {
	return {
		type,
		props: {
			...(props || {}),
			children: children.map((child) =>
				typeof child === 'object' ? child : createTextElement(child),
			),
		},
	};
}
