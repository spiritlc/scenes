// 初始化画布模型
import { onMounted, ref } from "vue";
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import { Snapshot, Control, Menu, SelectionSelect } from "@logicflow/extension";
import HBpmn from "@/modules/logicElement/bpmn";

export default function useInitLogicFlow() {
  const lf = ref<LogicFlow | undefined>(undefined);
  onMounted(() => {
    LogicFlow.use(Snapshot);
    LogicFlow.use(Control);
    LogicFlow.use(Menu);
    LogicFlow.use(SelectionSelect);
    LogicFlow.use(HBpmn);
    lf.value = new LogicFlow({
      container: document.querySelector("#logic-flow") as HTMLElement,
      grid: true,
      stopMoveGraph: true,
      keyboard: {
        enabled: true,
      },
      style: {
        rect: {
          radius: 5,
          stroke: "rgb(24, 125, 255)",
        },
        circle: {
          r: 18,
          stroke: "rgb(24, 125, 255)",
        },
        polygon: {
          stroke: "rgb(24, 125, 255)",
        },
        polyline: {
          stroke: "rgb(24, 125, 255)",
          hoverStroke: "rgb(24, 125, 255)",
          selectedStroke: "rgb(24, 125, 255)",
        },
        edgeText: {
          background: {
            fill: "white",
            height: 14,
            stroke: "transparent",
            radius: 3,
          },
        },
      },
    });
    // 添加保存操作
    lf.value.extension.control.addItem({
      iconClass: "custom-save",
      title: "",
      text: "保存",
      onClick: (lf: LogicFlow) => {
        const data = lf.getGraphData();
        // const lfData = JSON.parse(localStorage.getItem("logicData") || "[]");

        console.log(JSON.stringify(data));
      },
    });

    lf.value.extension.menu.addMenuConfig({
      nodeMenu: [
        {
          text: "分享",
          callback() {
            alert("分享成功！");
          },
        },
        {
          text: "属性",
          callback(node: any) {
            alert(`
          节点id：${node.id}
          节点类型：${node.type}
          节点坐标：(x: ${node.x}, y: ${node.y})`);
          },
        },
      ],
      edgeMenu: [
        {
          text: "属性",
          callback(edge: any) {
            alert(`
          边id：${edge.id}
          边类型：${edge.type}
          边坐标：(x: ${edge.x}, y: ${edge.y})
          源节点id：${edge.sourceNodeId}
          目标节点id：${edge.targetNodeId}`);
          },
        },
      ],
      graphMenu: [
        {
          text: "分享",
          callback() {
            alert("分享成功！");
          },
        },
      ],
    });
    lf.value.render();
  });
  return {
    lf,
  };
}
