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
};
export default basicGraphConfig;
