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
    //Given
    const vnode = createElement(
      "div",
      { className: "box" },
      createElement("h2", null, "헤더"),
      createElement("p", null, "내용 텍스트")
    );
    const div = container.querySelector("div.box");

    //When
    render(vnode, container);

    //Then
    expect(div).toBeTruthy();
    expect(div?.querySelector("h2")?.textContent).toBe("헤더");
    expect(div?.querySelector("p")?.textContent).toBe("내용 텍스트");
  });

  it("이벤트 위임 검증: 클릭 시 callback이 실행되야한다.", () => {
    // Given (설정 단계)
    // 테스트를 위한 환경을 설정하고, 필요한 값들을 준비합니다.
    // 예를 들어, 테스트 대상 함수에 전달할 mock 함수나 초기 데이터 등을 만듭니다.
    const clickHandler = vi.fn(); // // vi.fn()은 Vitest에서 제공하는 mock 함수로, 호출 여부나 횟수 등을 추적할 수 있습니다.
    const vnode = createElement("button", { onClick: clickHandler }, "클릭");
    const button = container.querySelector("button")!;

    // When (수행 단계)
    // 실제로 테스트하려는 동작을 실행합니다.
    // 예를 들어, 함수를 호출하거나, 이벤트를 발생시키는 등의 작업을 합니다.
    render(vnode, container);
    button.click();

    // Then (테스트검증 단계)
    // 수행 단계의 결과가 예상대로인지 확인합니다.
    expect(button).toBeTruthy(); // 버튼이 DOM에 실제로 존재하는지 확인합니다.
    expect(clickHandler).toHaveBeenCalledTimes(1); // clickHandler mock 함수가 정확히 1번 호출되었는지 확인합니다.
  });
});
