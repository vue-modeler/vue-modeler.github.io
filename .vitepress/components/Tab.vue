<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>


