<template>
  <div class="attribute-block">
    <div class="attribute-title">
      <img :src="nodeData.icon" alt="" />
      <h4>{{ nodeData.description }}</h4>
    </div>
    <!-- <el-button @click="delNode">删除</el-button> -->
    <component v-if="renderAttr" v-bind="$attrs" :is="renderAttr"></component>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Node } from "@antv/x6";
import { getAttrTemplate } from "@/modules/attribute/index";

// const emit = defineEmits(["delNode"]);
const props = defineProps<{
  node: Node | undefined;
}>();
// 获取渲染属性模板
const renderAttr = computed(() => {
  if (nodeData.value.attr) {
    return getAttrTemplate(nodeData.value.attr);
  }
  return null;
});

const nodeData = computed(() => {
  return (props.node && props.node.data) || {};
});

//   // 删除节点
// const delNode = () => {
//   emit("delNode");
// };
</script>

<style lang="scss" scoped>
.attribute-title {
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
}
</style>
