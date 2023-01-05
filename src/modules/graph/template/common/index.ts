import { Shape } from "@antv/x6";
import { BASIC_EDGE } from "@/modules/edge/constants";
const basicGraphConfig = {
  // connecting,
  // container: dom,
  autoResize: true,
  grid: {
    type: "mesh",
    size: 20, // 网格大小 10px
    visible: true, // 渲染网格背景
    args: {
      color: "#eeeeee", // 网格线/点颜色
      thickness: 2, // 网格线宽度/网格点大小
    },
  },
  background: false, // 背景（透明）
  panning: {
    enabled: true,
    eventTypes: ["leftMouseDown", "mouseWheel"],
  },
  mousewheel: {
    enabled: true,
    modifiers: "ctrl",
    factor: 1.1,
    maxScale: 1.5,
    minScale: 0.5,
  },
  highlighting: {
    magnetAdsorbed: {
      name: "stroke",
      args: {
        attrs: {
          fill: "#fff",
          stroke: "#31d0c6",
          strokeWidth: 4,
        },
      },
    },
  },
  connecting: {
    snap: true, // 自动吸附
    allowBlank: false, // 是否允许连接到画布空白位置的点
    allowMulti: true, // 是否允许在相同的起始节点和终止之间创建多条边
    allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
    allowNode: false, // 是否允许链接节点
    allowEdge: true,
    allowPort: true,
    highlight: true, // 拖动边时，是否高亮显示所有可用的节点
    connector: BASIC_EDGE, // 链接线样式
    connectionPoint: "anchor",
    edgeAnchor: "ratio",
    anchor: "center",
    router: "normal",
    validateMagnet() {
      // return magnet.getAttribute('port-group') !== 'top'
      // 限制连线配置
      return true;
    },
    createEdge() {
      return new Shape.Edge({
        attrs: {
          line: {
            stroke: "#000",
            strokeWidth: 2,
            targetMarker: {
              name: "block",
              width: 12,
              height: 8,
            },
          },
        },
        zIndex: 1,
      });
    },
  },
};
export default basicGraphConfig;
