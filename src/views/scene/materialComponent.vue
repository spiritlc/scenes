<template>
  <div class="material-content">
    <el-collapse v-model="activeNames" @change="changeCollapse">
      <el-collapse-item
        v-for="item in renderList"
        :title="item.className"
        :name="item.classCode"
        :key="item.classCode"
      >
        <div
          class="menu-item"
          v-for="temp in item.children"
          :key="temp.id"
          @mousedown="addNode($event, temp)"
        >
          <img :src="temp.icon" />
          <div>{{ temp.description }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
// 依赖
import { ref } from "vue";
import registerComponent from "@/modules";
import { ComponentConfig } from "@/assets/config/types/component";
// 配置项
import { gatewayData, taskData } from "@/components/config";
import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { createNode } from "@/assets/js/material";

const props = defineProps<{
  graph: Graph | undefined;
  dnd: Dnd | undefined;
}>();

// 配置项
const renderList = [gatewayData, taskData];
const compositionList: Array<ComponentConfig> = [];
renderList.forEach((item) => {
  compositionList.push(...item.children);
});
registerComponent(compositionList);

// 拖拽生成节点
const addNode = (e: MouseEvent, item: ComponentConfig) => {
  if (props.graph && props.dnd) {
    createNode({
      graph: props.graph,
      dnd: props.dnd,
      event: e,
      options: {
        shape: item.name, // 节点信息
      },
      data: { ...item },
    });
  }
};

const activeNames = ref(["gateway", "task"]);
const changeCollapse = function () {
  console.log("world");
};
</script>
<style lang="scss" scoped>
.material-content {
  width: 100%;
  height: 100%;
  // box-shadow: 2px 0 20px 0 rgba($color: #000000, $alpha: 0.1);
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.7);
    background: #666;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
    border-radius: 10px;
    background: #bbb;
  }
  ::v-deep(.el-collapse) {
    padding: 0 20px;
  }
  ::v-deep(.el-collapse-item__header) {
    font-size: 14px;
  }
  ::v-deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
.menu-item {
  display: flex;
  height: 30px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 4px;
  img {
    width: 16px;
    height: 16px;
    border-radius: 16px;
  }
  .icon-ele {
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 32px;
    background: #e1e1e1;
    font-size: 12px;
    color: $default-color;
    transform: scale(0.5);
  }
  & > div {
    flex: 1;
    padding-left: 6px;
    font-size: 12px;
  }
  &:hover {
    background: #f1f1f1;
  }
}
</style>
