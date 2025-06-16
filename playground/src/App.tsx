// src/App.tsx
// —————————————————————————————————————————
// 1) 필요한 값과 더미 컴포넌트 정의
// —————————————————————————————————————————
const items = [
	{ id: 1, name: 'Apple' },
	{ id: 2, name: 'Banana' },
	{ id: 3, name: 'Cherry' },
];

const isLoggedIn = true;
const user = { name: 'Seongjun' };
const extraProps = { id: 'main', 'data-role': 'page' } as const;
const htmlString = '<strong>안전하지 않은 HTML</strong>';

// 아래 코드는 추후에 구현
// Toggle 컴포넌트: Function as Child 예시용
// function Toggle({
// 	children,
// }: {
// 	children: (opts: { on: boolean; toggle: () => void }) => React.ReactNode;
// }) {
// 	const [on, setOn] = React.useState(false);
// 	const toggle = () => setOn((o) => !o);
// 	return <>{children({ on, toggle })}</>;
// }

// 더미 컴포넌트들 (실제에는 필요한 컴포넌트로 교체하세요)
function MyComponent(props: any) {
	return <div {...props}>{props.children}</div>;
}
function Header() {
	return <header>Header</header>;
}
function Content() {
	return <main>Content</main>;
}
function Footer() {
	return <footer>Footer</footer>;
}
function Item() {
	return <div>Item</div>;
}
function List(props: any) {
	return <ul {...props}>{props.children}</ul>;
}
function ListItem(props: any) {
	return <li {...props}>{props.children}</li>;
}
function Welcome({ user }: { user: { name: string } }) {
	return <div>Welcome, {user.name}</div>;
}
function LoginForm() {
	return <form>Login Form</form>;
}
function Button(props: any) {
	return <button {...props}>{props.children}</button>;
}

export function App() {
	return (
		<>
			{/* 1. 아무 props·children 없는 단일 태그 */}
			<MyComponent />

			{/* 2. props만 있고 children은 없는 태그 */}
			<MyComponent title='Hello' count={3} disabled />

			{/* 3. children만 있고 props는 없는 태그 */}
			<MyComponent>안녕하세요, JSX!</MyComponent>

			{/* 4. props와 단일 children */}
			<MyComponent type='primary'>클릭하세요</MyComponent>

			{/* 5. props와 다중 children */}
			<MyComponent>
				<Header />
				<Content />
				<Footer />
			</MyComponent>

			{/* 6. 중첩된 children 구조 */}
			<MyComponent>
				<div>
					<section>
						<h1>제목</h1>
						<p>내용</p>
					</section>
				</div>
			</MyComponent>

			{/* 7. Fragment로 여러 요소 그룹화 */}
			<>
				<Item key='a' />
				<Item key='b' />
				<Item key='c' />
			</>

			{/* 8. 표현식({})을 이용한 동적 children */}
			<List>
				{items.map((item) => (
					<ListItem key={item.id}>{item.name}</ListItem>
				))}
			</List>

			{/* 9. 조건부 렌더링 */}
			<MyComponent>
				{isLoggedIn ? <Welcome user={user} /> : <LoginForm />}
			</MyComponent>

			{/** 아래 코드는 추후에 구현 */}
			{/* 10. Function as Child */}
			{/* <Toggle>
				{({ on, toggle }) => (
					<button onClick={toggle}>{on ? '켜짐' : '꺼짐'}</button>
				)}
			</Toggle> */}

			{/* 11. props 스프레드 연산자 */}
			<MyComponent {...extraProps} />

			{/* 12. 이벤트 핸들러 prop */}
			<Button onClick={() => console.log('clicked')}>클릭</Button>

			{/** 아래 코드는 추후에 구현 */}
			{/* 13. 특수 props: dangerouslySetInnerHTML */}
			{/* <div dangerouslySetInnerHTML={{ __html: htmlString }} /> */}
		</>
	);
}

export default App;
