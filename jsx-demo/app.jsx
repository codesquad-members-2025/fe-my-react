import { performanceInstrument } from "./performance/performanceInstrument";

function App() {
  return (
    <div>
      <h1>JSX Performance Test</h1>

      {/* 입력 상태 유지 테스트용 인풋 */}
      <div>
        <label htmlFor="textInput">텍스트 입력:</label>
        <input
          id="textInput"
          type="text"
          placeholder="여기에 입력하세요"
          defaultValue="초기값"
        />
      </div>

      {/* 클릭 핸들러 테스트용 버튼 */}
      <button id="logButton" onClick={() => console.log("로그 버튼 클릭!")}>
        로그 버튼
      </button>

      {/* 대량 리스트 렌더링 테스트 */}
      <ul>
        {Array.from({ length: 100 }, (_, i) => (
          <li key={i} onClick={() => console.log(`리스트 아이템 ${i} 클릭`)}>
            리스트 아이템 {i}
          </li>
        ))}
      </ul>

      {/* 중첩 섹션 및 이벤트 버블링 테스트 */}
      {["A", "B", "C"].map((section) => (
        <section key={section}>
          <h2>섹션 {section}</h2>
          <div>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                onClick={() =>
                  console.log(`섹션 ${section} - 아이템 ${item} 클릭`)
                }
              >
                섹션 {section} - 아이템 {item}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// DOM에 렌더링
const root = document.getElementById("root");
MyReact.render(<App />, root);
performanceInstrument(root, <App />);
