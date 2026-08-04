// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://f-nomura.github.io',
	integrations: [
		starlight({
			title: 'f-nomura',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://f-nomura.github.io' }],
			sidebar: [
				{
					label: 'notes',
					autogenerate: { directory: 'notes' },
				},
				{
					label: '論文レビュー',
					autogenerate: { directory: '論文レビュー' },
				},
				{
					label: '続・わかりやすいパターン認識',
					autogenerate: { directory: '続・わかりやすいパターン認識' },
				},
			],
		}),
	],
});
