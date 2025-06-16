// src/jsx-runtime/jsx-runtime.ts
import { FRAGMENT, TEXT_ELEMENT } from '../core/constants';
import {
	type FragmentVNode,
	TextVNode,
	type VNode,
	type VNodeChildren,
} from '../types/base.types';

function wrapChild(child: VNode | string | number): VNode {
	if (typeof child === 'string' || typeof child === 'number') {
		return {
			type: TEXT_ELEMENT,
			props: { nodeValue: String(child) },
			children: [],
		};
	}
	return child;
}

function normalizeChildren(children: VNodeChildren): VNode[] {
	const flat = (Array.isArray(children) ? children : [children])
		.flat(Number.POSITIVE_INFINITY)
		.filter((child) => child !== null && child !== undefined);
	return flat.map(wrapChild);
}

function jsx(
	type: string | Function,
	props: Record<string, any>,
	key: string | null = null,
): VNode {
	const { children, ref, ...restProps } = props;

	const vnode: VNode = {
		type,
		props: restProps,
	};

	if (key !== null) vnode.key = key;
	if (children !== undefined) vnode.children = normalizeChildren(children);
	if (ref !== undefined) vnode.ref = ref;

	return vnode;
}

const jsxs = jsx;

function Fragment(props: { children?: VNodeChildren }): FragmentVNode {
	return {
		type: FRAGMENT,
		props: {},
		children: props.children ? normalizeChildren(props.children) : [],
	};
}

export { jsx, jsxs, Fragment };
