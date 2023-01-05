import { ValidateConnectionArgs } from "@/modules/graph/types";

/**
 * 检验节点的out,in,节点连线必须为 out -> in
 */
export default function checkPortType({
  sourcePort,
  targetPort,
}: ValidateConnectionArgs) {
  if (
    sourcePort &&
    targetPort &&
    sourcePort.indexOf("Out") >= 0 &&
    targetPort.indexOf("In") >= 0
  ) {
    return true;
  }
}
