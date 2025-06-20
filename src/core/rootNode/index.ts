import type { VNode } from "@/shared/types/vnode";

/**
 * Render과정 이후 최초에 render가 실행될때 생성되는 기준 VDOM입니다.
 * 이후에 재조정 과정의 diif 비교일때 기준대상은 항상 rootVDOM이 됩니다.
 * 변경사항이 발생하면 rootVDOM이 수정되고, 변경된 rootVDOM을 기준으로 DOM이 생성됩니다.
 */
let rootVDOM: VNode | null = null;

/**
 *
 * @param vnode render함수가 실행될때 초반에 최상위의 Vnode의 참조값을 입력 받아야합니다.
 */
export function setRootVDOM(vnode: VNode): void {
  rootVDOM = vnode;
}

/**
 *
 * @returns 변경점이 발생하면 항상 rootVDOM에 접근해야하는데 해당 함수를 통해 접근 할 수 있습니다.
 */
export function getRootVDOM(): VNode {
  return rootVDOM!;
}
