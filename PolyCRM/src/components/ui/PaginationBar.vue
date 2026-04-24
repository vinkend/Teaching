<script setup lang="ts">
const props = defineProps<{
  page: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  (event: 'update:page', value: number): void
  (event: 'update:pageSize', value: number): void
}>()

function goPrev() {
  if (props.page <= 1) return
  emit('update:page', props.page - 1)
}

function goNext() {
  if (props.page >= totalPages) return
  emit('update:page', props.page + 1)
}

const totalPages = Math.max(Math.ceil(props.total / props.pageSize), 1)
</script>

<template>
  <div class="crm-card mt-4 flex items-center justify-between px-4 py-3 text-sm text-slate-600">
    <div>共 {{ total }} 条</div>

    <div class="flex items-center gap-2">
      <button class="crm-btn crm-btn-secondary !h-8 !px-3 disabled:opacity-50" :disabled="page <= 1" @click="goPrev">上一页</button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button class="crm-btn crm-btn-secondary !h-8 !px-3 disabled:opacity-50" :disabled="page >= totalPages" @click="goNext">下一页</button>
      <select class="crm-input !h-8 !px-2.5 text-sm" :value="String(pageSize)" @change="emit('update:pageSize', Number(($event.target as HTMLSelectElement).value))">
        <option :value="10">10 / 页</option>
        <option :value="20">20 / 页</option>
        <option :value="50">50 / 页</option>
      </select>
    </div>
  </div>
</template>
