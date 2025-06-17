import { buildFiberTree } from '@src/runtime/fiber';
import type {
	Fiber,
	FragmentVNode,
	TextVNode,
	VNode,
} from '../types/base.types';
import { applyRef } from './applyRef';
import { FRAGMENT, TEXT_ELEMENT } from './constants';

function createRootFiber(vnode: VNode): Fiber {
	const rootFiber: Fiber = {
		type: vnode.type,
		props: vnode.props,
		parent: null,
		child: null,
		sibling: null,
		memoizedState: [],
		hookIndex: 0,
	};

	if (vnode.key) rootFiber.key = vnode.key;
	if (vnode.ref) rootFiber.ref = vnode.ref;

	return rootFiber;
}

export function createDom(fiber: Fiber): Node | null {
	const { type, props, ref } = fiber;

	let dom: Node;

	if (type === TEXT_ELEMENT) dom = document.createTextNode(props.nodeValue);
	else if (type === FRAGMENT) dom = document.createDocumentFragment();
	else if (typeof type === 'string') {
		dom = document.createElement(type);

		for (const [key, value] of Object.entries(props)) {
			if (key === 'children') continue;
			(dom as any)[key] = value;
		}
	} else {
		// 예상되지 않는 상황이므로 무시
		return null;
	}

	if (ref) applyRef(dom, ref);

	return dom;
}

function commitToVirtualContainer(
	fiber: Fiber,
	container: DocumentFragment | Element,
) {
	const dom = createDom(fiber);
	if (dom) container.appendChild(dom);

	if (fiber.child && dom)
		commitToVirtualContainer(fiber.child, dom as DocumentFragment | Element);
	if (fiber.sibling) commitToVirtualContainer(fiber.sibling, container);
}

export function render(
	vnode: VNode | TextVNode | FragmentVNode,
	container: Element,
): void {
	const rootVNode =
		typeof vnode.type === 'function'
			? (vnode.type as Function)(vnode.props)
			: vnode;

	const rootFiber: Fiber = createRootFiber(rootVNode);

	const children = rootVNode.props.children ?? [];

	buildFiberTree(rootFiber, children);

	const virtualContainer = document.createDocumentFragment();

	commitToVirtualContainer(rootFiber, virtualContainer);

	container.innerHTML = '';
	container.appendChild(virtualContainer);
}
