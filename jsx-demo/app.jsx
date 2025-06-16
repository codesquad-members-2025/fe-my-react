function App() {
  return (
    <div>
      <h1>JSX Demo</h1>
      <p>이것은 JSX 데모입니다.</p>
      <button onClick={() => console.log("클릭 이벤트 발생!")}>
        이건 버튼입니다.
      </button>
      <button onClick={() => console.log("버블링 감지 성공입니다!")}>
        <span>버블링 감지 버튼입니다.</span>
        <div>
          <div>버블링 div1</div>
          <div>버블링 div2</div>
          <div>버블링 div3</div>
        </div>
      </button>
    </div>
  );
}

// DOM에 렌더링
const root = document.getElementById("root");
MyReact.render(<App />, root);
