import type { Fiber, VNode } from '../types/base.types';

function buildFiberTree(parentFiber: Fiber, vnodeChildren: VNode[]): void {
	let prevSibling: Fiber | null = null;

	for (let i = 0; i < vnodeChildren.length; i++) {
		const vnode = vnodeChildren[i];
		const fiber: Fiber = {
			type: vnode.type,
			props: vnode.props,
			parent: parentFiber,
			child: null,
			sibling: null,
			memoizedState: [],
			hookIndex: 0,
		};

		if (vnode.key) fiber.key = vnode.key;
		if (vnode.ref) fiber.ref = vnode.ref;

		if (typeof fiber.type === 'function') {
			const renderedVNode = (fiber.type as Function)(fiber.props);
			const children = renderedVNode.props.children ?? [];
			buildFiberTree(fiber, children);
		} else {
			const children = vnode.props.children ?? [];
			if (children.length > 0) {
				buildFiberTree(fiber, children);
			}
		}

		if (i === 0) parentFiber.child = fiber;
		else prevSibling!.sibling = fiber;

		prevSibling = fiber;
	}
}

export { buildFiberTree };
