<template>
  <div class="card">
    <h3 v-if="title" class="card-title">
      <span v-if="icon" class="card-icon">{{ getIcon(icon) }}</span>
      {{ title }}
    </h3>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
}>()

function getIcon(icon: string): string {
  const icons: Record<string, string> = {
    database: '🗄️',
    play: '▶️',
    code: '💻',
    check: '✓',
    download: '⬇️',
    warning: '⚠️',
    stop: '⏹️',
    lock: '🔒',
  }
  return icons[icon] || ''
}
</script>

<style scoped>
.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-icon {
  font-size: 1.5rem;
}

.card-content {
  flex: 1;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>

