---
title: Установка
description: Инструкции по установке и настройке Vue Modeler
---

## Ставим пакетыччч

<CodeGroup>

<CodeGroupItem title="Vue 3">
```bash
npm install @vue-modeler/dc@^3.0.0 @vue-modeler/model
```
</CodeGroupItem

```bash:Vue 2
npm install @vue-modeler/dc@^2.0.0 @vue-modeler/model
```
</CodeGroup>
  
**@vue-modeler/model** не требует дополнительных настроек.
**@vue-modeler/dc** нужно подключить в приложение.

## Подключаем контейнер

### Нативный Vue проект 

<CodeGroup>
```js:Vue 3
import { createApp } from 'vue'
import { vueModelerDc } from '@vue-modeler/dc'

const app = createApp(App)
app.use(vueModelerDc)
app.mount('#app')
```

```js:Vue 2
import Vue from 'vue'
import { vueModelerDc } from '@vue-modeler/dc'

Vue.use(vueModelerDc)
new Vue({
  // your app configuration
}).$mount('#app')
```
</CodeGroup>

### Nuxt проект

Просто создайте плагин для Nuxt в папке `plugins`

```typescript
// plugins/vue-modeler-dc.ts
import { vueModelerDc } from '@vue-modeler/dc'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueModelerDc)
})
```

Всё готово для начала работы!

## Следующие шаги

После установки вы можете:

1. [Изучить быстрый старт](/getting-started/)
2. [Создать первую модель](/guides/models/)
3. [Познакомиться с действиями](/guides/actions/)
4. [Изучить примеры](/examples/simple/) 