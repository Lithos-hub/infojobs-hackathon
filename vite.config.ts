import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://api.infojobs.net/',
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	plugins: [react(), svgr()],
});
