import type { VNode } from "@/shared/types/vnode";

let vnodeStack: VNode[] = [];

export function pushCurrentVNode(vnode: VNode) {
  vnodeStack.push(vnode);
}
export function popCurrentVNode() {
  vnodeStack.pop();
}

/**
 *
 * @returns 현재의 VNode의 참조값을 가져옵니다.
 *
 * hook함수 내부에서 현재의 VNode에 접근할 수 있습니다.
 */
export function getCurrentVNode(): VNode {
  return vnodeStack[vnodeStack.length - 1];
}

export function hookManger() {
  const metaData = getCurrentVNode().hookMetaData!;
  const hooks: (string | number | boolean)[] = metaData.hooks;

  const registerStateHelper = (state: any): void => {
    hooks[metaData.pointer] = state;
    metaData.pointer++;
  };

  const getState = () => hooks[metaData.pointer];

  const isInit = (): boolean => !!hooks[metaData.pointer];

  return [registerStateHelper, getState, isInit];
}
