<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { functionMenus } from './data/functionMenu';

const route = useRoute();
const router = useRouter();

const currentSlug = computed(() => String(route.params.slug || 'dashboard____'));
const expanded = ref<string>(functionMenus[0]?.name || '');
const isDashboardFirst = (name: string) => name.includes('Dashboard');
const normalizeMenuName = (name: string) =>
  name
    .replace(/^[A-Za-z][A-Za-z\s]*\s+/, '')
    .replace(/\s*[-－—]\s*P\d+\b/gi, '')
    .replace(/\bP\d+\b/gi, '')
    .trim();
const getFirstEntrySlug = (firstName: string, firstChildren: { slug: string }[]) => {
  if (isDashboardFirst(firstName)) return 'dashboard____';
  return firstChildren[0]?.slug || '';
};

const goTo = (slug: string) => {
  router.push({ name: 'page', params: { slug } });
};

const toggleFirst = (name: string) => {
  expanded.value = expanded.value === name ? '' : name;
};
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-card">
        <p class="brand-kicker">Poly CRM</p>
        <h1>保利会员管理系统</h1>
        <p>功能清单驱动演示版</p>
      </div>
      <div class="menu-two-level">
        <div v-for="first in functionMenus" :key="first.name" class="menu-first-wrap">
          <button
            class="menu-first"
            @click="isDashboardFirst(first.name) ? goTo(getFirstEntrySlug(first.name, first.children)) : toggleFirst(first.name)"
          >
            <span>{{ normalizeMenuName(first.name) }}</span>
            <span>{{ isDashboardFirst(first.name) ? '↗' : expanded === first.name ? '−' : '+' }}</span>
          </button>
          <div v-if="!isDashboardFirst(first.name) && expanded === first.name" class="menu-second-list">
            <button
              v-for="second in first.children"
              :key="`${first.name}-${second.slug}-${second.name}`"
              class="menu-second"
              :class="{ active: currentSlug === second.slug }"
              @click="goTo(second.slug)"
            >
              {{ normalizeMenuName(second.name) }}
            </button>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <p class="topbar-sub">业务演示环境</p>
          <h2>CRM 会员运营中台</h2>
        </div>
        <button class="topbar-action" @click="goTo('dashboard____')">返回看板</button>
      </header>

      <section class="content-wrap">
        <RouterView />
      </section>
    </main>
  </div>
</template>
