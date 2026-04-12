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
					label: 'Documents',
					autogenerate: { directory: 'documents' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
