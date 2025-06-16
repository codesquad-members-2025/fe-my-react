// 이벤트 등록 전용 맵
export const eventList: Set<string> = new Set();

/**
 *
 * @param action 각 노드에 발생하는 이벤트를 입력하여 등록합니다.
 */
export function registerEvent(action: string): void {
  eventList.add(action);
}
