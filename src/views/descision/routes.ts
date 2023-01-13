// 决策点相关页面
import descisionNodeList from "./descisionNode.vue";
import createDescision from "@/views/MainPage/index.vue";

// 决策组相关页面
import descisionGroupList from "./descisionGroup.vue";

export default [
  // 决策点路由
  {
    path: "/descision-node-list",
    name: "descisionNodeList",
    component: descisionNodeList,
  },
  {
    path: "/create-descision-node",
    name: "createDescisionNode",
    component: createDescision,
    meta: {
      hideMenu: true,
    },
  },
  {
    path: "/descision-detail",
    name: "descisionDetail",
    component: createDescision,
    meta: {
      hideMenu: true,
    },
  },
  // 决策组路由
  {
    path: "/descision-group-list",
    name: "descisionGroupList",
    component: descisionGroupList,
  },
  {
    path: "/create-descision-group",
    name: "createDescisionGroup",
    component: createDescision,
    meta: {
      hideMenu: true,
    },
  },
];
