import { createElement } from '@core/createElement';
import { TEXT_NODE_VALUE } from '@helpers/constants';
import { SAMPLE_TEXT_ELEMENT } from '@helpers/sampleElements';
import { describe, expect, it } from 'vitest';

describe('createElement', () => {
	it('기본 key(null)와 props(children) 없이 생성하면 빈 children 배열을 가진다', () => {
		const el = createElement('div', { children: [] });
		expect(el.type).toBe('div');
		expect(el.key).toBeNull();
		expect(el.props.children).toEqual([]);
	});

	it('세 번째 인자로 전달한 key를 그대로 설정한다', () => {
		const el = createElement('section', { children: [] }, 'custom-key');
		expect(el.key).toBe('custom-key');
	});

	it('문자열 자식을 TEXT_ELEMENT로 변환하고, nodeValue/children을 올바르게 설정한다', () => {
		const el = createElement('p', { children: [TEXT_NODE_VALUE] });
		expect(el.props.children).toHaveLength(1);
		expect(el.props.children[0]).toEqual(SAMPLE_TEXT_ELEMENT);
	});

	it('VNode 자식을 레퍼런스 그대로 유지한다', () => {
		const child = createElement(
			'span',
			{ children: [TEXT_NODE_VALUE] },
			'child-key',
		);
		const parent = createElement('div', { children: [child] }, 'parent-key');
		expect(parent.props.children).toHaveLength(1);
		expect(parent.props.children[0]).toBe(child);
	});
});
