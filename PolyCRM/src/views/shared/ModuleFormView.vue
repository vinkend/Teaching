<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EntityForm from '@/components/ui/EntityForm.vue'
import { getDefaultFormValue, getDetailById, moduleMetaMap, type ModuleKey } from '@/lib/crm'

const props = defineProps<{ moduleKey: ModuleKey }>()
const route = useRoute()

const meta = computed(() => moduleMetaMap[props.moduleKey])
const isEdit = computed(() => Boolean(route.params.id))
const initial = computed<Record<string, unknown>>(() => {
  if (!isEdit.value) return getDefaultFormValue(props.moduleKey) as Record<string, unknown>
  return (
    (getDetailById(props.moduleKey, String(route.params.id)) as Record<string, unknown> | null) ??
    (getDefaultFormValue(props.moduleKey) as Record<string, unknown>)
  )
})
</script>

<template>
  <div class="crm-page">
    <div class="crm-page-header">
      <h2 class="crm-page-title">{{ isEdit ? '编辑' : '新增' }}{{ meta.title }}</h2>
      <RouterLink :to="meta.listPath" class="crm-btn crm-btn-secondary">返回列表</RouterLink>
    </div>

    <EntityForm :title="meta.title + '表单'" :fields="meta.formFields" :initial="initial" />
  </div>
</template>
