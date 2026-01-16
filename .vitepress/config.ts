import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue Modeler',
  description: 'Мощная библиотека для управления состоянием в Vue.js приложениях',
  
  head: [
    ['link', { rel: 'icon', href: '/public/logo.webp', type: 'image/webp' }],
  ],
  
  themeConfig: {
    logo: '/public/logo.webp',
    nav: [
      { text: 'Введение', link: '/introduction/' },
      { text: 'Установка', link: '/installation/' },
      { text: 'Быстрый старт', link: '/getting-started/' },
    ],

    sidebar: [
      {
        text: 'Введение',
        items: [
          { text: 'Что такое vue-modeler', link: '/introduction/' },
          { text: 'Установка', link: '/installation/' },
          { text: 'Быстрый старт', link: '/getting-started/' },
        ]
      },
      {
        text: 'Основы',
        items: [
          { text: 'Контейнер', link: '/guides/container/' },
          { text: 'Модель', link: '/guides/models/' },
          { text: 'Действие', link: '/guides/actions/' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Модель', link: '/guides/models/api/' },
          { text: 'Действие', link: '/guides/actions/api/' },
        ]
      },
      {
        text: 'Продвинутые темы',
        items: [
          { text: 'Тестирование', link: '/guides/testing/' },
          { text: 'Работа с SSR', link: '/guides/ssr/' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vue-modeler' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Vue Modeler'
    },
  },

  markdown: {
    lineNumbers: true
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
