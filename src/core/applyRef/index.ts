export function applyRef(dom: Node, ref: any) {
	if (ref == null) return;

	if (typeof ref === 'string') {
		// 전역 레퍼런스 객체에 저장 (단순 구현)
		const refMap = ((window as any)._refs ||= {});
		refMap[ref] = dom;
	}

	if (typeof ref === 'function') {
		ref(dom); // 콜백 ref
	}

	if (typeof ref === 'object' && 'current' in ref) {
		ref.current = dom; // 객체 ref (useRef)
	}
}
