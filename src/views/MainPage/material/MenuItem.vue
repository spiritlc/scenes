<template>
  <div class="menu-item">
    <class-fold
      v-for="(item, index) in menuList"
      :key="item.classCode + index"
      :name="item.className"
      :fold="true"
    >
      <div class="element-list">
        <div
          v-for="eleitem in item.children"
          :key="eleitem.id"
          class="element-item"
          draggable="true"
          @mousedown="addNode($event, eleitem)"
        >
          <img :src="eleitem.icon" />
          <div>{{ eleitem.description }}</div>
        </div>
      </div>
    </class-fold>
  </div>
</template>

<script lang="ts" setup>
import ClassFold from "@/components/class-fold.vue";
import { MenuDataI, MenuConfig } from "@/assets/config/types/menu";

import { createNode } from "@/assets/js/material";
import { getPortConfig } from "@/modules/port";
import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";

const props = defineProps<{
  menuList: Array<MenuDataI>;
  graph: Graph;
  dnd: Dnd;
}>();
// 拖拽生成节点
const addNode = (e: MouseEvent, item: MenuConfig) => {
  if (props.graph && props.dnd) {
    createNode({
      graph: props.graph,
      dnd: props.dnd,
      event: e,
      options: {
        shape: item.shapeType, // 节点信息
        ports: getPortConfig(item.shapeType), // 链接桩信息
      },
      data: { ...item },
    });
  }
};
</script>

<style lang="scss" scoped>
.element-list {
  padding: 0 10px;
  .element-item {
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
}
</style>
