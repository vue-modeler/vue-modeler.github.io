<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tab-pane"
        v-html="tab.content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'

const props = defineProps<{
  default?: string
}>()

const slots = useSlots()
const activeTab = ref(0)

// Извлекаем табы из слотов
const tabs = computed(() => {
  const children = slots.default?.() || []
  return children
    .filter((child: any) => child.type?.name === 'Tab')
    .map((child: any, index: number) => {
      const label = child.props?.label || `Tab ${index + 1}`
      return {
        label,
        content: child.children?.default?.()?.[0]?.children || ''
      }
    })
})
</script>

<style scoped>
.tabs-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1.5rem 0;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.tab-button.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

.tabs-content {
  padding: 1.5rem;
}

.tab-pane {
  width: 100%;
}

.tab-pane :deep(pre) {
  margin: 0;
}
</style>


