import {
  CONDITION_IN_PORT, // 条件输入节点
  CONDITION_OUT_PORT, // 条件输出节点
  ACTION_OUT_PORT,
  ACTION_IN_PORT,
  BASIC_OR_PORT, // 并行节点
} from "@/modules/port/constants";

import conditionOutPort from "./conditionOutPort"; // 条件输出节点
import conditionInPort from "./conditionInPort"; // 条件输入节点
import actionOutPort from "./actionOutPort"; // 动作输出节点
import actionInPort from "./actionInPort"; // 动作输入节点
import basicOrPort from "./basicOrPort";

export default {
  [CONDITION_OUT_PORT]: conditionOutPort, // 条件输出节点
  [CONDITION_IN_PORT]: conditionInPort, // 条件输入节点
  [BASIC_OR_PORT]: basicOrPort, // 并行节点
  [ACTION_OUT_PORT]: actionOutPort,
  [ACTION_IN_PORT]: actionInPort,
};
