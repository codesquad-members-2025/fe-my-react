import { describe, it, expect } from "vitest";
import createElement from "./ createElement";

describe("createElement 함수 단위 테스트", () => {
  it(".jsx코드에서 js로 트랜스 파일링되는 상황에서 jsxfactory에 의해 createElement가 호출될 경우에 VNode구조가 생성되야 합니다. ", () => {
    const vnode = createElement(
      "h1",
      {
        className: "test",
        key: "testKey",
        ref: "testRef",
      },
      "Hello",
      "Hello",
      createElement("div", null)
    );
    expect(vnode).toEqual({
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
    });
  });

  it("세번째 인자가 없는경우도 안전하게 처리해야 합니다.", () => {
    const vnode = createElement("h1", {
      className: "test",
      key: "testKey",
      ref: "testRef",
    });
    expect(vnode).toEqual({
      type: "h1",
      ref: "testRef",
      key: "testKey",
      props: {
        className: "test",
        children: null,
      },
    });
  });
  it("호스트 엘리먼트만 있는 경우에도 기본 VNode구조가 유지되야 합니다.", () => {
    const vnode = createElement("h1", null);
    expect(vnode).toEqual({
      type: "h1",
      ref: null,
      key: null,
      props: {
        children: null,
      },
    });
  });

  it("중첩배열로 입력받은 children을 평탄화 시켜야 합니다", () => {
    const vnode = createElement("ul", null, ["A", ["B", ["C", ["D"]]]]);
    expect(vnode.props.children).toEqual(["A", "B", "C", "D"]);
  });
});
