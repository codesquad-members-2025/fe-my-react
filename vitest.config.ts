import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./tests/helpers/testSetup.ts'],
		coverage: {
			reporter: ['text', 'html'],
		},
		include: [
			'src/**/*.{test,spec}.{ts,tsx}',
			'tests/**/*.{test,spec}.{ts,tsx}',
		],
	},
});
