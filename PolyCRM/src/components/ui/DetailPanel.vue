<script setup lang="ts">
defineProps<{
  title: string
  items: Array<{ label: string; value: string | number | null | undefined }>
}>()
</script>

<template>
  <section class="crm-panel">
    <h3 class="crm-section-title">{{ title }}</h3>
    <dl class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in items" :key="item.label" class="rounded-lg bg-slate-50 p-3.5">
        <dt class="text-xs text-slate-500">{{ item.label }}</dt>
        <dd class="mt-1 text-sm font-medium text-slate-900">{{ item.value ?? '-' }}</dd>
      </div>
    </dl>
  </section>
</template>
