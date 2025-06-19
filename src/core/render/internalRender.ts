import type { VNode } from "@/shared/types/vnode";
import { mapPropToAttr } from "./mapPropToAttr";
import { attachHandlers } from "./attachHandlers";
import { pushCurrentVNode, popCurrentVNode } from "../hook/hookManager";

export function internalRender(vnode: VNode, parent: Node): void {
  if (typeof vnode.type === "function") {
    pushCurrentVNode(vnode);
    //VNode에 새로운 필드 추가(render 함수 실행 과정에 한정한다.) rerender과정에서는 이런 과정이 포함되어선 안된다.
    vnode.hookMetaData = { hooks: [], pointer: 0 };
    internalRender(vnode.type(vnode.props), parent);
    popCurrentVNode();
    return;
  }

  //루트노드 생성(연결고리의 시작점) -> 속성 확인하기 Node | HTMLElement
  const rootNode: HTMLElement = document.createElement(vnode.type);

  //VNode의 props 순회
  Object.entries(vnode.props).forEach(([prop, value]) => {
    if (prop === "children" && value != null && Array.isArray(value)) {
      childrenHandler(rootNode, value as ChildElementType[]);
    } else if (
      //이벤트 핸들러 props
      isEventHandlerProp(prop, value)
    ) {
      const eventName = mapPropToAttr(prop);
      attachHandlers(rootNode, eventName, value);
    }
    //표준 HTML 속성
    // JavaScript 값으로 null, undefined, 또는 boolean false가 전달되면 해당 속성은 설정되지 않습니다.
    // 속성 값으로 문자열 "false"를 사용하려면, 명시적으로 "false" 문자열을 전달해야 합니다.
    // 예: <input aria-hidden="false"> 를 원하면 value로 "false" (문자열)를 전달합니다.
    else if (value != null && value !== false) {
      const attribute = mapPropToAttr(prop);
      rootNode.setAttribute(attribute, value);
    }
  });
  parent.appendChild(rootNode);
}

function isEventHandlerProp(prop: string, value: any): boolean {
  return !!prop && prop !== "children" && typeof value === "function";
}

// 자식으로 올 수 있는 요소들의 타입을 정의합니다.
// null 또는 undefined는 렌더링 시 무시될 수 있는 값입니다.
type ChildElementType = string | VNode | number;

function childrenHandler(rootNode: HTMLElement, value: ChildElementType[]) {
  value.forEach((child: ChildElementType) => {
    // 1) 문자열 또는 숫자면 텍스트 노드
    if (typeof child === "string" || typeof child === "number") {
      rootNode.appendChild(document.createTextNode(String(child)));
    } else if (child !== null && child !== undefined) {
      internalRender(child, rootNode);
    }
  });
}
