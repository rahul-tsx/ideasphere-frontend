import { defineConfig, loadEnv } from 'vite';
import viteReact from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
	  define: {
		'process.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
		'process.env.VITE_SUB_URL': JSON.stringify(env.VITE_SUB_URL),
	  },
	  plugins: [viteReact()],
	  resolve: {
				alias: {
					'@': path.resolve(__dirname, './src'),
				},
			},
	}
  })
