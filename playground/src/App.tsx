function Span({ str }) {
	return <span>{str}</span>;
}
export function App() {
	return (
		<div>
			{['a', 'b', 'c'].map((str, idx) => (
				<Span key={idx} str={str} />
			))}
		</div>
	);
}

export default App;
