import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        { path: 'dashboard', component: () => import('@/views/dashboard/DashboardPage.vue') },
        { path: 'member-center', component: () => import('@/views/member-center/MemberCenterPage.vue') },

        { path: 'members', component: () => import('@/views/members/MemberListPage.vue') },
        { path: 'members/new', component: () => import('@/views/members/MemberFormPage.vue') },
        { path: 'members/:id', component: () => import('@/views/members/MemberDetailPage.vue') },
        { path: 'members/:id/edit', component: () => import('@/views/members/MemberFormPage.vue') },

        { path: 'levels', component: () => import('@/views/levels/LevelListPage.vue') },
        { path: 'levels/new', component: () => import('@/views/levels/LevelFormPage.vue') },
        { path: 'levels/:id', component: () => import('@/views/levels/LevelDetailPage.vue') },
        { path: 'levels/:id/edit', component: () => import('@/views/levels/LevelFormPage.vue') },

        { path: 'points', component: () => import('@/views/points/PointsListPage.vue') },
        { path: 'points/new', component: () => import('@/views/points/PointsFormPage.vue') },
        { path: 'points/:id', component: () => import('@/views/points/PointsDetailPage.vue') },
        { path: 'points/:id/edit', component: () => import('@/views/points/PointsFormPage.vue') },

        { path: 'coupons', component: () => import('@/views/coupons/CouponListPage.vue') },
        { path: 'coupons/new', component: () => import('@/views/coupons/CouponFormPage.vue') },
        { path: 'coupons/:id', component: () => import('@/views/coupons/CouponDetailPage.vue') },
        { path: 'coupons/:id/edit', component: () => import('@/views/coupons/CouponFormPage.vue') },

        { path: 'benefits', component: () => import('@/views/benefits/BenefitListPage.vue') },
        { path: 'benefits/new', component: () => import('@/views/benefits/BenefitFormPage.vue') },
        { path: 'benefits/:id', component: () => import('@/views/benefits/BenefitDetailPage.vue') },
        { path: 'benefits/:id/edit', component: () => import('@/views/benefits/BenefitFormPage.vue') },

        { path: 'tags', component: () => import('@/views/tags/TagListPage.vue') },
        { path: 'tags/new', component: () => import('@/views/tags/TagFormPage.vue') },
        { path: 'tags/:id', component: () => import('@/views/tags/TagDetailPage.vue') },
        { path: 'tags/:id/edit', component: () => import('@/views/tags/TagFormPage.vue') },
      ],
    },
  ],
})

export default router
