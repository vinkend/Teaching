<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menu = [
  { label: '仪表盘', to: '/dashboard' },
  { label: '会员模块（原型）', to: '/member-center' },
  { label: '会员管理', to: '/members' },
  { label: '会员等级', to: '/levels' },
  { label: '积分管理', to: '/points' },
  { label: '优惠券管理', to: '/coupons' },
  { label: '会员权益', to: '/benefits' },
  { label: '标签分类', to: '/tags' },
]

const activePath = computed(() => '/' + route.path.split('/')[1])
</script>

<template>
  <div class="min-h-screen text-slate-800">
    <div class="flex min-h-screen">
      <aside class="w-64 border-r bg-white" style="border-color: var(--crm-border)">
        <div class="border-b px-5 py-5" style="border-color: var(--crm-border)">
          <p class="text-xs uppercase tracking-wider text-slate-500">Poly CRM</p>
          <h1 class="mt-2 text-lg font-bold" style="color: var(--crm-text-strong)">会员后台系统</h1>
        </div>

        <nav class="space-y-1 p-3">
          <RouterLink
            v-for="item in menu"
            :key="item.to"
            :to="item.to"
            class="block rounded-lg px-3 py-2 text-sm font-medium transition"
            :class="
              item.to === activePath
                ? 'text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            :style="item.to === activePath ? 'background: var(--crm-brand-600)' : ''"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </aside>

      <main class="flex-1">
        <header class="flex h-[4.5rem] items-center justify-between border-b bg-white px-7" style="border-color: var(--crm-border)">
          <div class="text-sm text-slate-500">保利商旅 / 旗舰店</div>
          <div class="rounded-full border px-3 py-1 text-sm text-slate-700" style="border-color: var(--crm-border)">Admin</div>
        </header>

        <section class="px-7 py-6">
          <RouterView />
        </section>
      </main>
    </div>
  </div>
</template>
