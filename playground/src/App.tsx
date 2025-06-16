function Span(str) {
	return <span>{str}</span>;
}
export function App() {
	return (
		<div>
			<h1>안녕하세요</h1>
			<span>간단한 앱 구현했습니다</span>
			<div>
				{['a', 'b', 'c'].map((str, idx) => (
					<Span key={idx}>{str}</Span>
				))}
			</div>
		</div>
	);
}

export default App;
