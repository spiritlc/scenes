import { SelfValidateConnectionArgs } from "@/modules/graph/types";
import { OUT_PUT_ARR, IN_PUT_ARR } from "@/modules/port/constants";

/**
 * 检验节点的out,in,节点连线必须为 out -> in
 */
export default function checkPortType({
  sourcePortType,
  targetPortType,
}: SelfValidateConnectionArgs) {
  if (
    OUT_PUT_ARR.indexOf(sourcePortType) >= 0 &&
    IN_PUT_ARR.indexOf(targetPortType) >= 0
  ) {
    return true;
  }
}
