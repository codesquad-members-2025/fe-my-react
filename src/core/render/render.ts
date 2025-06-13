import type { VNode } from "@/shared/types/vnode";
import { internalRender } from "./internalRender";
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
          handler.call(origin, event);
          return;
        }
        origin = origin.parentElement;
      }
    });
    isEventDelegationInitialized = true;
  }
  //---------------------------------------------------------

  // 2) 빌드 단계: DocumentFragment 생성
  const fragment: DocumentFragment = document.createDocumentFragment();

  // 3) internalRender로 전체 트리를 fragment에 구축
  internalRender(vnode, fragment);

  // 4) 커밋 단계: fragment를 실제 container에 한 번에 붙임
  container.appendChild(fragment);
}
