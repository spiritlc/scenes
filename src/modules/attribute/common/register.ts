import {
  DESCISION_ATTR,
  DESCISION_GROUP_ATTR,
} from "@/modules/attribute/constants";

import descision from "./attrDescision.vue"; // 决策组中决策点模板
import descisionGroup from "./attrDescisionGroup.vue"; // 流程中决策组模板

export default {
  [DESCISION_ATTR]: descision,
  [DESCISION_GROUP_ATTR]: descisionGroup,
};
