import type { RenderedVNode } from "../render/internalRender";

/**
 * Render과정 이후 최초에 render함수가 실행될때 반환되는 RenderedVNode로 이루어진 Tree입니다.
 * 이후에 재조정 과정의 diif 비교일때 기준대상은 항상 rootVNodeTree이 됩니다.
 * 변경사항이 발생하면 rootVNodeTree이 수정되고, 변경된 rootVNodeTree을 기준으로 DOM이 생성됩니다.
 */
let rootVNodeTree: RenderedVNode | null = null;

/**
 *
 * @param vnode internalRender함수가 최종적으로 만들어낸 트리입니다.
 */
export function setRootVNodeTree(vnode: RenderedVNode): void {
  rootVNodeTree = vnode;
}

/**
 *
 * @returns 변경점이 발생하면 항상 rootVDOM에 접근해야하는데 해당 함수를 통해 접근 할 수 있습니다.
 */
export function getRootVNodeTree(): RenderedVNode {
  return rootVNodeTree!;
}
