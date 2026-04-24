<script setup lang="ts">
import { reactive } from 'vue'
import type { FieldMeta } from '@/lib/crm'

const props = defineProps<{
  title: string
  fields: FieldMeta[]
  initial: Record<string, unknown>
}>()

const formState = reactive<Record<string, unknown>>({ ...props.initial })
</script>

<template>
  <form class="crm-panel" @submit.prevent>
    <h2 class="crm-section-title">{{ title }}</h2>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <label v-for="field in fields" :key="field.key" class="flex flex-col gap-2 text-sm text-slate-600">
        <span class="font-medium">{{ field.label }}</span>

        <input
          v-if="field.type === 'text' || field.type === 'number' || field.type === 'date'"
          v-model="formState[field.key]"
          :type="field.type"
          class="crm-input text-sm"
        />

        <select
          v-else
          v-model="formState[field.key]"
          class="crm-input text-sm"
        >
          <option value="">请选择</option>
          <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </label>
    </div>

    <div class="mt-6 flex gap-2">
      <button type="submit" class="crm-btn crm-btn-primary">保存</button>
      <RouterLink to=".." class="crm-btn crm-btn-secondary">取消</RouterLink>
    </div>
  </form>
</template>
