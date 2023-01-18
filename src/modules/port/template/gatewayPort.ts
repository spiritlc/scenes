import attrs from "./attrs";
import { v4 } from "uuid";
import {
  CONDITION_IN_PORT,
  PORT_IN_PUT,
  CONDITION_PORT,
} from "@/modules/port/constants";

export default {
  groups: {
    [CONDITION_IN_PORT]: {
      position: "left",
      attrs,
    },
  },
  items: [
    {
      group: CONDITION_IN_PORT,
      id: `${CONDITION_PORT}-${PORT_IN_PUT}-${v4()}`,
    },
  ],
};
