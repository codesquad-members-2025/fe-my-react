import { createElement, createFragment } from './core';

type VNode = {
	type: any;
	props: any;
	children: any[];
	key?: any;
	ref?: any;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function jsx(type: any, props: any, key: string | null = null) {
	const { children, ref, ...restProps } = props;

	const vnode: VNode = {
		type,
		props: restProps,
		children: children ? [children] : children,
	};
	if (key) vnode.key = key;
	if (ref) vnode.ref = ref;

	return createElement(vnode);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function jsxs(type: any, props: any, key: string | null = null) {
	const { children, ref, ...restProps } = props;

	const vnode: VNode = {
		type,
		props: restProps,
		children,
	};
	if (key) vnode.key = key;
	if (ref) vnode.ref = ref;

	return createElement(vnode);
}

const Fragment = createFragment;

// 필수 export 모듈. 제외 불가
export { jsx, jsxs, Fragment };
