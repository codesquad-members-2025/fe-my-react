import type { VNode } from "@/shared/types/vnode";
import { mapPropToAttr } from "./mapPropToAttr";
import { attachHandlers } from "./attachHandlers";

export function internalRender(vnode: VNode, parent: Node): void {
  if (typeof vnode.type === "function") {
    internalRender(vnode.type(vnode.props), parent);
    return;
  }

  //루트노드 생성(연결고리의 시작점) -> 속성 확인하기 Node | HTMLElement
  const rootNode: HTMLElement = document.createElement(vnode.type);

  //VNode의 props 순회
  Object.entries(vnode.props).forEach(([prop, value]) => {
    if (prop === "children" && value != null && Array.isArray(value)) {
      value.forEach((child: string | VNode) => {
        // 1) 문자열 또는 숫자면 텍스트 노드
        if (typeof child === "string" || typeof child === "number") {
          rootNode.appendChild(document.createTextNode(String(child)));
        } else if (child !== null && child !== undefined) {
          internalRender(child, rootNode);
        }
      });
    } else if (
      //이벤트 핸들러 props
      !!prop &&
      prop !== "children" &&
      typeof value === "function"
    ) {
      const eventHandler = mapPropToAttr(prop);
      attachHandlers(rootNode, eventHandler, value);
    }
    //표준 HTML 속성
    else if (value != null && value !== false) {
      const attribute = mapPropToAttr(prop);
      rootNode.setAttribute(attribute, value);
    }
  });
  parent.appendChild(rootNode);
}
