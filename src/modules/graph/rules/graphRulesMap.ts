import { CHECK_PORT_TYPE, CHECK_SAME_PORT, CHECK_OR_PORT } from "./constants";

import checkSamePort from "./rulesCheckSamePort"; // 校验是否为同一节点
import checkPortType from "./rulesCheckPortType"; // 校验连线的输入和输出类型
import checkOrPort from "./rulesCheckOrPort"; // 校验并行节点

const graphRulesMap = {
  [CHECK_SAME_PORT]: checkSamePort,
  [CHECK_PORT_TYPE]: checkPortType,
  [CHECK_OR_PORT]: checkOrPort,
};
export default graphRulesMap;
