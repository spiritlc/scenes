import {
  BASIC_CONDITION_NODE,
  BASIC_ACTION_NODE,
  BASIC_RELATION_NODE,
} from "@/modules/material/constants";

import conditionPort from "./conditionPort";
import actionPort from "./actionPort";
import relationPort from "./relationPort";

export default {
  [BASIC_CONDITION_NODE]: conditionPort,
  [BASIC_ACTION_NODE]: actionPort,
  [BASIC_RELATION_NODE]: relationPort,
};
