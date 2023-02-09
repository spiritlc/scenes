// 依赖
// import { Graph, Node } from "@antv/x6";
import { register } from "@antv/x6-vue-shape";

import TaskEquipmentNode from "./common/TaskEquipment.vue";

import * as nodeMap from "./constants";

/**
 * 注册基础逻辑节点
 */
const registerTaskEquipment = () => {
  register({
    shape: nodeMap.TASK_EQUIPMENT,
    width: 220,
    height: 120,
    component: TaskEquipmentNode,
  });
};

registerTaskEquipment();
