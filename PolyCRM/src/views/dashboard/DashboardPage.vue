<script setup lang="ts">
import { benefitCategories, coupons, levels, members, pointsAccounts } from '@/mock/data'

const cards = [
  { label: '会员总数', value: members.length },
  { label: '等级数量', value: levels.length },
  { label: '积分账户', value: pointsAccounts.length },
  { label: '优惠券模板', value: coupons.length },
  { label: '权益分类', value: benefitCategories.length },
]
</script>

<template>
  <div class="crm-page">
    <h2 class="crm-page-title">CRM 总览</h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <div v-for="card in cards" :key="card.label" class="crm-card p-5">
        <p class="text-sm text-slate-500">{{ card.label }}</p>
        <p class="mt-2 text-2xl font-semibold" style="color: var(--crm-text-strong)">{{ card.value }}</p>
      </div>
    </div>

    <div class="crm-panel text-sm text-slate-600">
      <p>数据模型已建立关联关系：会员 ↔ 等级、会员 ↔ 积分账户、会员 ↔ 优惠券、等级 ↔ 权益、会员 ↔ 标签。</p>
    </div>
  </div>
</template>
