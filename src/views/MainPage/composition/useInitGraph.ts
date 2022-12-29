// /**
//  * 初始化画布
//  */
import { ref } from "vue";
import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
// 公共方法
import { createDnd } from "@/assets/js/material";
import { initGraph, initKeyboard } from "@/assets/js/graph";

export default function useInitGraph(graphConfig: object) {
  const graph = ref<Graph>();
  const dnd = ref<Dnd>();

  graph.value = initGraph(graphConfig);
  // 创建dnd实例
  dnd.value = createDnd(graph.value);
  // 在当前画布上初始化键盘快捷键
  initKeyboard(graph.value, ["copy", "paste", "cut", "undo", "redo"]);
  return {
    graph,
    dnd,
  };
}
