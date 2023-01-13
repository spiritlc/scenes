import flowList from "./index.vue";
import createFlow from "@/views/MainPage/index.vue";

export default [
  {
    path: "/flow-list",
    name: "flow-list",
    component: flowList,
  },
  {
    path: "/create-flow",
    name: "createFlow",
    component: createFlow,
    meta: {
      hideMenu: true,
    },
  },
  {
    path: "/flow-detail",
    name: "flowDetail",
    component: createFlow,
    meta: {
      hideMenu: true,
    },
  },
];
