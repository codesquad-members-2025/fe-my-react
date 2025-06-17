import MyReact from "@/core";

export function performanceInstrument(root, Component) {
  const MEASURE = ["첫 렌더링", "두 번째 렌더링"];

  // 실제 측정: N번 반복
  const N = 50;
  performance.clearMarks();
  performance.clearMeasures();
  for (let a = 1; a < N; a++) {
    //App에서 실행한 워밍업용 렌더링 초기화
    root.innerHTML = "";
    performance.mark(`start${a}`);
    MyReact.render(Component, root);
    performance.mark(`end${a}`);
    performance.measure(`run${a}`, `start${a}`, `end${a}`);
  }

  const measures = performance.getEntriesByType("measure");

  // 결과 출력
  console.table(
    measures.map(({ name, duration }) => ({
      name,
      duration: duration.toFixed(6) + "ms",
    }))
  );
  //평균값 계싼
  const total = measures.reduce((sum, m) => sum + m.duration, 0);
  console.log("Average render time:", (total / N).toFixed(3), "ms");
}
