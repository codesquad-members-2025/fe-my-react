import type { HookMetaData, SetState, State } from "@/shared/types/vnode";
import { useHookManger } from "../hookManager";

export function useState(initalValue: State) {
  //useHookManger가 호출 되면서 내부의 헬퍼 함수들은 각각 현재의 VNode를 렉시컬 환경에 갖고 있다.
  const [registerHookHelper, getVNode, getCurrentHookData, isInit] =
    useHookManger();
  let state: State;

  /**
   *
   * @param arg 함수 또는 일단 상태 초기값을 받는다
   */
  let setState: SetState;
  if (isInit()) {
    //초깃값 할당
    state = initalValue;
    setState = (arg: any) => {
      if (typeof arg === "function") {
        state = arg(state);
      } else {
        state = arg;
      }
      registerHookHelper(state, setState);
      //리렌더링 호출
    };
    //만들어진 hook데이터 배열을 rootVNode에 최초 등록 한다.
    registerHookHelper(state, setState);
  } else {
    const [currentState, currentSetState]: HookMetaData = getCurrentHookData();
    state = currentState;
    setState = currentSetState;
  }
  return [state, setState];
}
