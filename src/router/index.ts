import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/common/index.vue";
import ConfigView from "../configTest/index.vue";

import sceneView from "@/views/scene/index.vue";

import RulesRoutes from "@/views/descision/routes"; // 决策路由
import FlowRoutes from "@/views/flow/routes"; // 流程路由
import LogicFlowRoutes from "@/views/LogicFlow/routes"; // bpmn路由

const routes: Array<RouteRecordRaw> = [
  {
    path: "/scene",
    name: "scene",
    component: sceneView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [...RulesRoutes, ...FlowRoutes],
  },
  ...LogicFlowRoutes,
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
