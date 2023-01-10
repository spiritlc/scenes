import { ValidateConnectionArgs } from "@/modules/graph/types";
import { Graph, Cell } from "@antv/x6";
import {
  BASIC_OR_CONDITION_PORT,
  BASIC_OR_IN_PORT,
  BASIC_OR_OUT_PORT,
} from "@/modules/port/constants";
const basicOrPortArr = [
  BASIC_OR_CONDITION_PORT,
  BASIC_OR_IN_PORT,
  BASIC_OR_OUT_PORT,
];

/**
 * 并行节点 条件链接桩
 * 1.连接非功能组件需要，非功能组件没有连接其他节点
 */
function checkConditionPort(
  graph: Graph,
  sourcePortName: string,
  targetCell: Cell
) {
  return (
    sourcePortName === BASIC_OR_CONDITION_PORT &&
    (graph.getIncomingEdges(targetCell as Cell) ||
      graph.getOutgoingEdges(targetCell as Cell))
  );
}

/**
 * 检验并行节点连接逻辑
 */
export default function checkOrPort(
  { sourcePort, targetPort, sourceCell, targetCell }: ValidateConnectionArgs,
  graph: Graph
) {
  if (sourcePort && targetPort) {
    const sourcePortName = sourcePort.split("-")[0];
    const targetPortName = targetPort.split("-")[0];

    /**
     * 并行节点 条件链接桩判断
     */
    if (checkConditionPort(graph, sourcePortName, targetCell as Cell)) {
      return false;
    }

    if (targetPortName === BASIC_OR_IN_PORT) {
      console.log(graph.getIncomingEdges(sourceCell as Cell));
    }
  }
  return true;
  // console.log(sourcePort);
  // if (
  //   sourcePort &&
  //   targetPort &&
  //   sourcePort.indexOf("Out") >= 0 &&
  //   targetPort.indexOf("In") >= 0
  // ) {
  //   return true;
  // }
}
