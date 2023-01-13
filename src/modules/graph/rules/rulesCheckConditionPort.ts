import { SelfValidateConnectionArgs } from "@/modules/graph/types";
import { CONDITION_PORT } from "@/modules/port/constants";
import { PORT_IN_PUT } from "../../port/constants";
import { Cell, Graph } from "@antv/x6";

/**
 * 检验决策节点
 */
export default function checkConditionPort(
  {
    targetCell,
    sourcePortName,
    targetPortName,
    targetPortType,
  }: SelfValidateConnectionArgs,
  graph: Graph
) {
  if (sourcePortName !== CONDITION_PORT && targetPortName !== CONDITION_PORT) {
    return true;
  }
  // 决策输入节点, 决策输入节点单一入口
  if (
    targetPortType === PORT_IN_PUT &&
    graph.getIncomingEdges(targetCell as Cell)
  ) {
    return false;
  }
  // 决策输出节点

  // 校验决策输入节点
  return true;
}
