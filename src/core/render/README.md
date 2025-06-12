# render 함수 설계

## 🔎 들어가기 전

- render 함수 설계시 계층들이 중첩 되는 구조가 많이 나오는데... -> .jsx 에서 Babel이 트랜스파일링 시킨 형태를 생각하지 말고 createElement 가 만든 VNode 형태를 생각해라.
- 함수형 컴포넌트는 다음처럼 정의되어 있다.

```javascript
function MyComponent(props) {
  return <div>{props.children}</div>;
}
```

-> 즉 **_언제나 props 객체를 매개변수_**로 입력받는다.

## ⚙️ 기본 기능 구현(1차)

우선은 기본적인 기능구현 (VNode)를 통해 실제 DOM을 실제 화면에 렌더링 하는 것이 목표입니다.
(렌더링 최적화 \_ 동시성 렌더링, 이를 위한 파이버 아키텍처도 구현이 필요하지만 우선 기본적인 기능 구현을 우선으로 구현하겠습니다... )

- VNode의 구조

```javascript
interface VNode {
  type: string | Function;
  key: string | number | null;
  ref: any;
  props: VNodeProps;
}

const vnode: VNode = {
  type: "h1",
  ref: "testRef",
  key: "testKey",
  props: {
    className: "test",
    children: [
      "Hello",
      "Hello",
      { type: "div", ref: null, key: null, props: { children: null } },
    ],
  },
};
```

### 전체 시나리오

#### 1. render 함수가 입력받은 VNode를 읽으면서 각 필드에 맞게 HTML 요소를 생성한다.

-> 전체적인 DOM 생성 시나리오는 다음과 같다.

- type에 따라서 알맞은 엘리먼트를 생성한다. (이때 자식노드들을 위한 엔드 포인트를 변수에 할당해야합니다.)
- props를 순환하면서 생성한 엘리먼트의 속성으로 넣는다.
- 이때 children 값이 null이여도 해당 엘리먼트는 반드시 생성한다. 하지만 null 이라는 값은 렌더링 하지 않는다.
- children에 VNode가 존재하면 render함수를 다시 호출 한다.
- ref, key 속성은 프레임 워크 안에서만 사용하므로 DOM 생성시 속성으로 넣으면 안된다. -> VNode 안에서만 갖고 있는다.

##### 1-1. 만약 children에 새로운 VNode(type:string) 가 있으면 어떡할까?

- 다음과 같은 상황입니다.

```javascript
//JSX 구조:
<div>
  <p>
    <span>Hello</span>
  </p>
</div>;

//Babel 변환 결과:
React.createElement(
  "div",
  null,
  React.createElement("p", null, React.createElement("span", null, "Hello"))
);
```

- createElement 함수 실행 (런타임 1) ->트랜스파일된 createElement(...) 코드가 실행되면서, 하나하나 VNode 객체가 생성됩니다

```javascript
// ⭐️ VNode 형태 ⭐️
const VNode = {
  type: "div",
  props: {
    children: [
      {
        type: "p",
        props: {
          children: [
            {
              type: "span",
              props: {
                children: ["Hello"],
              },
            },
          ],
        },
      },
    ],
  },
};
```

-> render 함수는 다음과 같은 VNode(js 객체 트리 구조)를 실제 DOM 으로 만들어야 합니다.

- 생성된 VNode 의 props.children 필드를 주목해야합니다.

- 기본적으로 props.children 배열의 요소로 string 또는 Object 가 올 수 있습니다.
  - 타입이 string 일 경우 해당 DOM의 텍스트 요소로 삽입합니다.
  - 타입이 Object 일 경우 render 함수를 다시 호출하여 재귀를 실행해야합니다.

##### 1-2. 만약 children에 새로운 VNode(type:Function) 가 있으면 어떡할까?

- 상황:

```javascript
//JSX
<div>
  <span>...</span>
  <MyComponent className="..." onClick={() => ...}>
    <div>....</div>
    <div>....</div>
  </MyComponent>
</div>
// 그리고...
function MyComponent() {
  return <span>...</span>;
}
```

- 📌 1. Babel 트랜스파일링 결과

```javascript
React.createElement(
  'div',
  null,
  React.createElement('span', null, '...'),
  React.createElement(
    MyComponent,
    { className: '...', onClick: () => ... },
    React.createElement('div', null, '....'),
    React.createElement('div', null, '....')
  )
);

// ⭐️ VNode 형태 ⭐️
{
  type: MyComponent,
  props: {
    className: "...",
    onClick: () => ...,
    children: [
      { type: "div", props: { children: "...." }, ... },
      { type: "div", props: { children: "...." }, ... }
    ]
  },
  key: null,
  ref: null
}
```

- 전체적인 흐름은 1-1 과정과 같습니다. 하지만 render()에서 매개변수로 입력 받는 vnode의 type필드의 value 타입을 검사해야합니다.
- 만약 Function 일 경우 vnode.type(= 컴포넌트 함수)를 실행합니다.
- 🤔 이때 컴포넌트 함수를 실행 시킬때... 매개 변수는 어떻게 관리할까?

  - 해당 함수형 컴포넌트의 매개변수로 들어와야 할 것은 언제나 props 객체입니다. <!-- 해당 README.md 의 초반 '🔎 들어가기 전' 항목 참조 -->

- 깊이가 깊은 VNode를 대상으로 render함수를 설계하다보면 구조가 복잡해져 헷갈릴 수 있습니다.

  - 하지만 다음의 것들만 기억하고 있으면 됩니다.

  1. .jsx 에서 Babel 로부터 트랜스파일링되고 createElement함수가 실행되서 반환된 VNode의 형태를 render함수에서 다룬다.
  2. 이때 구조가 복잡해져도 VNode형태로 변환되면 render함수로 DOM을 생성할때는 type, props 위 2개의 필드값만 생각하면 됩니다.
  3. 그리고 항상 자식 계층에 존재하는 노드가 매개변수를 입력 받을경우에는 항상 props객체 자체를 입력 받습니다.

##### 1-3. 결국 VNode의 type필드에 따라 분기처리를 하기만 하면 됩니다.

- render 함수의 최종적인 목표는 다음과 같습니다.

  1. VNode를 통해 DOM트리를 만들어야한다.

  - children필드에 다른 VNode 가 존재하면 다시 render함수를 호출하여 새로운 VNode를 만듭니다.

  2. 커스텀 컴포넌트가 있을경우 해당 함수를 실행해서 최종적으로 호스트 컴포넌트만 있도록 만든다.
  3. 호스트 컴포넌트일 경우 만들어진 VNode를 통해 DOM을 만든다.

### 설계

1. render 함수 실행시 type필드가 함수면 계속해서 해당 함수를 실행한다.

- 함수를 호출할때 매개변수는 해당 VNode의 props객체 자체를 넘겨준다.
- 실행되면 새로운 하위 VNode가 생성된다. -> 이 함수를 다시 render에 넣고 실행시켜야 한다.
- 위의 과정이 조건을 만족하지 않을때까지 반복 되야한다. -> 처음에 type이 함수인 함수를 실행할때 이 결과값을 render에 넣어야한다.

2. 1번의 조건을 만족하지 않을 경우(=더이상 type이 함수가 아닌 stirng)

- type을 바탕으로 엘리먼트 노드를 생성한다.
- props.children을 제외한 나머지 props는 만들어진 엘리먼트 노드의 속성으로 넣는다. ->문자열/숫자는 document.createTextNode로 처리
- props.children는 반복해서 텍스트 엘리먼트로 만들어서 자식으로 넣는다.
  - 이때 props.children의 요소가 VNode경우 render함수를 호출한다.

#### 2. 상위 엔드포인트에 렌더링된 DOM을 자식으로 삽입한다.

- 상위 노드의 자식으로 생성된 DOM 을 삽입해야 한다.
- render함수는 만들어진 DOM이 어디에 들어가야할지 알아야한다.
- 최종적으로 render함수의 매개변수로는 VNode와 만들어진 DOM의 루트 DOM 노드가 들어와야한다.
