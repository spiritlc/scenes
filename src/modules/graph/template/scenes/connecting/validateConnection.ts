import { ValidateConnectionArgs } from "@/modules/graph/types";
import { Graph } from "@antv/x6";
import createGraphRules from "@/modules/graph/rules";
import graphRulesMap from "@/modules/graph/rules/graphRulesMap";
import {
  CHECK_SAME_PORT,
  CHECK_PORT_TYPE,
  CHECK_OR_PORT,
  CHECK_CONDITION_PORT,
} from "@/modules/graph/rules/constants";

/**
 * 在移动边的时候判断连接是否有效，
 * 如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素。
 */
const rulesArr: Array<keyof typeof graphRulesMap> = [
  CHECK_SAME_PORT, // 相同节点不能连接
  CHECK_PORT_TYPE, // 连线只能从输出节点到输入节点
  CHECK_OR_PORT, // 校验逻辑关系节点-并行节点
  CHECK_CONDITION_PORT,
];
export default function (this: Graph, params: ValidateConnectionArgs) {
  return createGraphRules(rulesArr, params, this)();
}

// createGraphRules(rulesArr);

// (
//   this: Graph,
//   params: ValidateConnectionArgs
// ) {
//   return createGraphRules(rulesArr, params)(this);
// }
