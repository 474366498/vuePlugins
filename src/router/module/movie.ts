import Layout from "@/components/layout/index.vue";

export default {
  path: '/movie',
  name: "Movie",
  component: Layout,
  meta: {
    title: "电影管理",
  },
  redirect: { name: "Movie" },
  children: [{
    path: "list",
    name: "MovieList",
    component: () => import('@/components/HelloWorld.vue'),
    meta: {
      title: "电影列表",
    },
  }]
}
