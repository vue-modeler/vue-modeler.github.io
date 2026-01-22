import { defineConfig } from 'vitepress'
import { fmTitlePlugin } from 'vitepress-plugin-frontmatter'

export default defineConfig({
  title: 'Vue Modeler',
  description: 'Мощная библиотека для управления состоянием в Vue.js приложениях',
  
  head: [
    ['link', { rel: 'icon', href: '/public/logo.webp', type: 'image/webp' }],
  ],
  
  themeConfig: {
    logo: '/public/logo.webp',
    nav: [
      { text: 'Введение', link: '/introduction/', activeMatch: '/introduction/' },
      { text: 'Руководство', link: '/guides/' , activeMatch: '/guides/'},
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      { text: 'Продвинутые темы', link: '/advanced/testing', activeMatch: '/advanced/' },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'Обзор', link: '/api/' },
            { text: 'ProtoModel', link: '/api/proto-model' },
            { text: 'Action', link: '/api/action' },
            { text: 'ActionError', link: '/api/action-error' },
            { text: 'Внутренние ошибки', link: '/api/action-internal-errors' },
            { text: 'Интерфейсы и типы', link: '/api/interfaces' },
          ]
        },
      ],
      '/api': [
        {
          text: 'API',
          items: [
            { text: 'Обзор', link: '/api/' },
            { text: 'ProtoModel', link: '/api/proto-model' },
            { text: 'Action', link: '/api/action' },
            { text: 'ActionError', link: '/api/action-error' },
            { text: 'Внутренние ошибки', link: '/api/action-internal-errors' },
            { text: 'Интерфейсы и типы', link: '/api/interfaces' },
          ]
        },
      ],
      '/': [
        {
          text: 'Введение',
          items: [
            { text: 'Что такое vue-modeler', link: '/introduction/' },
            { text: 'Установка', link: '/introduction/installation' },
            { text: 'Быстрый старт', link: '/introduction/getting-started' },
          ]
        },
        {
          text: 'Руководства',
          items: [
            { text: 'Контейнер зависимостей', link: '/guides/' },
            { text: 'Модель', link: '/guides/model' },
            { text: 'Действие', link: '/guides/action' },
          ]
        },
        {
          text: 'Продвинутые темы',
          items: [
            { text: 'Валидация аргументов', link: '/advanced/args-validation' },
            { text: 'Тестирование', link: '/advanced/testing' },
            { text: 'Работа с SSR', link: '/advanced/ssr' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vue-modeler' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Aleksandr Bratko'
    },
  },

  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(fmTitlePlugin)
    }
  },

  vite: {
    server: {
      watch: {
        // Use polling instead of native file watcher
        usePolling: true,
        interval: 1000,
        binaryInterval: 3000,
        // Ignore more directories
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/.vite/**',
          '**/.vitepress/cache/**',
          '**/public/**',
          '**/coverage/**',
          '**/test/**',
          '**/tests/**',
          '**/__tests__/**',
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/log/**',
          '**/logs/**',
          '**/tmp/**',
          '**/temp/**'
        ]
      },
      fs: {
        // Allow serving files from these directories
        allow: [
          '..', // Allow parent directory
          '/home/abratko/webprojects/vue-modeler'
        ]
      }
    },
    optimizeDeps: {
      // Force dependency pre-bundling
      include: ['vue', 'vue-router']
    }
  }
})
