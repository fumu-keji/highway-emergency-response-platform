import { createRouter, createWebHashHistory } from "vue-router";
// 引入模块路由

const routes = [
  {
    path: "/",
    component: () => import("@/components/singleComponent/AppSkeleton.vue"),
    redirect: { name: "eventCollection" },
    children: [
      {
        path: "disposalStatistics",
        name: "disposalStatistics",
        meta: { activeMenuIndex: "disposalStatistics"},
        component: () => import("@/views/business/disposalStatistics/disposalStatistics.vue"),
      },
      {
        path: "taskReceiving",
        name: "taskReceiving",
        meta: { activeMenuIndex: "taskReceiving"},
        component: () => import("@/views/business/taskReceiving/taskReceiving.vue"),
      },
      {
        path: "onSiteHandling",
        name: "onSiteHandling",
        meta: { activeMenuIndex: "onSiteHandling"},
        component: () => import("@/views/business/onSiteHandling/onSiteHandling.vue"),
      },
      {
        path: "eventCollection",
        name: "eventCollection",
        meta: { activeMenuIndex: "eventCollection"},
        component: () => import("@/views/business/eventCollection/eventCollection.vue"),
      },

    ],
  },

];
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});
