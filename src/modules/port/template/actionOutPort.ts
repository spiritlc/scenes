import attrs from "./attrs";
import { v4 } from "uuid";
import {
  ACTION_OUT_PORT,
  PORT_IN_PUT,
  ACTION_PORT,
} from "@/modules/port/constants";

export default {
  groups: {
    [ACTION_OUT_PORT]: {
      position: "right",
      attrs,
    },
  },
  items: [
    { group: ACTION_OUT_PORT, id: `${ACTION_PORT}-${PORT_IN_PUT}-${v4()}` },
  ],
};
