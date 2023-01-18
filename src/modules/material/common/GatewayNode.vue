<!--
* @Description: 网关节点模板
* @Author: guocong
* @Date: 2023-01-18 10:13:25
* @LastEditTime: 2023-01-18 10:13:25
* @LastEditors: guocong
-->
<template>
  <div class="container">
    <div class="block"></div>
    <div class="content">
      <el-icon v-if="sign === 'Exclusive'"><Close /></el-icon>
      <el-icon v-if="sign === 'Parallel'"><Plus /></el-icon>
      <!-- <el-icon v-if="sign === 'Exclusive'"><Close /></el-icon> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import { Node } from "@antv/x6";

const getNode: (() => Node) | undefined = inject("getNode");
const node = ref<Node>();

const sign = ref<string>();

onMounted(() => {
  if (getNode) {
    node.value = getNode();
    sign.value = node.value.data.id;
  }
});
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
}
.block {
  border: 2px solid #ccc;
  position: absolute;
  left: -2px;
  top: -2px;
  transform: rotate(45deg) scale(0.66);
  background-color: #fff;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38px;
  position: relative;
  z-index: 1;
}
</style>
