import attrs from "./attrs";
import { v4 } from "uuid";

export default {
  groups: {
    relationIn: {
      position: "left",
      attrs,
    },
    relationOut: {
      position: "right",
      attrs,
    },
  },
  items: [
    { group: "relationIn", id: `relation-In-${v4()}` },
    { group: "relationOut", id: `relation-Out-${v4()}` },
  ],
};
