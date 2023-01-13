import { Graph, Path } from "@antv/x6";
import { BASIC_EDGE } from "@/modules/edge/constants";

// const registerBasicEdge = function () {
//   Graph.registerConnector(
//     BASIC_EDGE,
//     (s, e) => {
//       const offset = 4;
//       const deltaY = Math.abs(e.y - s.y);
//       const control = Math.floor((deltaY / 3) * 2);

//       const v1 = { x: s.x, y: s.y + offset + control };
//       const v2 = { x: e.x, y: e.y - offset - control };

//       return Path.normalize(
//         `M ${s.x} ${s.y}
//           L ${s.x} ${s.y + offset}
//           C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
//           L ${e.x} ${e.y}
//         `
//       );
//     },
//     true
//   );
// };

const registerBasicEdge = function () {
  // 注册连线
  Graph.registerConnector(
    BASIC_EDGE,
    (sourcePoint, targetPoint) => {
      const hgap = Math.abs(targetPoint.x - sourcePoint.x);
      const path = new Path();
      path.appendSegment(
        Path.createSegment("M", sourcePoint.x - 4, sourcePoint.y)
      );
      path.appendSegment(
        Path.createSegment("L", sourcePoint.x + 12, sourcePoint.y)
      );
      // 水平三阶贝塞尔曲线
      path.appendSegment(
        Path.createSegment(
          "C",
          sourcePoint.x < targetPoint.x
            ? sourcePoint.x + hgap / 2
            : sourcePoint.x - hgap / 2,
          sourcePoint.y,
          sourcePoint.x < targetPoint.x
            ? targetPoint.x - hgap / 2
            : targetPoint.x + hgap / 2,
          targetPoint.y,
          targetPoint.x - 6,
          targetPoint.y
        )
      );
      path.appendSegment(
        Path.createSegment("L", targetPoint.x + 2, targetPoint.y)
      );

      return path.serialize();
    },
    true
  );
};

export default registerBasicEdge;
