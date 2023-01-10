// 初始化画布模型
import { ref, onMounted } from "vue";
import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
// 公共方法
import { createDnd } from "@/assets/js/material";
import { initKeyboard } from "@/assets/js/graph";
// 画布模板
import { SCENE_GRAPH } from "@/modules/graph/template/constants";
// 画布模型注册方法
import { registerGraph } from "@/modules/graph/index";

export default function useInitGraph() {
  const graph = ref<Graph>();
  const dnd = ref<Dnd>();

  onMounted(() => {
    graph.value = registerGraph({
      templateName: SCENE_GRAPH,
      container: document.getElementById("container") as HTMLElement,
    });
    // 创建dnd实例
    dnd.value = createDnd(graph.value);
    // 在当前画布上初始化键盘快捷键
    initKeyboard(graph.value, ["copy", "paste", "cut", "undo", "redo"]);
  });

  return {
    graph,
    dnd,
  };
}
