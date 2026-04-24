<script setup lang="ts">
import type { SiteMapNode } from '../data/sitemap';

const props = defineProps<{
  nodes: SiteMapNode[];
  currentSlug: string;
}>();

const emit = defineEmits<{
  (e: 'go', slug: string): void;
}>();

const isFolderOnly = (node: SiteMapNode) => node.url.startsWith('folder-');
</script>

<template>
  <ul class="tree-list">
    <li v-for="node in props.nodes" :key="node.id" class="tree-item">
      <button
        v-if="!isFolderOnly(node)"
        class="tree-link"
        :class="{ active: props.currentSlug === node.slug }"
        @click="emit('go', node.slug)"
      >
        {{ node.name }}
      </button>
      <div v-else class="tree-folder">{{ node.name }}</div>

      <SidebarTree
        v-if="node.children.length"
        :nodes="node.children"
        :current-slug="props.currentSlug"
        @go="(slug) => emit('go', slug)"
      />
    </li>
  </ul>
</template>
