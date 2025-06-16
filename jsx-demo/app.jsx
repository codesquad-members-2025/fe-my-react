import MyReact from "@/core";

function App() {
  return (
    <div>
      <h1>JSX Demo</h1>
      <p>이것은 JSX 데모입니다.</p>
    </div>
  );
}

// DOM에 렌더링
const root = document.getElementById("root");
render(<App />, root);
