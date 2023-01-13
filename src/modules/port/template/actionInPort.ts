import attrs from "./attrs";
import { v4 } from "uuid";
import {
  ACTION_IN_PORT,
  PORT_IN_PUT,
  ACTION_PORT,
} from "@/modules/port/constants";

export default {
  groups: {
    [ACTION_IN_PORT]: {
      position: "left",
      attrs,
    },
  },
  items: [
    { group: ACTION_IN_PORT, id: `${ACTION_PORT}-${PORT_IN_PUT}-${v4()}` },
  ],
};
