<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FieldMeta } from '@/lib/crm'

const props = defineProps<{
  fields: FieldMeta[]
  modelValue: Record<string, string>
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Record<string, string>): void
  (event: 'search'): void
  (event: 'reset'): void
}>()

const localValue = reactive<Record<string, string>>({ ...props.modelValue })

watch(
  () => props.modelValue,
  (next) => {
    Object.keys(localValue).forEach((key) => delete localValue[key])
    Object.assign(localValue, next)
  },
  { deep: true },
)

watch(
  localValue,
  (next) => {
    emit('update:modelValue', { ...next })
  },
  { deep: true },
)

function handleReset() {
  const cleared = Object.fromEntries(props.fields.map((field) => [field.key, '']))
  Object.keys(localValue).forEach((key) => delete localValue[key])
  Object.assign(localValue, cleared)
  emit('update:modelValue', { ...cleared })
  emit('reset')
}
</script>

<template>
  <div class="crm-panel">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      <label v-for="field in fields" :key="field.key" class="flex flex-col gap-2 text-sm text-slate-600">
        <span class="font-medium">{{ field.label }}</span>

        <input
          v-if="field.type === 'text' || field.type === 'number' || field.type === 'date'"
          v-model="localValue[field.key]"
          :type="field.type"
          class="crm-input text-sm"
        />

        <select
          v-else
          v-model="localValue[field.key]"
          class="crm-input text-sm"
        >
          <option value="">全部</option>
          <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </label>
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
      <button class="crm-btn crm-btn-primary" @click="emit('search')">查询</button>
      <button class="crm-btn crm-btn-secondary" @click="handleReset">重置</button>
      <slot name="actions" />
    </div>
  </div>
</template>
