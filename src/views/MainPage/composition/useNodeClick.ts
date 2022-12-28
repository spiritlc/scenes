/**
 * 画布添加节点点击事件
 */
import { ref } from "vue";
import { Graph, Node } from "@antv/x6";

export function useNodeClick(graph: Graph) {
  const curSelectNode = ref<Node | undefined>();
  const BasicNode = ref<Element | undefined>();
  graph.on("node:click", ({ view, node }) => {
    if (BasicNode.value) {
      BasicNode.value.classList.remove("active");
    }
    BasicNode.value = view.container.querySelector(".basic-node") || undefined;
    if (BasicNode.value) {
      BasicNode.value.classList.add("active");
    }
    // 判断是否有选中过节点
    if (curSelectNode.value) {
      // 判断两次选中节点是否相同
      if (curSelectNode.value !== node) {
        curSelectNode.value = node;
      } else {
        curSelectNode.value = undefined;
      }
    } else {
      curSelectNode.value = node;
    }
  });
  return {
    curSelectNode,
    BasicNode,
  };
}
