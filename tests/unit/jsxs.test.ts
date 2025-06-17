import { jsxs } from '@src/jsx-runtime';
import { describe, expect, it } from 'vitest';

const testCases = [
	{
		message: 'children과 ref가 없을 때 type과 props만 포함된다',
		input: ['ul', { className: 'list' }, null],
		expected: {
			type: 'ul',
			props: { className: 'list' },
		},
	},
	{
		message: 'key가 null이 아닐 경우 key도 포함된다',
		input: ['li', { className: 'item' }, 'item-key'],
		expected: {
			type: 'li',
			props: { className: 'item' },
			key: 'item-key',
		},
	},
	{
		message: 'children이 배열로 들어올 경우 그대로 포함된다',
		input: ['div', { children: ['a', 'b'] }, null],
		expected: {
			type: 'div',
			props: {},
			children: ['a', 'b'],
		},
	},
	{
		message: 'ref가 있을 경우 포함된다',
		input: ['section', { ref: 'ref-sec', children: [] }, null],
		expected: {
			type: 'section',
			props: {},
			children: [],
			ref: 'ref-sec',
		},
	},
	{
		message: 'children과 ref가 모두 있을 경우 둘 다 포함된다',
		input: [
			'nav',
			{ children: ['Home', 'About'], ref: 'ref-nav', role: 'navigation' },
			null,
		],
		expected: {
			type: 'nav',
			props: { role: 'navigation' },
			children: ['Home', 'About'],
			ref: 'ref-nav',
		},
	},
];

describe('jsxs()', () => {
	for (const { message, input, expected } of testCases) {
		it(message, () => {
			const result = jsxs(...input);
			expect(result).toEqual(expected);
		});
	}
});
