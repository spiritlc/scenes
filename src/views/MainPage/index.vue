<template>
  <div class="home">
    <!-- 左侧物料 -->
    <div class="menu-bar">
      <material :graph="graph" :dnd="dnd"></material>
    </div>
    <!-- 画布部分 -->
    <div class="canvas-card">
      <header>
        <graph-tools :tools="tools" :graph="graph"></graph-tools>
      </header>
      <div id="container"></div>
    </div>
    <!-- 右侧属性栏 -->
    <div class="attrs-bar" v-show="curSelectNode">
      <attribute-block
        v-show="curSelectNode"
        :key="curSelectNode && curSelectNode.id"
        :node="curSelectNode"
        @sync-data="syncData"
        @delNode="delNode"
      >
      </attribute-block>
      <!-- :sing-data="curSelectNode?.data.attrData || {}" -->
      <!-- <footer class="footer">
        <el-button type="primary" size="small" @click="submit">确定</el-button>
      </footer> -->
    </div>
    <!-- <DialogCondition ref="dialogCondition"></DialogCondition>
    <DialogMysql ref="dialogMysql"></DialogMysql> -->
  </div>
</template>
<script setup lang="ts">
// 依赖
import { onMounted, ref } from "vue";
import type { Graph, Node } from "@antv/x6";
import type { Dnd } from "@antv/x6-plugin-dnd";
import { graphToolsT } from "@/assets/config/types/graphTools";
// 公共方法
import { initGraph, initKeyboard } from "@/assets/js/graph";
import { createDnd } from "@/assets/js/material";
// 自定义物料渲染
import Material from "./material/index.vue";
// 工具栏
import GraphTools from "@/components/graphTools/index.vue";
import {
  TOOL_ZOOM,
  TOOL_FULLSCREEN,
  TOOL_SAVE,
  TOOL_DISABLED,
} from "@/assets/config/constants";
// 属性栏
import attributeBlock from "./attribute/index.vue";
// 线
import { registerEdge } from "@/modules/edge";
import { BASIC_EDGE } from "@/modules/edge/constants";

// 画布实例
const graph = ref<Graph>();
const dnd = ref<Dnd>();

// 当前选中节点
const curSelectNode = ref<Node>();
const BasicNode = ref<Element>();
// 通过子组件删除当前选中节点
const delNode = () => {
  graph.value && graph.value.removeNode(curSelectNode.value as Node);
  curSelectNode.value = undefined;
};
// 子组件数据同步给父组件
const syncData = (data: object) => {
  if (curSelectNode.value) {
    curSelectNode.value.data.attrData = data;
  }
};

// 工具栏配置项
const tools: Array<graphToolsT> = [
  TOOL_ZOOM,
  TOOL_FULLSCREEN,
  TOOL_SAVE,
  TOOL_DISABLED,
];

onMounted(() => {
  // 注册线
  registerEdge([BASIC_EDGE]);
  // 初始化画布
  graph.value = initGraph(document.getElementById("container") as HTMLElement);
  // const x6Json = localStorage.getItem("x6Json");
  // if (x6Json) {
  //   graph.value.fromJSON(JSON.parse(x6Json));
  // }
  // 创建dnd实例
  dnd.value = createDnd(graph.value);
  // 在当前画布上初始化键盘快捷键
  initKeyboard(graph.value, ["copy", "paste", "cut", "undo", "redo"]);
  // 添加node点击事件
  graph.value.on("node:click", ({ view, node }) => {
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
});
</script>
<style lang="scss" scoped>
#container {
  height: calc(100% - 20px) !important;
  width: calc(100% - 10px) !important;
}
.home {
  width: 100%;
  height: 97vh;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  background: #eaeaea;
}

.home > div {
  background: #ffffff;
  border-radius: 5px;
}

.menu-bar {
  width: 260px;
  height: 100%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}

h2 {
  width: 100%;
  font-size: 20px;
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
}

.menu-list {
  height: 0;
  flex: 1;
  overflow: auto;
  padding: 0 10px;
  box-sizing: border-box;
}

.menu-list > div {
  border: 2px dashed #eaeaea;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.canvas-card {
  width: 0;
  flex: 1;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.canvas-card > div {
  width: 100%;
  height: 100%;
  border: 2px dashed #eaeaea;
}

.attrs-bar {
  padding: 0 20px;
  width: 400px;
  margin-left: 20px;
}

header {
  display: flex;
  justify-content: end;
}

.item {
  margin-left: 20px;
}

.footer {
  display: flex;
  justify-content: right;
}
</style>
