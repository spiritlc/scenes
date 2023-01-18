<!--
* @Description: 任务节点模板
* @Author: guocong
* @Date: 2023-01-18 14:34:01
* @LastEditTime: 2023-01-18 14:34:01
* @LastEditors: Please set LastEditors
-->
<template>
  <div class="container">
    <div class="block">
      <el-icon>
        <component :is="icon"></component>
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import { Node } from "@antv/x6";

const getNode: (() => Node) | undefined = inject("getNode");
const node = ref<Node>();

const icon = ref<string>();
const iconMap: any = {
  User: "UserFilled",
};

onMounted(() => {
  if (getNode) {
    node.value = getNode();
    icon.value = iconMap[node.value.data.id];
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  .el-icon {
    margin: 5px;
  }
}
</style>
