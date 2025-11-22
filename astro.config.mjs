// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import plantuml from 'astro-plantuml';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ["ru", "en"],
		defaultLocale: "ru",
	},
	integrations: [
		plantuml(),
		starlight({
			title: 'Vue Modeler',
			description: 'Мощная библиотека для управления состоянием в Vue.js приложениях',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/your-username/vue-modeler' },
			],
			sidebar: [
				{
					label: 'Введение',
					items: [
						{ label: 'Что такое vue-modeler', link: '/introduction/' },
						{ label: 'Установка', link: '/installation/' },
						{ label: 'Быстрый старт', link: '/getting-started/' },
					],
				},
				{
					label: 'Основы',
					items: [
						{ label: 'Контейнер', link: '/guides/container/' },
						{ label: 'Модель', link: '/guides/models/' },
						{ label: 'Действие', link: '/guides/actions/' },
					],
				},
				{
					label: 'API',
					items: [
						{ label: 'Модель', link: '/guides/models/api/' },
						{ label: 'Действие', link: '/guides/actions/api/' },
					],
				},
				{
					label: 'Продвинутые темы',
					items: [
						{ label: 'Тестирование', link: '/guides/testing/' },
						{ label: 'Работа с SSR', link: '/guides/ssr/' },
					],
				},
			],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/svg+xml',
						href: '/favicon.svg',
					},
				},
			],
		}),
	],
});

