import { RouteLocationNormalizedLoaded } from "vue-router";
import { ElMessage } from "element-plus";
// import adapterData from "../../../assets/js/adapter";
import { Cell } from "@antv/x6";

export default function testSaveData(
  data: { cells: Cell.Properties[] },
  route: RouteLocationNormalizedLoaded
  // graph: Graph
) {
  const routeName = route.name;
  const id = route.query.id;
  let saveBool = false;
  // 当前是创建决策节点
  if (routeName === "createDescisionNode") {
    const descisionNodeData = JSON.parse(
      localStorage.getItem("descisionNode") || "{}"
    );
    descisionNodeData[id as string] = data;
    localStorage.setItem("descisionNode", JSON.stringify(descisionNodeData));
    saveBool = true;
  }

  // 当前是创建决策组
  if (routeName === "createDescisionGroup") {
    const descisionGroupData = JSON.parse(
      localStorage.getItem("descisionGroup") || "{}"
    );
    descisionGroupData[id as string] = data;
    console.log("当前决策组内容是", data);
    // const resultData = adapterData(graph, data);
    localStorage.setItem("descisionGroup", JSON.stringify(descisionGroupData));
    saveBool = true;
  }

  // 当前是创建决策组
  if (routeName === "createFlow") {
    const flowData = JSON.parse(localStorage.getItem("flow") || "{}");
    flowData[id as string] = data;
    localStorage.setItem("flow", JSON.stringify(flowData));
    saveBool = true;
  }

  if (saveBool) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
  }
}
