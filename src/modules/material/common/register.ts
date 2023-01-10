// 依赖
import { register } from "@antv/x6-vue-shape";
// 模板
import BasicNode from "./BasicNode.vue";
import BasicConditionNode from "./BasicConditionNode.vue";
import BasicActionNode from "./BasicActionNode.vue";
import BasicRelationNode from "./BasicRelationNode.vue";
import BasicOrNode from "./BasicOrNode.vue";
import { Node } from "@antv/x6";
// 静态名称
import {
  BASIC_NODE,
  BASIC_CONDITION_NODE,
  BASIC_ACTION_NODE,
  BASIC_RELATION_NODE,
  BASIC_OR_NODE,
} from "@/modules/material/constants";

export const registerBasicNode = (options: Node.Properties) => {
  console.log(options);
  register({
    shape: options.name,
    width: 200,
    height: 50,
    component: BasicNode,
    ...options,
  });
};
// 注册基础条件节点
export const registerBasicConditionNode = () => {
  register({
    shape: BASIC_CONDITION_NODE,
    width: 200,
    height: 50,
    component: BasicConditionNode,
  });
};
// 注册基础动作节点
export const registerBasicActionNode = () => {
  register({
    shape: BASIC_ACTION_NODE,
    width: 200,
    height: 50,
    component: BasicActionNode,
  });
};

// 注册逻辑节点
export const registerRelationNode = () => {
  register({
    shape: BASIC_RELATION_NODE,
    width: 100,
    height: 100,
    component: BasicRelationNode,
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

export default {
  [BASIC_NODE]: registerBasicNode,
  [BASIC_CONDITION_NODE]: registerBasicConditionNode,
  [BASIC_ACTION_NODE]: registerBasicActionNode,
  [BASIC_RELATION_NODE]: registerRelationNode,
  [BASIC_OR_NODE]: registerBasicOrNode,
};
