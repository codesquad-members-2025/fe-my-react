import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "./render";
import createElement from "../createElement/ createElement";

describe("render 함수 + jsdom 환경", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 테스트 종료 후 DOM 초기화
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it('동작: render() 호출 시 DOM에 요소가 추가되어야 한다"', () => {
    const vnode = createElement(
      "div",
      { className: "box" },
      createElement("h2", null, "헤더"),
      createElement("p", null, "내용 텍스트")
    );

    render(vnode, container);

    const div = container.querySelector("div.box");
    expect(div).toBeTruthy();
    expect(div?.querySelector("h2")?.textContent).toBe("헤더");
    expect(div?.querySelector("p")?.textContent).toBe("내용 텍스트");
  });

  it("이벤트 위임 검증: 클릭 시 callback이 실행되야한다.", () => {
    const clickHandler = vi.fn();
    const vnode = createElement("button", { onClick: clickHandler }, "클릭");
    render(vnode, container);
    const button = container.querySelector("button")!;
    expect(button).toBeTruthy();
    button.click();

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
