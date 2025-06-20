# useState설계

- 내가 설계한 전체 흐름은 다음과 같다.
  - 최초 렌더링시에(render 함수 실행시) VDOM을 돌면서 useState를 실행 시키는 순간에 useState에 의해 반환되는 각각의 setter 함수가 그 순간에는 현재의 해당하는 VNode를 알고 있으니까 내가 setter 함수에 클로저로 hookMetaData필드가 추가된 Vnode를 연결.
  - 그러면 나중에 setter 함수가 실행될 때 해당 setter 함수 안에는 클로저로 어떤 VNode에서 실행이 되는지 알 수 있음.
    그래서 setter 가 발생한 노드부터 리렌더링을 시작해서 rootVNode와 비교를 하면서 부분 수정을 한다.

## useState란?

- `useState`는 React 함수형 컴포넌트 내에서 상태 변수를 선언하고 업데이트할 수 있도록 돕는 훅.
- 여기서 ‘상태’는 시간이 지남에 따라 변할 수 있는 동적인 값(예: 버튼 클릭 횟수, 입력된 텍스트 등)을 의미.
- `useState`는 이러한 **_상태 값이 변경될 때_**마다 컴포넌트를 자동으로 리렌더링하여 화면에 변경된 값을 반영

## 주요 기능

```javascript
//jsx
import { useState } from "myReact";

function MyComponent() {
  const [state, setState] = useState(initialValue);
  // ... 컴포넌트 로직
}
```

- `state`: 현재 상태 값.
- `setState`: 상태 값을 업데이트 하는 함수. 이 함수를 호출 하면 컴포넌트가 새로운 값을 리렌더링 된다.
- 다중 상태 변수 지원: 하나의 컴포넌트 내에서 여러 개의 `useState`를 사용하여 다양한 상태 변수를 가질 수 있다.

## 설계

- 우선 실행 시점으로 크게 분리해서 생각한다.
  1. 최초 마운트 시점
  2. 리렌더링 시점
- 하지만 실행 시점을 판단 하려면 처음에 useState가 클로저로 VNode를 갖고있는지 확인한다.
  - 클로저에 VNode가 존재하지 않으면 useHookManger를 이용해서 VNode의 접근 헬퍼 함수를 얻어서 useState의 클로저로 VNdoe를 등록한다.
  - setter 함수로인해 리렌더링이 되는경우에는 useState의 클로저에 VNode가 존재하면 리렌더링 관련 로직을 실행한다.

### 분기 처리 이후 로직

- 우선 앞의 두가지 실행 시점으로 분기 처리가 되지만 어떤 상황이던 useState라는 함수는 항상 실행되고 이때마다 state와 setState는 반환이 되야한다.
- setter 함수는 클로저로 해당 하는 VNode의 참조가 있어야 한다. -> 훅 매니저의 반환 함수인 getVNode를 호출 후 변수에 담아서 클로저로 갖고 있도록 한다.
  - 이렇게 클로저로 갖고있으면 setter 함수가 어떤 노드에 실행되고 해당하는 위치의 setter 함수는 클로저로 getHookMetaData를 갖고있어서 state, setterFn, hookMetaData.pointer 이 정보를 알 수 있다.

### 1. 최초 마운트 순간.

- 이때 render함수가 호출되면서 useState함수도 호출된다.
- 해당 함수 내부에서 해당하는 VNode의 hookMetaData필드의 hooks이 비어있는지 확인한다. -> 이때 훅 매니저의 isInit으로 판단.
- 훅 매니저의 registerHookHelper 함수 이용. -> 해당 함수의 매개변수를 입력하기만 하면 해당 VNode에 등록이 된다.

### 2. 리렌더링 시점

- 이때는 setter 함수가 호출이 되는 순간 -> setter
