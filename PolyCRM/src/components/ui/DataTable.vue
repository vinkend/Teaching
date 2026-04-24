<script setup lang="ts">
import type { ColumnMeta } from '@/lib/crm'

defineProps<{
  columns: ColumnMeta[]
  rows: Record<string, unknown>[]
}>()
</script>

<template>
  <div class="crm-card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-slate-50 text-slate-700">
          <tr>
            <th class="w-10 px-4 py-3"><input type="checkbox" /></th>
            <th v-for="column in columns" :key="column.key" class="whitespace-nowrap px-4 py-3 font-semibold">{{ column.label }}</th>
            <th class="whitespace-nowrap px-4 py-3 font-semibold">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows" :key="String(row.id ?? row.code)" class="border-t border-slate-100 odd:bg-white even:bg-slate-50/40">
            <td class="px-4 py-3"><input type="checkbox" /></td>
            <td v-for="column in columns" :key="column.key" class="whitespace-nowrap px-4 py-3 text-slate-700">{{ row[column.key] }}</td>
            <td class="whitespace-nowrap px-4 py-3">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
