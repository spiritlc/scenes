import attrs from "./attrs";
import { v4 } from "uuid";
import {
  BASIC_OR_IN_PORT,
  BASIC_OR_OUT_PORT,
  BASIC_OR_CONDITION_PORT,
} from "@/modules/port/constants";

export default {
  groups: {
    [BASIC_OR_IN_PORT]: {
      position: "left",
      attrs,
    },
    [BASIC_OR_OUT_PORT]: {
      position: "right",
      attrs,
    },
    [BASIC_OR_CONDITION_PORT]: {
      position: "bottom",
      attrs,
    },
  },
  items: [
    { group: BASIC_OR_IN_PORT, id: `${BASIC_OR_IN_PORT}-In-${v4()}` },
    { group: BASIC_OR_OUT_PORT, id: `${BASIC_OR_OUT_PORT}-Out-${v4()}` },
    {
      group: BASIC_OR_CONDITION_PORT,
      id: `${BASIC_OR_CONDITION_PORT}-Out-${v4()}`,
    },
  ],
};
