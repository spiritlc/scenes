import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/MainPage/index.vue";
import ConfigView from "../configTest/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/config",
    name: "config",
    component: ConfigView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
