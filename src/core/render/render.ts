import type { VNode } from "@/shared/types/vnode";
import { internalRender } from "./internalRender";
import { eventList } from "./eventHandelr";

// 요소에 저장된 이벤트 핸들러들의 타입 정의
interface ElementEventHandlers {
  [eventType: string]: (this: HTMLElement, event: Event) => void;
}

// (1) 이벤트 위임 초기화 상태 플래그
const delegatedContainers = new WeakSet<Node>();

// (2) 심벌 키 생성
export const HANDLERS = Symbol("__handlers"); //Symbol.for

export function render(vnode: VNode, container: Node | HTMLElement): void {
  // 2) 빌드 단계: DocumentFragment 생성
  const fragment: DocumentFragment = document.createDocumentFragment();

  // 3) internalRender로 전체 트리를 fragment에 구축
  internalRender(vnode, fragment);

  //---------------------------------------------------------
  // (3) 한 번만: 최상위 컨테이너에 click 위임 리스너 등록
  if (!delegatedContainers.has(container)) {
    eventList.forEach((eventAction: string) => {
      container.addEventListener(eventAction, (event: Event) => {
        findAndExecuteDelegatedHandler(
          event,
          event.target as HTMLElement | null,
          container,
          eventAction,
          HANDLERS as symbol
        );
      });
    });

    delegatedContainers.add(container);
  }
  //---------------------------------------------------------

  // 4) 커밋 단계: fragment를 실제 container에 한 번에 붙임
  //-----------------------> !!!!!!!!!!!!!!!!!!!!!!!!!!!! 이 로직 분리하기!!!!!!!!!!!!!!!!!!!!!!!!! -> 따로 분리해야한다. -> 왜 ???? 리렌더링 할때 아래 로직 즉, 실제 DOM에 바로 업데이트하는 로직이 같이 있으면 안된다.
  container.appendChild(fragment);
}

function findAndExecuteDelegatedHandler(
  event: Event,
  initialTarget: HTMLElement | null,
  stopElement: any,
  eventAction: string,
  handlersKey: symbol
): void {
  let currentElement = initialTarget;
  while (currentElement && currentElement !== stopElement) {
    // 현재 요소에 핸들러들이 저장되어 있는지 확인합니다.
    const handlersOnElement = (currentElement as any)[handlersKey] as
      | ElementEventHandlers
      | undefined;
    const handler = handlersOnElement ? handlersOnElement[eventAction] : null;
    if (typeof handler === "function") {
      handler.call(currentElement, event);
      return;
    }
    currentElement = currentElement.parentElement;
  }
}
