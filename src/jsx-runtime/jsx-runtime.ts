import { FRAGMENT, TEXT_ELEMENT } from '../core';

function wrapChild(child: any) {
	if (typeof child === 'string' || typeof child === 'number') {
		return {
			type: TEXT_ELEMENT,
			props: { nodeValue: String(child) },
			children: [],
		};
	}
	return child;
}

function normalizeChildren(children: any) {
	const flat = (Array.isArray(children) ? children : [children]).flat(
		Number.POSITIVE_INFINITY,
	);
	return flat.map(wrapChild);
}

function jsx(type: any, props: any, key: string | null = null) {
	const { children, ref, ...restProps } = props;

	const vnode: any = {
		type,
		props: restProps,
	};

	if (key !== null) vnode.key = key;
	if (children !== undefined) vnode.children = normalizeChildren(children);
	if (ref !== undefined) vnode.ref = ref;

	return vnode;
}

function jsxs(type: any, props: any, key: string | null = null) {
	const { children, ref, ...restProps } = props;

	const vnode: any = {
		type,
		props: restProps,
	};

	if (key !== null) vnode.key = key;
	if (children !== undefined) vnode.children = normalizeChildren(children);
	if (ref !== undefined) vnode.ref = ref;

	return vnode;
}

function Fragment(props: any) {
	return {
		type: FRAGMENT,
		props: {},
		children: props.children,
	};
}

export { jsx, jsxs, Fragment };
