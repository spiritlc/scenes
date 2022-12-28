<template>
  <div class="attribute-block">
    <div class="attribute-title">
      <i></i>
      <h4>{{ nodeData.description }}</h4>
      <el-button @click="delNode">删除</el-button>
    </div>
    <component v-if="renderAttr" v-bind="$attrs" :is="renderAttr"></component>
    <!-- :is="attributes[nodeData.attrType as keyof typeof attributes]" -->
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Node } from "@antv/x6";
import { getAttrTemplate } from "@/modules/attribute/index";

const emit = defineEmits(["delNode"]);
const props = defineProps<{
  node: Node | undefined;
}>();
// 获取渲染属性模板
const renderAttr = computed(() => {
  return getAttrTemplate(nodeData.value.attrType);
});

const nodeData = computed(() => {
  return (props.node && props.node.data) || {};
});

const delNode = () => {
  // 删除节点
  emit("delNode");
};
</script>

<style lang="scss" scoped></style>
