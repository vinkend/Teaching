<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/ui/DataTable.vue'
import FilterPanel from '@/components/ui/FilterPanel.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import { filterRows, getListRows, moduleMetaMap, type ModuleKey } from '@/lib/crm'

const props = defineProps<{ moduleKey: ModuleKey }>()
const router = useRouter()
const meta = computed(() => moduleMetaMap[props.moduleKey])

const filters = reactive<Record<string, string>>(
  Object.fromEntries(meta.value.filters.map((field) => [field.key, ''])) as Record<string, string>,
)

const page = ref(1)
const pageSize = ref(10)

const filteredRows = computed(() => filterRows(getListRows(props.moduleKey) as Record<string, unknown>[], filters))

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

function resetPage() {
  page.value = 1
}

function getRowId(row: Record<string, unknown>) {
  return String(row.id ?? row.code)
}
</script>

<template>
  <div class="crm-page">
    <div class="crm-page-header">
      <h2 class="crm-page-title">{{ meta.title }}</h2>
      <RouterLink :to="meta.formPath()" class="crm-btn crm-btn-primary">新增</RouterLink>
    </div>

    <FilterPanel v-model="filters" :fields="meta.filters" @search="resetPage" @reset="resetPage" />

    <DataTable :columns="meta.columns" :rows="pagedRows">
      <template #actions="{ row }">
        <div class="flex gap-2 text-sm">
          <button class="crm-text-link" @click="router.push(meta.detailPath(getRowId(row)))">查看</button>
          <button class="text-slate-700" @click="router.push(meta.formPath(getRowId(row)))">编辑</button>
        </div>
      </template>
    </DataTable>

    <PaginationBar v-model:page="page" v-model:page-size="pageSize" :total="filteredRows.length" />
  </div>
</template>
