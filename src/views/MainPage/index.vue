<template>
  <div class="home">
    <!-- 左侧物料 -->
    <div class="menu-bar">
      <material :dnd="dnd"></material>
    </div>
    <!-- 画布部分 -->
    <div class="canvas-card">
      <header>
        <graph-tools
          :tools="tools"
          :graph="graph"
          @save-data="saveData"
        ></graph-tools>
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
import { onMounted, ref, provide } from "vue";
import type { Node, Cell, Graph } from "@antv/x6";
import { graphToolsT } from "@/assets/config/types/graphTools";
import useInitGraph from "./composition/useInitGraph";
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
import { useRoute } from "vue-router";
import testSaveData from "./utils/testSaveData";
import { BASIC_DESCISION_GROUP } from "@/modules/material/constants";

const route = useRoute();

// 画布实例
// 初始化画布
const graphInstance = useInitGraph();
const graph = graphInstance.graph;
const dnd = graphInstance.dnd;
provide("graph", graph); // 向子组件注入画布实例

// 当前选中节点
let curSelectNode = ref<Node | undefined>();
let BasicNode = ref<Element | undefined>();
// 通过子组件删除当前选中节点
const delNode = () => {
  graph.value && graph.value.removeNode(curSelectNode.value as Node);
  curSelectNode.value = undefined;
};
// 子组件数据同步给父组件
const syncData = (data: any) => {
  if (curSelectNode.value) {
    // 决策组
    if (curSelectNode.value.shape === BASIC_DESCISION_GROUP) {
      curSelectNode.value.attr("text/text", data.descision);
    } else {
      const curSelectNodeData = curSelectNode.value.getData();
      curSelectNode.value.setData({
        ...curSelectNodeData,
        attrData: data,
      });
    }
  }
};
// 保存数据
const saveData = (data: { cells: Cell.Properties[] }) => {
  console.log("保存的数据是", data);
  testSaveData(data, route, graph.value as Graph);
};

// 工具栏配置项
const tools: Array<graphToolsT> = [
  TOOL_ZOOM,
  TOOL_FULLSCREEN,
  TOOL_SAVE,
  TOOL_DISABLED,
];

// 控制连接桩显示/隐藏
const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
};
onMounted(() => {
  if (graph.value && dnd.value) {
    // 添加node点击事件
    graph.value.on("node:click", ({ view, node }) => {
      if (BasicNode.value) {
        BasicNode.value.classList.remove("active");
      }
      BasicNode.value =
        view.container.querySelector(".basic-node") || undefined;
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
    // 添加画布空白点击事件
    graph.value.on("blank:click", () => {
      curSelectNode.value = undefined;
      if (BasicNode.value) {
        BasicNode.value.classList.remove("active");
      }
    });
    // 鼠标移上显示连接桩
    graph.value.on("node:mouseenter", () => {
      const container = document.getElementById("container") as Element;
      const ports = container.querySelectorAll(
        ".x6-port-body"
      ) as NodeListOf<SVGElement>;
      showPorts(ports, true);
    });
    graph.value.on("node:mouseleave", () => {
      const container = document.getElementById("container") as Element;
      const ports = container.querySelectorAll(
        ".x6-port-body"
      ) as NodeListOf<SVGElement>;
      showPorts(ports, false);
    });

    // 添加连接线点击事件
  }
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
  overflow-y: scroll;
  margin-left: 20px;
}

header {
  display: flex;
  justify-content: flex-end;
}

.item {
  margin-left: 20px;
}

.footer {
  display: flex;
  justify-content: right;
}
</style>
