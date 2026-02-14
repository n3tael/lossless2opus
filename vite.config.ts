import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import pkg from './package.json';
import { readFile } from 'node:fs/promises';

const viteServerConfig = () => ({
	name: 'configure-server',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			next();
		});
	}
});

const getCommit = async () => {
	return (await readFile('.git/logs/HEAD', 'utf8'))
		?.split('\n')
		?.filter(String)
		?.pop()
		?.split(' ')[1];
};

export default defineConfig({
	plugins: [viteServerConfig(), tailwindcss(), sveltekit()],
	build: {
		sourcemap: true
	},
	define: {
		__APP_VERSION__: {
			name: pkg.name,
			version: pkg.version,
			commit: await getCommit()
		}
	}
});
