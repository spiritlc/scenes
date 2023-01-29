import flowList from "./index.vue";
import logicFlowBasic from "./logicFlowBasic.vue";

export default [
  {
    path: "/logic-flow-list",
    name: "logic-flow-list",
    component: flowList,
  },
  {
    path: "/create-logic-flow",
    name: "createLogicFlow",
    component: logicFlowBasic,
    meta: {
      hideMenu: true,
    },
  },
  {
    path: "/logic-flow-detail",
    name: "logicFlowDetail",
    component: logicFlowBasic,
    meta: {
      hideMenu: true,
    },
  },
];
