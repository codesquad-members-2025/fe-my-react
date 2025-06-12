// 1) 심벌 생성 (유니크 키)
const HANDLERS = Symbol("__handlers");

// 2) 전역 HTMLElement 인터페이스 확장
declare global {
  interface HTMLElement {
    // 이 심벌 키로 저장된 핸들러 레코드를 허용
    [HANDLERS]?: Record<string, (e: Event) => void>;
  }
}
/**
 *
 * @param el : 타겟 노드
 * @param action : VNode의 props의 action
 * 타겟 노드의 프로퍼티에 심벌핸들러 필드를 생성하고 안에 해당하는 action필드를 생성합니다.
 */
export function attachHandlers(
  el: HTMLElement,
  action: string,
  handler: (e: Event) => void
) {
  el[HANDLERS] = el[HANDLERS] ?? {};
  el[HANDLERS][action] = handler;
}
