<template>
  <div :class="['card-grid', { 'card-grid-stagger': stagger }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stagger?: boolean
}>()
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.card-grid-stagger > :nth-child(2n) {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .card-grid-stagger > :nth-child(2n) {
    margin-top: 0;
  }
}
</style>

