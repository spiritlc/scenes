import { ValidateConnectionArgs } from "@/modules/graph/types";

/**
 * 检验节点是否为同一类
 * 相同类型节点不能进行连接
 */
export default function checkSamePort({
  sourcePort,
  targetPort,
}: ValidateConnectionArgs) {
  console.log(sourcePort);
  if (
    sourcePort &&
    targetPort &&
    sourcePort.split("-")[0] === targetPort.split("-")[0]
  ) {
    return false;
  }
  return true;
}
