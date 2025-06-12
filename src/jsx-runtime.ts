import { createElement, createFragment } from './core';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function jsx(type: any, props: any, key: string | null = null) {
	return createElement(type, props, key);
}

export const jsxs = jsx;
export const Fragment = createFragment;
