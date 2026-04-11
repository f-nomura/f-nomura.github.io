// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'f-nomura',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://f-nomura.github.io' }],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' }, 
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
