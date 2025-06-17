import { FRAGMENT, TEXT_ELEMENT } from '@src/core/constants';
import { render } from '@src/core/render';
import { beforeEach, describe, expect, it } from 'vitest';

let container: HTMLElement;

beforeEach(() => {
	container = document.createElement('div');
});

describe('render()', () => {
	it('TEXT_ELEMENT를 렌더링한다', () => {
		const vnode = {
			type: TEXT_ELEMENT,
			props: { nodeValue: 'hello' },
			children: [],
		};

		render(vnode, container);

		expect(container.textContent).toBe('hello');
		expect(container.childNodes.length).toBe(1);
		expect(container.firstChild?.nodeType).toBe(Node.TEXT_NODE);
	});

	it('HTML 요소를 렌더링하고 props를 적용한다', () => {
		const vnode = {
			type: 'button',
			props: { id: 'my-btn', className: 'btn' },
			children: [],
		};

		render(vnode, container);

		const button = container.querySelector('button');
		expect(button).toBeTruthy();
		expect(button?.id).toBe('my-btn');
		expect(button?.className).toBe('btn');
	});

	it('children을 재귀 렌더링한다', () => {
		const vnode = {
			type: 'div',
			props: {},
			children: [
				{
					type: TEXT_ELEMENT,
					props: { nodeValue: 'child' },
					children: [],
				},
			],
		};

		render(vnode, container);

		expect(container.innerHTML).toBe('<div>child</div>');
	});

	it('FRAGMENT는 감싸지 않고 children만 렌더링한다', () => {
		const vnode = {
			type: FRAGMENT,
			props: {},
			children: [
				{
					type: 'span',
					props: {},
					children: [
						{
							type: TEXT_ELEMENT,
							props: { nodeValue: 'A' },
							children: [],
						},
					],
				},
				{
					type: 'span',
					props: {},
					children: [
						{
							type: TEXT_ELEMENT,
							props: { nodeValue: 'B' },
							children: [],
						},
					],
				},
			],
		};

		render(vnode, container);

		expect(container.innerHTML).toBe('<span>A</span><span>B</span>');
		expect(container.childNodes.length).toBe(2);
	});

	it('함수형 컴포넌트를 처리한다', () => {
		const MyComponent = () => ({
			type: 'h1',
			props: {},
			children: [
				{
					type: TEXT_ELEMENT,
					props: { nodeValue: 'Hello' },
					children: [],
				},
			],
		});

		const vnode = {
			type: MyComponent,
			props: {},
			children: [],
		};

		render(vnode, container);

		expect(container.innerHTML).toBe('<h1>Hello</h1>');
	});
});
