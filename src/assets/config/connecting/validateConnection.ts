import { ValidateConnectionArgs } from "./types";
import { Graph } from "@antv/x6";
/**
 * 在移动边的时候判断连接是否有效，如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素。
 */
export default function validateConnection(
  this: Graph,
  { sourcePort, targetPort }: ValidateConnectionArgs
) {
  if (sourcePort && targetPort) {
    if (!checkPortType(sourcePort, targetPort)) {
      return false;
    }
  }
  return true;
}

/**
 * 检验节点的out,in,节点连线必须为 out -> in
 */
function checkPortType(sourcePort: string, targetPort: string) {
  if (sourcePort.indexOf("Out") >= 0 && targetPort.indexOf("In") >= 0) {
    return true;
  }
}
