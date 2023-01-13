import { SelfValidateConnectionArgs } from "@/modules/graph/types";
import { Graph, Cell } from "@antv/x6";
import {
  BASIC_OR_PORT,
  PORT_OUT_PUT,
  PORT_IN_PUT,
  PORT_CONDITION,
} from "@/modules/port/constants";
// const basicOrPortArr = [
//   BASIC_OR_CONDITION_PORT,
//   BASIC_OR_IN_PORT,
//   BASIC_OR_OUT_PORT,
// ];

/**
 * 并行节点，输入连接桩
 * 1.只能建立一条连线
 */
function checkInPort(graph: Graph, targetPortType: string, targetCell: Cell) {
  if (
    targetPortType === PORT_IN_PUT &&
    graph.getIncomingEdges(targetCell as Cell)
  ) {
    return false;
  }
  return true;
}

/**
 * 并行节点，输出连接桩
 * 1.只能建立一条连线
 */
function checkOutPort(graph: Graph, targetPortType: string, targetCell: Cell) {
  if (
    targetPortType === PORT_OUT_PUT &&
    graph.getIncomingEdges(targetCell as Cell)
  ) {
    return false;
  }
  return true;
}

/**
 * 并行节点 条件链接桩
 * 1.连接非功能组件需要，非功能组件没有连接其他节点
 */
function checkConditionPort(
  graph: Graph,
  sourcePortType: string,
  targetCell: Cell
) {
  if (sourcePortType === PORT_CONDITION) {
    // 条件1
    if (
      graph.getIncomingEdges(targetCell as Cell) ||
      graph.getOutgoingEdges(targetCell as Cell)
    ) {
      return false;
    }
  }
  return true;
}

/**
 * 检验并行节点连接逻辑
 */
export default function checkOrPort(
  {
    targetCell,
    sourcePortName,
    sourcePortType,
    targetPortName,
    targetPortType,
  }: SelfValidateConnectionArgs,
  graph: Graph
) {
  console.log(targetPortName, targetCell);
  // 输入或输出节点为并行节点时进行连线校验
  if (sourcePortName !== BASIC_OR_PORT && targetPortName !== BASIC_OR_PORT) {
    return true;
  }
  // 并行节点，输入连接桩判断
  if (!checkInPort(graph, targetPortType, targetCell as Cell)) {
    return false;
  }
  // 并行节点，输出连接桩判断
  if (!checkOutPort(graph, targetPortType, targetCell as Cell)) {
    return false;
  }
  /**
   * 并行节点 条件链接桩判断
   */
  if (!checkConditionPort(graph, sourcePortType, targetCell as Cell)) {
    return false;
  }

  // if (targetPortName === BASIC_OR_IN_PORT) {
  // console.log(graph.getIncomingEdges(targetCell as Cell));
  // }
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
