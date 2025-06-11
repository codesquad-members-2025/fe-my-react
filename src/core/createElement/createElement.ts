import { EMPTY_CHILDREN, TEXT_ELEMENT } from './createElement.constants';
import type { TextVNode, VNode } from './createElement.types';

function createTextElement(text: string): TextVNode {
	return {
		type: TEXT_ELEMENT,
		props: {
			nodeValue: text,
			children: EMPTY_CHILDREN,
		},
		key: null,
	};
}

export function createElement(
	type: string,
	props: {
		[key: string]: unknown;
		children: (VNode | string)[];
	},
	key: string | null = null,
): VNode {
	return {
		type,
		props: {
			...props,
			children: props.children.map((child) =>
				typeof child === 'object' ? child : createTextElement(child),
			),
		},
		key,
	};
}
