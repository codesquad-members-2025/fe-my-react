import type { VNode } from '@core/createElement';

export function createDom(vNode: VNode): Node {
	const { type, props } = vNode;

	const dom: Node =
		type === 'TEXT_ELEMENT'
			? document.createTextNode(props.nodeValue as string)
			: document.createElement(type);

	for (const [key, value] of Object.entries(props)) {
		if (key !== 'children') {
			// biome-ignore lint/suspicious/noExplicitAny: 문자열 키(key)를 통해 동적으로 DOM 프로퍼티에 값을 할당하기 위해 명시적 any 캐스트가 필요합니다.
			(dom as any)[key] = value;
		}
	}

	for (const child of props.children) dom.appendChild(createDom(child));

	return dom;
}

export function render(vnode: VNode, container: Element) {
	container.innerHTML = '';

	container.appendChild(createDom(vnode));
}
