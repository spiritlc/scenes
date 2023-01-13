import attrs from "./attrs";
import { v4 } from "uuid";
import {
  CONDITION_OUT_PORT,
  PORT_OUT_PUT,
  CONDITION_PORT,
} from "@/modules/port/constants";

export default {
  groups: {
    [CONDITION_OUT_PORT]: {
      position: "right",
      attrs,
    },
  },
  items: [
    {
      group: CONDITION_OUT_PORT,
      id: `${CONDITION_PORT}-${PORT_OUT_PUT}-${v4()}`,
    },
  ],
};
