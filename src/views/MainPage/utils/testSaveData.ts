import { RouteLocationNormalizedLoaded } from "vue-router";
import { ElMessage } from "element-plus";

export default function testSaveData(
  data: object,
  route: RouteLocationNormalizedLoaded
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
    localStorage.setItem("descisionGroup", JSON.stringify(descisionGroupData));
    saveBool = true;
  }

  if (saveBool) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
  }
}
