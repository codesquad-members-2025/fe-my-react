import type { FragmentVNode, TextVNode, VNode } from '../types/base.types';
import { applyRef } from './applyRef';
import { FRAGMENT, TEXT_ELEMENT } from './constants';

export function render(
	vnode: VNode | TextVNode | FragmentVNode,
	container: Element,
): void {
	if (typeof vnode.type === 'function') {
		const componentVNode = (vnode.type as Function)({
			...vnode.props,
			children: vnode.children,
		});
		return render(componentVNode, container);
	}

	let dom: Node;

	if (vnode.type === TEXT_ELEMENT) {
		dom = document.createTextNode((vnode as TextVNode).props.nodeValue);
	} else if (vnode.type === FRAGMENT) {
		dom = document.createDocumentFragment();
	} else {
		dom = document.createElement(vnode.type as string);
	}

	for (const [key, value] of Object.entries(vnode.props ?? {})) {
		if (key !== 'children') {
			(dom as any)[key] = value;
		}
	}

	if (vnode.children) {
		for (const child of vnode.children) {
			render(child, dom as Element);
		}
	}

	applyRef(dom, vnode.ref);

	container.appendChild(dom);
}
