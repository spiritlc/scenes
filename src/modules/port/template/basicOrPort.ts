import attrs from "./attrs";
import { v4 } from "uuid";
import {
  BASIC_OR_PORT,
  BASIC_OR_IN_PORT,
  BASIC_OR_OUT_PORT,
  BASIC_OR_CONDITION_PORT,
  PORT_OUT_PUT,
  PORT_IN_PUT,
  PORT_CONDITION,
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
    { group: BASIC_OR_IN_PORT, id: `${BASIC_OR_PORT}-${PORT_IN_PUT}-${v4()}` },
    {
      group: BASIC_OR_OUT_PORT,
      id: `${BASIC_OR_PORT}-${PORT_OUT_PUT}-${v4()}`,
    },
    {
      group: BASIC_OR_CONDITION_PORT,
      id: `${BASIC_OR_PORT}-${PORT_CONDITION}-${v4()}`,
    },
  ],
};
