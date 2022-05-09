import { createRouter, createWebHistory } from 'vue-router'

// import Movie from './module/movie'
// console.log(4, Movie)
import Layout from "@/components/layout/index.vue";
import Home from '@/pages/home/index.vue'

const routes = [
  {
    path: '/',
    meta: {
      title: 'Index'
    },
    component: Layout,
    redirect: { name: 'Home' },
    children: [
      { path: '/home', name: 'Home', component: Home },
      { path: '/buriedPoint', alias: '/bp', name: 'buriedPoint', component: () => import('@/pages/buriedPoint/index.vue') },
      { path: '/editor', name: 'Editor', component: () => import('@/pages/editor/index.vue') },
      { path: '/upload', name: 'Upload', component: () => import('@/pages/upload/index.vue') },
      { path: '/bigFile', name: 'BigFile', component: () => import('@/pages/big-file/index.vue') },
      { path: '/webWorker', name: 'WebWorker', component: () => import('@/pages/web-worker/index.vue') },
      {
        path: '/parse', name: 'Parse', component: () => import('@/pages/parse/index.vue')
      },
      {
        path: '/fileView', name: 'fileView', component: () => import('@/pages/file-view/index.vue')
      },
      {
        path: '/fileViewPrint', name: 'fileViewPrint', component: () => import('@/pages/file-view-print/index.vue')
      },
      {
        path: '/multimedia', name: 'multimedia', component: () => import('@/pages/multimedia/index.vue')
      },
      {
        path: '/test', name: 'test',
        component:() => import('@/pages/test/index.vue')
      },
      { path: '/error', name: 'Error', component: () => import('@/pages/error/index.vue') }
    ]
  }
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
export default router