import { SelfValidateConnectionArgs } from "@/modules/graph/types";

/**
 * 检验节点是否为同一类
 * 相同类型节点不能进行连接
 */
export default function checkSamePort({
  sourcePort,
  targetPort,
}: SelfValidateConnectionArgs) {
  if (sourcePort && targetPort && sourcePort === targetPort) {
    return false;
  }
  return true;
}
