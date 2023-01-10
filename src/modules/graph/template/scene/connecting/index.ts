/**
 * 链接桩链接规则
 */
import { Shape } from "@antv/x6";
import validateConnection from "./validateConnection";
// import { BASIC_EDGE } from "@/modules/edge/constants";

export default {
  validateConnection,
  // snap: true, // 自动吸附
  snap: {
    radius: 20,
  },
  allowBlank: false, // 是否允许连接到画布空白位置的点
  allowMulti: true, // 是否允许在相同的起始节点和终止之间创建多条边
  allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
  allowNode: false, // 是否允许链接节点
  allowEdge: true,
  allowPort: true,
  highlight: true, // 拖动边时，是否高亮显示所有可用的节点
  // connector: BASIC_EDGE, // 链接线样式
  connector: {
    name: "rounded",
    args: {
      radius: 8,
    },
  },
  connectionPoint: "anchor",
  // edgeAnchor: "ratio",
  anchor: "center",
  // router: "normal",
  router: {
    name: "manhattan",
    args: {
      padding: 1,
    },
  },
  validateMagnet() {
    // return magnet.getAttribute('port-group') !== 'top'
    // 限制连线配置
    return true;
  },
  createEdge() {
    return new Shape.Edge({
      attrs: {
        line: {
          stroke: "#A2B1C3",
          strokeWidth: 2,
          targetMarker: {
            name: "block",
            width: 12,
            height: 8,
          },
        },
      },
      zIndex: 0,
    });
  },
};
