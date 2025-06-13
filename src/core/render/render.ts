import type { VNode } from "@/shared/types/vnode";
import { mapPropToAttr } from "./mapPropToAttr";
import { attachHandlers } from "./attachHandlers";

// (1) 이벤트 위임 초기화 상태 플래그
let isEventDelegationInitialized = false;

// (2) 심벌 키 생성
export const HANDLERS = Symbol("__handlers");

export function render(vnode: VNode, container: Node): void {
  //---------------------------------------------------------
  // (3) 한 번만: 최상위 컨테이너에 click 위임 리스너 등록
  if (!isEventDelegationInitialized) {
    container.addEventListener("click", (event: Event) => {
      let origin = event.target as HTMLElement | null;
      //이벤트 핸들러가 바인딩된 노드까지 위로 올라가야한다. -> .parent
      while (!!origin && origin !== container) {
        const handler = (origin as HTMLElement)[HANDLERS]?.click;
        if (typeof handler === "function") {
          handler(event); // handler.call(node, event);
          return;
        }
        origin = origin.parentElement;
      }
    });
    isEventDelegationInitialized = true;
  }
  //❗️ -> 리팩토링 필요! 1. 이벤트 위임 방식 타당한지 검토, 2. handler함수 실행방법 검토 (=.call 이 방식도 컴토)

  //---------------------------------------------------------

  if (typeof vnode.type === "function") {
    render(vnode.type(vnode.props), container);
    return;
  }

  //루트노드 생성(연결고리의 시작점) -> 속성 확인하기 Node | HTMLElement
  const rootNode: HTMLElement = document.createElement(vnode.type);

  //VNode의 props 순회
  Object.entries(vnode.props).forEach(([prop, value]) => {
    if (prop === "children" && value != null) {
      value.forEach((child: string | VNode) => {
        // 1) 문자열 또는 숫자면 텍스트 노드
        if (typeof child === "string" || typeof child === "number") {
          rootNode.appendChild(document.createTextNode(String(child)));
        } else if (child !== null && child !== undefined) {
          render(child, rootNode);
        }
      });
    }

    //이벤트 핸들러 props
    if (!!prop && prop !== "children" && typeof value === "function") {
      const eventHandler = mapPropToAttr(prop);
      attachHandlers(rootNode, eventHandler, value);
    }

    if (prop && value) {
    }
  });
}
