export default function Button() {
  return (
    <div>
      <span>버튼입니다.</span>
      <button onClick={() => console.log("Button 컴포넌트 정상 작동!")}>
        여길 클릭!
      </button>
    </div>
  );
}
