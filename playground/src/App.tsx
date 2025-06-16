// App.tsx
// React와 useRef는 사용 불가하므로 관련 import를 제거합니다.

/**
 * 중첩 및 props를 시연하기 위한 간단한 함수형 컴포넌트입니다.
 * @param {object} props - 컴포넌트 props입니다.
 * @param {string} props.message - 표시할 메시지입니다.
 * @param {any} props.children - 자식 요소입니다.
 */
function ChildComponent({ message, children }) {
	return (
		<div>
			<h3>자식 컴포넌트</h3>
			<p>{message}</p>
			{children}
		</div>
	);
}

/**
 * props 전달 및 간단한 렌더링을 시연하는 또 다른 함수형 컴포넌트입니다.
 * @param {object} props - 컴포넌트 props입니다.
 * @param {string} props.name - 표시할 이름입니다.
 */
function Greeting({ name }) {
	return <p>안녕하세요, {name}님!</p>;
}

/**
 * 메인 애플리케이션 컴포넌트입니다.
 * 이 컴포넌트는 다음과 같은 다양한 기능을 테스트합니다:
 * - 기본 HTML 요소 렌더링.
 * - 함수형 컴포넌트에 props 전달.
 * - 컴포넌트 중첩.
 * - 추가 DOM 노드 없이 요소를 그룹화하기 위한 Fragment 사용.
 * - 네이티브 DOM 요소에 `ref` 속성 시연 (직접 DOM 접근).
 * - 간단한 이벤트 처리 (제공된 `render` 함수로는 상태 변경 시 재렌더링되지 않음).
 */
function App() {
	// useRef를 사용할 수 없으므로 inputRef 선언을 제거합니다.

	// 버튼 클릭을 처리하는 함수입니다.
	const handleFocusClick = () => {
		// `useRef` 대신 ID를 사용하여 DOM 요소에 직접 접근합니다.
		const inputElement = document.getElementById(
			'test-input',
		) as HTMLInputElement;
		if (inputElement) {
			inputElement.focus(); // input 필드에 포커스를 줍니다.
			console.log('Input value via direct DOM access:', inputElement.value);

			// 지시에 따라 alert() 대신 사용자 정의 메시지 박스를 사용합니다.
			const messageBox = document.createElement('div');
			// messageBox.style.cssText 인라인 스타일 제거
			messageBox.innerHTML = `
        <p>입력 필드에 포커스되었습니다!</p>
        <p>값: <span>${inputElement.value}</span></p>
        <button onclick="this.parentNode.remove()">확인</button>
      `;
			document.body.appendChild(messageBox);
		}
	};

	return (
		<div>
			<div>
				<h1>🚀 커스텀 React 렌더링 테스트 앱 🚀</h1>

				{/* 섹션 1: 기본 텍스트 및 HTML 요소 */}
				<section>
					<h2>1. 기본 요소 및 텍스트</h2>
					<p>이것은 App 컴포넌트 내에 직접 렌더링된 단락 텍스트입니다.</p>
					<p>
						`string` 및 `number` 자식이 텍스트 노드로 올바르게 변환되는지 테스트
						중입니다. 여기 숫자가 있습니다: <span>12345</span>.
					</p>
				</section>

				{/* 섹션 2: props 및 자식을 사용한 함수형 컴포넌트 사용 */}
				<section>
					<h2>2. Props 및 자식과 함께하는 함수형 컴포넌트</h2>
					<ChildComponent message='이 메시지는 prop으로 전달되었습니다!'>
						<p>그리고 이것은 ChildComponent에 전달된 자식 요소입니다.</p>
						<Greeting name='캔버스 사용자' />
					</ChildComponent>
					<ChildComponent message='ChildComponent의 또 다른 인스턴스입니다.'>
						<p>이것은 여러 자식 컴포넌트를 보여줍니다.</p>
					</ChildComponent>
				</section>

				{/* 섹션 3: Fragment 사용 */}
				<section>
					<h2>3. Fragment 사용 (DOM에 추가적인 div 없음)</h2>
					{/* 제공된 Fragment 함수 대신 JSX 단축 문법을 사용합니다. */}
					<>
						<p>이 단락은 Fragment 안에 있습니다.</p>
						<p>
							이것도 마찬가지입니다. DOM을 확인하세요; 래퍼 div가 없어야 합니다.
						</p>
					</>
				</section>

				{/* 섹션 4: Ref 시연 */}
				<section>
					<h2>4. Ref 시연 (입력 포커스)</h2>
					<div>
						<input
							type='text'
							id='test-input' // 직접 DOM 접근을 위해 ID를 추가합니다.
							// ref prop을 제거합니다.
							placeholder='여기에 무엇이든 입력하세요...'
							// className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200" 클래스 제거
						/>
						<button
							onClick={handleFocusClick}
							// className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition transform hover:scale-105 duration-200" 클래스 제거
						>
							입력 포커스 및 값 확인
						</button>
					</div>
					<p>
						버튼을 클릭하여 직접 DOM 접근을 통해 위 입력 필드에 프로그래밍
						방식으로 포커스합니다. 콘솔 로그와 사용자 정의 메시지 박스에 값이
						표시됩니다.
					</p>
				</section>

				{/* 섹션 5: 복잡한 중첩 */}
				<section>
					<h2>5. 복잡한 중첩</h2>
					<div>
						<p>이것은 가장 바깥쪽 div입니다.</p>
						<div>
							<p>이것은 중첩된 div입니다.</p>
							<ChildComponent message='깊이 중첩된 컴포넌트!'>
								<Greeting name='중첩된 세상' />
								<p>훨씬 더 깊이 중첩된 내용입니다.</p>
							</ChildComponent>
						</div>
					</div>
				</section>

				<p>--- 테스트 앱 끝 ---</p>
			</div>
		</div>
	);
}

export default App;
