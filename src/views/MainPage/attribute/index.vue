<template>
  <div class="attribute-block">
    <div class="attribute-title">
      <i></i>
      <h4>{{ nodeData.description }}</h4>
      <el-button @click="delNode">删除</el-button>
    </div>
    <component
      v-bind="$attrs"
      :is="attributes[nodeData.attrType as keyof typeof attributes]"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { getAttrMap } from "@/modules/attribute";
import { computed } from "vue";
import { Node } from "@antv/x6";
// 属性模板名称
import {
  EQUIPMENT_ATTR,
  TIME_ATTR,
  WEATHER_ATTR,
  FENCE_ATTR,
} from "@/modules/attribute/constants";

const emit = defineEmits(["delNode"]);
const props = defineProps({
  node: Node,
});
// 获取需要的属性列表
const attributes = getAttrMap([
  EQUIPMENT_ATTR,
  TIME_ATTR,
  WEATHER_ATTR,
  FENCE_ATTR,
]);
console.log(attributes);

const nodeData = computed(() => {
  return (props.node && props.node.data) || {};
});

const delNode = () => {
  // 删除节点
  emit("delNode");
};
</script>

<style lang="scss" scoped></style>
