import MyReact from "@/core";

export function performanceInstrument(root, Component) {
  // 3) 퍼포먼스 측정용 이름 지정
  const MEASURE = ["첫 렌더링", "두 번째 렌더링"];
  performance.clearMarks();
  performance.clearMeasures();

  for (let a = 1; a < 3; a++) {
    root.innerHTML = "";
    performance.mark(`start${a}`);
    MyReact.render(Component, root);
    performance.mark(`end${a}`);
    performance.measure(MEASURE[a - 1], `start${a}`, `end${a}`);
  }

  // 결과 출력
  console.table(
    performance.getEntriesByType("measure").map(({ name, duration }) => ({
      name,
      duration: duration.toFixed(6) + "ms",
    }))
  );
}
