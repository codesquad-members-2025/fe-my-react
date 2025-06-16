import { createElement } from './createElement';
import { FRAGMENT } from './createElement.constants';
import type { VNode } from './createElement.types';

export function createFragment(props: { children: (VNode | string)[] }): VNode {
	return createElement(FRAGMENT, props);
}
