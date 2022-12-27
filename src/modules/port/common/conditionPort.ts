import attrs from "./attrs";
import { v4 } from "uuid";
import { CONDITION_PORT } from "../constants";

export default {
  groups: {
    conditionOut: {
      position: "right",
      attrs,
    },
  },
  items: [{ group: "conditionOut", id: `${CONDITION_PORT}-Out-${v4()}` }],
};
