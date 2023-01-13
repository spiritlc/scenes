import { RouteLocationNormalizedLoaded } from "vue-router";
import { Graph } from "@antv/x6";
import { getPortConfig } from "@/modules/port/index";
import { CONDITION_OUT_PORT } from "@/modules/port/constants";

// demo数据测试方法
export function testData(graph: Graph, route: RouteLocationNormalizedLoaded) {
  // 详情页面数据回显
  const id = route.query.id;
  const routeName = route.name;
  // 编辑决策点
  if (routeName === "createDescisionNode") {
    const descisionNodeData = JSON.parse(
      localStorage.getItem("descisionNode") || "{}"
    )[id as string];
    if (descisionNodeData) {
      graph.fromJSON(descisionNodeData);
    }
  }
  // 编辑决策组
  if (routeName === "createDescisionGroup") {
    const descisionGroupData = JSON.parse(
      localStorage.getItem("descisionGroup") || "{}"
    )[id as string];
    console.log(descisionGroupData);

    if (descisionGroupData) {
      graph.fromJSON(descisionGroupData);
    }
  }

  if (routeName === "rulesDetail" && id) {
    const json: any = JSON.parse(localStorage.getItem("graphData") || "{}");
    graph.fromJSON(json[id as string]);
  }

  // 创建页面数据初始化
  if (routeName === "createFlow") {
    // 创建/编辑场景页面
    const json: any = JSON.parse(localStorage.getItem("sceneData") || "{}");
    if (!json[id as string]) {
      // 当前没有节点，需要添加起始节点
      graph.addNode({
        shape: "rect", // 节点信息
        x: 100,
        y: 40,
        width: 100,
        height: 40,
        attrs: {
          text: { text: "回家" },
        },
        ports: getPortConfig({ portTemplates: [CONDITION_OUT_PORT] }),
      });
    } else {
      // 数据回显
    }
  }
}
