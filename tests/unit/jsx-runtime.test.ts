import * as core from '@src/core';
import { describe, expect, it, vi } from 'vitest';

import { Fragment, jsx, jsxs } from '@src/jsx-runtime';

describe('jsx', () => {
	it('단일 children을 배열로 변환해서 createElement에 전달', () => {
		const spy = vi.spyOn(core, 'createElement');
		const props = { id: 'foo', children: 'hi' };

		jsx('div', props, 'key1');

		expect(spy).toHaveBeenCalledWith({
			type: 'div',
			props: { id: 'foo' },
			children: ['hi'],
			key: 'key1',
		});

		spy.mockRestore();
	});

	it('ref가 없으면 ref를 전달하지 않음', () => {
		const spy = vi.spyOn(core, 'createElement');
		jsx('span', { children: 'hello' });

		const callArg = spy.mock.calls[0][0];
		expect(callArg).not.toHaveProperty('ref');

		spy.mockRestore();
	});
});

describe('jsxs', () => {
	it('다중 children을 그대로 전달', () => {
		const spy = vi.spyOn(core, 'createElement');
		const children = ['a', 'b', 'c'];
		const props = { className: 'foo', children };

		jsxs('div', props, 'key2');

		expect(spy).toHaveBeenCalledWith({
			type: 'div',
			props: { className: 'foo' },
			children,
			key: 'key2',
		});

		spy.mockRestore();
	});

	it('ref가 있을 경우 포함됨', () => {
		const spy = vi.spyOn(core, 'createElement');
		jsxs('ul', { children: ['x'], ref: 'someRef' });

		const callArg = spy.mock.calls[0][0];
		expect(callArg).toHaveProperty('ref', 'someRef');

		spy.mockRestore();
	});
});

describe('Fragment', () => {
	it('createFragment와 같은 참조여야 함', () => {
		expect(Fragment).toBe(core.createFragment);
	});
});
