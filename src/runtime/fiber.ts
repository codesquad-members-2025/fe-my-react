import type { Fiber, VNode } from '@src/types/base.types';

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

		if (i === 0) parentFiber.child = fiber;
		else prevSibling!.sibling = fiber;

		prevSibling = fiber;

		const children = vnode.children ?? [];
		if (children.length > 0) {
			buildFiberTree(fiber, children);
		}
	}
}

export { buildFiberTree };
