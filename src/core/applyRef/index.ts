// src/core/applyRef.ts
import type { MutableRefObject, Ref } from '../../types/base.types';

export function applyRef(dom: Node, ref: Ref | undefined) {
	if (typeof ref === 'function') {
		ref(dom);
	} else if (ref && typeof ref === 'object' && 'current' in ref) {
		(ref as MutableRefObject<Node>).current = dom;
	}
}
