import { createRouter, createWebHistory } from 'vue-router';
import DemoPage from './views/DemoPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/page/dashboard____'
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: DemoPage
    }
  ]
});
