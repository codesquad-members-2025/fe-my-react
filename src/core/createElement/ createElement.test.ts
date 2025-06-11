import { describe, it, expect } from "vitest";
import createElement from "./ createElement";

describe("createElement 함수 단위 테스트", () => {
  it("올바른 vnode를 생성해야합니다.", () => {
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

  it("중첩배열로 입력받은 children을 평탄화 시켜야 합니다", () => {
    const vnode = createElement("ul", null, ["A", ["B", ["C", ["D"]]]]);
    expect(vnode.props.children).toEqual(["A", "B", "C", "D"]);
  });
});
