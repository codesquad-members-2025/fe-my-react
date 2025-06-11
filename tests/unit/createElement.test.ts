import { createElement } from '@core/createElement';
import { TEXT_ELEMENT_TYPE, TEXT_NODE_VALUE } from '@helpers/constants';
import { SAMPLE_TEXT_ELEMENT } from '@helpers/sampleElements';
import { describe, expect, it } from 'vitest';

describe('createElement', () => {
	it('올바른 타입과 props로 요소를 생성해야 한다', () => {
		const element = createElement({
			type: 'div',
			props: { id: 'app' },
			children: ['Hello', 'World'],
		});

		expect(element.type).toBe('div');
		expect(element.props.id).toBe('app');
		expect(element.props.children).toHaveLength(2);

		// 첫 번째 자식은 텍스트 노드로 변환되어야 함
		expect(element.props.children[0]).toEqual({
			type: TEXT_ELEMENT_TYPE,
			props: {
				nodeValue: 'Hello',
				children: [],
			},
		});
	});

	it('자식 요소를 올바르게 중첩해서 생성해야 한다', () => {
		const childElement = createElement({
			type: 'span',
			props: {},
			children: ['Nested'],
		});

		const parentElement = createElement({
			type: 'div',
			props: {},
			children: [childElement],
		});

		expect(parentElement.props.children).toHaveLength(1);
		expect(parentElement.props.children[0]).toBe(childElement);
	});

	it('createTextElement 결과와 동일한 텍스트 노드를 생성해야 한다', () => {
		const element = createElement({
			type: 'span',
			props: {},
			children: [TEXT_NODE_VALUE],
		});

		expect(element.props.children[0]).toEqual(SAMPLE_TEXT_ELEMENT);
	});
});
