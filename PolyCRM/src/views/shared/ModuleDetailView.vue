<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DetailPanel from '@/components/ui/DetailPanel.vue'
import { getDetailById, moduleMetaMap, type ModuleKey } from '@/lib/crm'

const props = defineProps<{ moduleKey: ModuleKey }>()
const route = useRoute()

const detail = computed(() => getDetailById(props.moduleKey, String(route.params.id)))
const meta = computed(() => moduleMetaMap[props.moduleKey])

const baseItems = computed(() => {
  if (!detail.value) return []
  return Object.entries(detail.value)
    .filter(([_, value]) => typeof value !== 'object')
    .slice(0, 12)
    .map(([key, value]) => ({ label: key, value: String(value) }))
})

const relationItems = computed(() => {
  if (!detail.value) return []
  return Object.entries(detail.value)
    .filter(([_, value]) => Array.isArray(value) || (value && typeof value === 'object'))
    .map(([key, value]) => ({
      label: key,
      value: Array.isArray(value) ? '关联数量: ' + value.length : '已关联',
    }))
})
</script>

<template>
  <div class="crm-page">
    <div class="crm-page-header">
      <h2 class="crm-page-title">{{ meta.title }}详情</h2>
      <div class="flex gap-2">
        <RouterLink :to="meta.listPath" class="crm-btn crm-btn-secondary">返回列表</RouterLink>
        <RouterLink :to="meta.formPath(String(route.params.id))" class="crm-btn crm-btn-primary">编辑</RouterLink>
      </div>
    </div>

    <DetailPanel title="基础信息" :items="baseItems" />
    <DetailPanel title="关联关系" :items="relationItems" />
  </div>
</template>
