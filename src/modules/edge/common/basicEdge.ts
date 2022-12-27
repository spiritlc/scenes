import { Graph, Path } from "@antv/x6";
import { BASIC_EDGE } from "@/modules/edge/constants";

const registerBasicEdge = function () {
  Graph.registerConnector(
    BASIC_EDGE,
    (s, e) => {
      const offset = 4;
      const deltaY = Math.abs(e.y - s.y);
      const control = Math.floor((deltaY / 3) * 2);

      const v1 = { x: s.x, y: s.y + offset + control };
      const v2 = { x: e.x, y: e.y - offset - control };

      return Path.normalize(
        `M ${s.x} ${s.y}
     L ${s.x} ${s.y + offset}
     C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
     L ${e.x} ${e.y}
    `
      );
    },
    true
  );
};
export default registerBasicEdge;
