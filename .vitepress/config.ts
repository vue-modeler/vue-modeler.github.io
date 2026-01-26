import { defineConfig } from 'vitepress'
import { fmTitlePlugin } from 'vitepress-plugin-frontmatter'

// Для репозитория vue-modeler.github.io используйте base: '/'
// Для репозитория docs используйте base: '/docs/'
const base = '/' // Репозиторий: https://github.com/vue-modeler/vue-modeler.github.io.git

export default defineConfig({
  title: 'Vue Modeler',
  description: 'Мощная библиотека для управления состоянием в Vue.js приложениях',
  
  // Базовый URL для деплоя на GitHub Pages
  base,
  
  head: [
    // Favicon - VitePress автоматически добавляет base к путям в head
    ['link', { rel: 'icon', href: '/logo.webp', type: 'image/webp' }],
    // Стандартный favicon.ico для старых браузеров (если есть)
    // ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    
    // Аналитика
    
    // Cloudflare Web Analytics (бесплатно, GDPR compliant, без cookie banner)
    // Замените 'your-token' на токен из Cloudflare Dashboard → Analytics → Web Analytics
    ['script', { src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "75dc58aef7764625995d8740de68d04e"}', defer: '' }],
    
    // Plausible Analytics (бесплатно до 10k просмотров/месяц, GDPR compliant, без cookie banner)
    // ['script', { 'data-domain': 'vue-modeler.github.io', src: 'https://plausible.io/js/script.js', defer: true }],
    
    // Umami Analytics (self-hosted, полностью бесплатно)
    // ['script', { 'data-website-id': 'your-website-id', src: 'https://analytics.example.com/script.js', defer: true }],
    
    // GoatCounter (бесплатно для небольших сайтов)
    // ['script', { 'data-goatcounter': 'https://your-code.goatcounter.com/count', src: 'https://gc.zgo.at/count.js', async: true }],
  ],
  
  themeConfig: {
    logo: '/logo.webp', // VitePress автоматически добавляет base
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
