function jsx(type: any, props: any, key: string | null = null) {
	const { children, ref, ...restProps } = props;

	const vnode: any = {
		type,
		props: restProps,
	};

	if (key !== null) vnode.key = key;
	if (children !== undefined) vnode.children = [children];
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
	if (children !== undefined) vnode.children = children;
	if (ref !== undefined) vnode.ref = ref;

	return vnode;
}

export { jsx, jsxs };
