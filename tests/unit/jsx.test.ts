import { jsx } from '@src/jsx-runtime';
import { describe, expect, it } from 'vitest';

const testCases = [
	{
		message: 'children과 ref가 없을 때 type과 props만 포함된다',
		input: ['div', { id: 'test' }, null],
		expected: {
			type: 'div',
			props: { id: 'test' },
		},
	},
	{
		message: 'key가 null이 아닐 경우 key도 포함된다',
		input: ['span', { id: 'title' }, 'my-key'],
		expected: {
			type: 'span',
			props: { id: 'title' },
			key: 'my-key',
		},
	},
	{
		message: 'children이 있을 경우 배열로 감싸서 포함된다',
		input: ['p', { id: 'text', children: 'hello' }, null],
		expected: {
			type: 'p',
			props: { id: 'text' },
			children: ['hello'],
		},
	},
	{
		message: 'ref가 있을 경우 포함된다',
		input: ['input', { type: 'text', ref: 'ref-value' }, null],
		expected: {
			type: 'input',
			props: { type: 'text' },
			ref: 'ref-value',
		},
	},
	{
		message: 'children과 ref가 모두 있을 경우 둘 다 포함된다',
		input: ['div', { children: 'world', ref: 'ref1', className: 'box' }, null],
		expected: {
			type: 'div',
			props: { className: 'box' },
			children: ['world'],
			ref: 'ref1',
		},
	},
];

describe('jsx()', () => {
	for (const { message, input, expected } of testCases) {
		it(message, () => {
			const result = jsx(...input);
			expect(result).toEqual(expected);
		});
	}
});
