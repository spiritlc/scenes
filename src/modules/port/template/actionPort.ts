import attrs from "./attrs";
import { v4 } from "uuid";

export default {
  groups: {
    actionIn: {
      position: "left",
      attrs,
    },
  },
  items: [{ group: "actionIn", id: `action-In-${v4()}` }],
};
