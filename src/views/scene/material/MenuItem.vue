<template>
  <div class="menu-item">
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
  </div>
</template>

<script lang="ts" setup>
import {
  ComponentDataI,
  ComponentConfig,
} from "@/assets/config/types/component";

import { createNode } from "@/assets/js/material";
import { Dnd } from "@antv/x6-plugin-dnd";
import { inject, ref } from "vue";

const props = defineProps<{
  menuList: Array<ComponentDataI>;
  dnd: Dnd;
}>();

const graph = inject("graph", ref(undefined));
// 拖拽生成节点
const addNode = (e: MouseEvent, item: ComponentConfig) => {
  if (graph.value && props.dnd) {
    createNode({
      graph: graph.value,
      dnd: props.dnd,
      event: e,
      options: {
        shape: item.name, // 节点信息
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
