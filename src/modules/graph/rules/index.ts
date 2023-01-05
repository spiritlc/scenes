import { ValidateConnectionArgs } from "@/modules/graph/types";
import graphRulesMap from "./graphRulesMap";

/**
 * 创建画布连接规则
 * @params
 */
export default function createGraphRules(
  rulesArr: Array<keyof typeof graphRulesMap>,
  params: ValidateConnectionArgs
) {
  return function () {
    const rulesLength = rulesArr.length;
    let validateRes = true;
    for (let i = 0; i < rulesLength; i++) {
      if (!graphRulesMap[rulesArr[i]](params)) {
        validateRes = false;
        break;
      }
    }
    return validateRes;
  };
}
