// 初始化画布模型
import { onMounted, ref } from "vue";
import LogicFlow, { BaseEdgeModel, BaseNodeModel } from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import {
  Snapshot,
  Menu,
  SelectionSelect,
  InsertNodeInPolyline,
  DndPanel,
} from "@logicflow/extension";
import HBpmn from "@/modules/logicElement/bpmn";
import { useRoute } from "vue-router";
import carData from "@/assets/data";
import HContextPad from "@/modules/logicElement/contextPad";
import setContextPad from "@/modules/logicElement/contextPad/setContextPad";

export default function useInitLogicFlow() {
  const lf = ref<LogicFlow | undefined>(undefined);
  const activeCell = ref<BaseNodeModel | BaseEdgeModel | null>(null);
  const route = useRoute();
  const id = route.query.id as string;

  onMounted(() => {
    lf.value = new LogicFlow({
      container: document.querySelector("#logic-flow") as HTMLElement,
      grid: true,
      background: {
        backgroundColor: "rgb(248, 248, 248)",
      },
      // stopMoveGraph: route.name !== "logicFlowDetail",
      keyboard: {
        enabled: true,
      },
      overlapMode: 1,
      isSilentMode: route.name === "logicFlowDetail",
      plugins: [
        DndPanel,
        HContextPad,
        Snapshot,
        // Control,
        Menu,
        InsertNodeInPolyline,
        SelectionSelect,
        HBpmn,
      ],
      style: {
        rect: {
          radius: 5,
          stroke: "#187DFF",
        },
        circle: {
          r: 18,
          stroke: "#187DFF",
        },
        polygon: {
          stroke: "#187DFF",
        },
        polyline: {
          stroke: "#187DFF",
          hoverStroke: "#187DFF",
          selectedStroke: "#187DFF",
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

    setContextPad(lf.value as LogicFlow);

    lf.value.extension.selectionSelect.setSelectionSense(false, false);
    // lf.value.extension.menu.addMenuConfig({
    //   nodeMenu: [
    //     {
    //       text: "分享",
    //       callback() {
    //         alert("分享成功！");
    //       },
    //     },
    //     {
    //       text: "属性",
    //       callback(node: any) {
    //         alert(`
    //       节点id：${node.id}
    //       节点类型：${node.type}
    //       节点坐标：(x: ${node.x}, y: ${node.y})`);
    //       },
    //     },
    //   ],
    //   edgeMenu: [
    //     {
    //       text: "属性",
    //       callback(edge: any) {
    //         alert(`
    //       边id：${edge.id}
    //       边类型：${edge.type}
    //       边坐标：(x: ${edge.x}, y: ${edge.y})
    //       源节点id：${edge.sourceNodeId}
    //       目标节点id：${edge.targetNodeId}`);
    //       },
    //     },
    //   ],
    //   graphMenu: [
    //     {
    //       text: "分享",
    //       callback() {
    //         alert("分享成功！");
    //       },
    //     },
    //   ],
    // });
    // 添加节点点击事件
    lf.value.on("node:click", function (data) {
      console.log(data);
      activeCell.value = data;
    });
    lf.value.on("blank:click", function (data) {
      console.log(data);
      activeCell.value = null;
    });

    const lfData = JSON.parse(
      localStorage.getItem("logicData") || JSON.stringify(carData)
    );
    if (lfData[id]) {
      lf.value.render(lfData[id]);
      localStorage.setItem("logicData", JSON.stringify(lfData));
    } else {
      lf.value.render();
    }
  });
  return {
    lf,
    activeCell,
  };
}
