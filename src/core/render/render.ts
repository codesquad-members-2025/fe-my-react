import { applyRef } from '../applyRef';
import { FRAGMENT, TEXT_ELEMENT } from './constants';

export function render(vnode: any, container: Element) {
	// 함수형 컴포넌트 처리
	if (typeof vnode.type === 'function') {
		const componentVNode = vnode.type(vnode.props); // 함수 호출로 자식 VNode 반환
		return render(componentVNode, container); // 재귀 렌더링
	}

	let dom: Node;

	if (vnode.type === TEXT_ELEMENT) {
		dom = document.createTextNode(vnode.props.nodeValue);
	} else if (vnode.type === FRAGMENT) {
		dom = document.createDocumentFragment();
	} else {
		dom = document.createElement(vnode.type);
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
