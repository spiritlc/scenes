import { CHECK_PORT_TYPE, CHECK_SAME_PORT } from "./constants";

import checkSamePort from "./rulesCheckSamePort"; // 校验是否为同一节点
import checkPortType from "./rulesCheckPortType"; // 校验连线的输入和输出类型

const graphRulesMap = {
  [CHECK_SAME_PORT]: checkSamePort,
  [CHECK_PORT_TYPE]: checkPortType,
};
export default graphRulesMap;
