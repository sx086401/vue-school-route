import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import sourceData from "@/data.json";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/protected",
    name: "protected",
    component: () => import("@/views/Protected.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () => import("@/views/Invoices.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/Destination.vue"),
    props: (route: { params: { id: string } }) => ({
      ...route.params,
      id: parseInt(route.params.id),
    }),
    beforeEnter: (to) => {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id.toString())
      );

      if (!exists) {
        return { name: "NotFound" };
      }
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/Experience.vue"),
        props: (route: { params: { id: string } }) => ({
          ...route.params,
          id: parseInt(route.params.id),
        }),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
    // return (
    //   savedPosition ||
    //   new Promise((resolve) => {
    //     setTimeout(() => resolve({ top: 0 }), 3000);
    //   })
    // );
  },
});

router.beforeEach((to, from) => {
  if (to.meta.requireAuth && !window.user) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
