import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Card from '../components/Card.vue'
import CardGrid from '../components/CardGrid.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Регистрируем компоненты глобально
    app.component('Card', Card)
    app.component('CardGrid', CardGrid)
  }
} satisfies Theme

