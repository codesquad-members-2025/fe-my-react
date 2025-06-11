# createElement 함수 설계도

## React 엘리먼트란 정확히 무엇인가요? \_React 공식 문서 참조

- 사용자 인터페이스의 일부에 대한 표현입니다.

```jsx
<Greeting name="Taylor" />;

createElement(Greeting, { name: "Taylor" });
```

- 위 두개의 코드는 다음과 같은 객체를 생성합니다.

```javascript

// 약간 단순화됨
{
  type: Greeting,
  props: {
    name: 'Taylor'
    children: null,
  },
  key: null,
  ref: null,
}
```

- ❗️이때 이 객체를 생성해도 Greeting 컴포넌트가 렌더링 되거나 DOM 엘리먼트가 생성되지는 않는다는 점을 주의하세요.
- createElement함수는 실제 DOM 노드를 생성하는게 아닌 VNode를 생성할 뿐 입니다.
- 이 가상 노드는 추후 diff 알고리즘,render() 부분에서 사용될 예정입니다.

## 매개변수와 반환값

### 매개변수

- type: type 인수는 유효한 React 컴포넌트여야 합니다. 태그 이름 문자열( 'div', 'span' ) 또는 리액트 컴포넌트(함수, Fragment )등이 될 수 있습니다.

- props: 속성이라고 생각 하면 됩니다. 즉 항상 이 props에는 객체 또는 null 이 와야합니다. null 이 오는 경우는 빈 객체와 동일하게 처리 됩니다. 이때 전달 받은 props 와 일치하는 프로퍼티를 가진 가상 DOM 을 생성합니다.

  - ❗️이때 전달한 props 객체의 ref와 key는 특수하기 때문에 생성한 element에서 element.props.ref 와 element.props.key는 사용할 수 없습니다. element.ref 또는 element.key로 사용할 수 있습니다.
  - 즉, ref와 key는 컴포넌트의 접근을 방지하고 오직 프레임 워크만 사용 할 수 있게 하기 위해서 props의 필드에서 제거한뒤 필드의 위치를 옮깁니다.

- children: 나머지 연산자를 이용하여 배열로 입력 받습니다.
  - 0개 이상의 자식 노드. 엘리먼트, 문자열, 숫자, 빈 노드(null, undefined, true, false) 그리고 노드 배열을 포함한 모든 노드가 될 수 있습니다.

### 반환값

createElement는 아래 프로퍼티를 가지는 가상돔(=VNode)를 반환합니다.

- type: 전달받은 type.
- props: ref와 key를 제외한 전달받은 props.
- ref: 전달받은 ref. 누락된 경우 null.
- key: 전달받은 key를 강제 변환한 문자열. 누락된 경우 null.
- children: 전달받은 children배열을 어떻게 할까..?

### 주의 사항

- 반드시 React 엘리먼트와 그 프로퍼티는 불변하게 취급해야하며 엘리먼트 생성 후에는 그 내용이 변경되어선 안 됩니다. -> 반환된 엘리먼트(VNode)와 그 프로퍼티를 freeze 한다.

### 프로젝트 참고 위키

- <a href='https://velog.io/@y-minion/DOM-구조는-자식의-중첩된-구조를-갖지-않는가'>📚 DOM 구조는 자식의 중첩된 구조를 갖지 않는가?</a>
- <a href='https://velog.io/@y-minion/React-Virtual-DOM에서-자식-목록을-평탄화flatten하는-이유'>📚 React Virtual DOM에서 자식 목록을 평탄화(flatten)하는 이유</a>
- <a href='https://velog.io/@y-minion/DOM-구조는-왜-평평한-목록인가-그리고-React는-왜-이를-평탄화flatten해야-하는가'>📚 DOM 구조는 왜 '평평한 목록'인가? 그리고 React는 왜 이를 '평탄화(flatten)'해야 하는가</a>
- <a href='https://velog.io/@y-minion/React에서의-자식-평탄화-이해하기-Babel-JSX-createElement-Virtual-DOM-전환까지-전부-정리'>📚React에서의 자식 평탄화 이해하기: Babel, JSX, createElement, Virtual DOM 전환까지 전부 정리</a>
