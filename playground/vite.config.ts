import path from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			'@my-react': path.resolve(__dirname, '../src'),
		},
	},
	esbuild: {
		/* Automatic JSX Runtime 설정 */
		jsxFactory: 'jsx',
		jsxFragment: 'Fragment',
		jsxInject: `import { jsx, jsxs, Fragment } from '@my-react/jsx-runtime'`,
	},
});
