import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw, RouteComponent } from 'vue-router';

const Layout = (): RouteComponent => import('@/layout/index.vue');
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const constantRoutes: RouteRecordRaw[] = [
  { 
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/profile/index.vue'),
        name: 'Profile',
        meta: { title: '首页', icon: 'user', affix: true }
      }
    ]
  },
  {
    path: '/document',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/external-link/document/index.vue'),
        name: 'Document',
        meta: { title: '扫地机文档', icon: 'documentation' },
      }
    ]
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/renewurl',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/renewurl/index.vue'),
        name: 'RenewUrl',
        meta: { title: 'URL更新', icon: 'example' },
      }
    ]
  },
  {
    path: '/fileupload',
    component: Layout,
    children: [
      {
        path: 'https://c3.relay.xiaomi.com/fs/c3-cleanea-builder00.bj/',
        meta: { title: '服务器文件上传', icon: 'clipboard' },
        redirect: ''
      }
    ]
  },
  {
    path: '/voicepack',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/external-link/voicepack/index.vue'),
        name: 'VoicePack',
        meta: { title: '语音包上传', icon: 'icon' }
      }
    ]
  },
  {
    path: '/whitelist',
    component: Layout,
    redirect: 'index',
    name: 'WhiteList',
    meta: {
      alwaysShow: true,
      title: '内测白名单',
      icon: 'component',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/external-link/whitelist/index.vue'),
        name: 'WhiteListMain',
        meta: { title: '主页', icon: 'search' }
      },
      {
        path: 'conf',
        component: () => import('@/views/external-link/whitelist/conf.vue'),
        name: 'WhiteListConf',
        meta: { title: '配置文件', icon: 'guide' }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index.vue'),
        name: 'Guide',
        meta: { title: '使用说明', icon: 'guide' }
      }
    ]
  },
  {
    path: '/coredump',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/coredump/index.vue'),
        name: 'CoreDump',
        meta: { title: '崩溃日志', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } }
];

// import.meta.env = {
//   BASE_URL: "/mioffice/",
//   DEV: false,
//   MODE: "build_prod",
//   PROD: true,
//   VITE_USER_NODE_ENV: "production"
// }
const createTheRouter = (): Router => createRouter({
  // 注意，如果要配置 HTML5 模式，则需要修改nginx配置，参考资料：
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
});

interface RouterPro extends Router {
  matcher: unknown;
}

const router = createTheRouter() as RouterPro;

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createTheRouter() as RouterPro;
  router.matcher = newRouter.matcher; // reset router
}

export default router;
