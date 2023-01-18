// 依赖
import { Graph, Node } from "@antv/x6";
import { register } from "@antv/x6-vue-shape";
// 模板
import BasicNode from "./BasicNode.vue";
// import BasicRelationNode from "./BasicRelationNode.vue";
import BasicOrNode from "./BasicOrNode.vue";
import BasicDescisionNode from "./BasicDescisionNode.vue";
import BasicLogicNode from "./BasicLogicNode.vue";
import GatewayNode from "./GatewayNode.vue";
import TaskNode from "./TaskNode.vue";

// import BasicDescisionGroup from "./BasicDescisionGroup.vue";
import { getPortConfig } from "../../port/index";
import { CONDITION_IN_PORT, CONDITION_OUT_PORT } from "../../port/constants";
// 静态名称
import {
  BASIC_NODE,
  BASIC_OR_NODE,
  BASIC_DESCISION_NODE,
  BASIC_DESCISION_GROUP,
  BASIC_LOGIC_NODE,
  GATEWAY_NODE,
  TASK_NODE,
} from "@/modules/material/constants";

/**
 * 注册基础决策组件/行为组件
 * @param { Node.Properties } options 配置项
 */
export const registerBasicNode = (options: Node.Properties) => {
  register({
    shape: options.name,
    width: 200,
    height: 50,
    component: BasicNode,
    ...options,
  });
};

/**
 * 注册基础逻辑节点
 */
export const registerBasicLogicNode = (options: Node.Properties) => {
  register({
    shape: options.name,
    width: 80,
    height: 80,
    component: BasicLogicNode,
    ...options,
  });
};

// 注册基础并行节点
export const registerBasicOrNode = (options: Node.Properties) => {
  register({
    shape: options.name,
    width: 100,
    height: 100,
    component: BasicOrNode,
    ...options,
  });
};
// 注册决策组决策节点
export const registerBasicDescisionNode = (options?: Node.Properties) => {
  register({
    shape: BASIC_DESCISION_NODE,
    width: 200,
    height: 50,
    component: BasicDescisionNode,
    ...options,
  });
};
/**
 * 注册决策组节点
 */
let isRegisterDescisionGroup = false;
export const registerBasicDescisionGroup = () => {
  if (isRegisterDescisionGroup) return;
  isRegisterDescisionGroup = true;
  Graph.registerNode(BASIC_DESCISION_GROUP, {
    inherit: "polygon", // 继承于 rect 节点
    width: 100,
    height: 100,
    label: "决策组",
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: "#5F95FF",
        fill: "#FFF",
        refPoints: "0,10 10,0 20,10 10,20",
      },
      text: {
        fontSize: 12,
        fill: "#262626",
      },
    },
    ports: getPortConfig({
      portTemplates: [CONDITION_IN_PORT, CONDITION_OUT_PORT],
    }),
  });
};

/**
 * 注册网关节点
 */
export const registerGatewayNode = (options: Node.Properties) => {
  register({
    shape: GATEWAY_NODE,
    width: 60,
    height: 60,
    component: GatewayNode,
    ...options,
  });
  // Graph.registerNode(
  //   "gateway",
  //   {
  //     inherit: "polygon",
  //     width: 60,
  //     height: 60,
  //     attrs: {
  //       body: {
  //         refPoints: "0,10 10,0 20,10 10,20",
  //         strokeWidth: 2,
  //         stroke: "#5F95FF",
  //         fill: "#FFF",
  //       },
  //       label: {
  //         text: "+",
  //         fontSize: 38,
  //         fill: "#5F95FF",
  //       },
  //     },
  //   },
  //   true
  // );
};
/**
 *
 */
export const registerTaskNode = (options: Node.Properties) => {
  register({
    shape: TASK_NODE,
    width: 200,
    height: 100,
    component: TaskNode,
    ...options,
  });
};

export default {
  [BASIC_NODE]: registerBasicNode,
  [BASIC_LOGIC_NODE]: registerBasicLogicNode, // 基础逻辑节点
  [BASIC_OR_NODE]: registerBasicOrNode,
  [BASIC_DESCISION_NODE]: registerBasicDescisionNode,
  [BASIC_DESCISION_GROUP]: registerBasicDescisionGroup,
  [GATEWAY_NODE]: registerGatewayNode,
  [TASK_NODE]: registerTaskNode,
};
