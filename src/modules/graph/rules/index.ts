import { ValidateConnectionArgs } from "@/modules/graph/types";
import graphRulesMap from "./graphRulesMap";
import { Graph } from "@antv/x6";

/**
 * 创建画布连接规则
 * @params
 */
export default function createGraphRules(
  rulesArr: Array<keyof typeof graphRulesMap>,
  params: ValidateConnectionArgs,
  graph: Graph
) {
  return function () {
    const rulesLength = rulesArr.length;
    let validateRes = true;
    // 有起始连接桩，进行逻辑判断
    if (params.sourcePort && params.targetPort) {
      const [sourcePortName, sourcePortType] = params.sourcePort.split("-");
      const [targetPortName, targetPortType] = params.targetPort.split("-");
      console.log(params.targetPort);
      // 遍历调用规则判断，返回结果false，则取消连线操作
      for (let i = 0; i < rulesLength; i++) {
        if (
          !graphRulesMap[rulesArr[i]](
            {
              ...params,
              sourcePortName,
              sourcePortType,
              targetPortName,
              targetPortType,
            },
            graph
          )
        ) {
          validateRes = false;
          break;
        }
      }
      return validateRes;
    }
    return false;
  };
}
