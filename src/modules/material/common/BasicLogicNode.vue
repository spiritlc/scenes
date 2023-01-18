<template>
  <div class="basic-node">
    <div class="node-name">{{ nodeConfig.description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onMounted } from "vue";
import { Node } from "@antv/x6";

const getNode: (() => Node) | undefined = inject("getNode");
const node = ref<Node>();
const nodeConfig = ref<any>({ attrData: [] });
onMounted(() => {
  if (getNode) {
    node.value = getNode();
    nodeConfig.value = node.value.data;
    node.value.on("change:data", ({ current }) => {
      nodeConfig.value = current;
    });
  }
});
</script>

<style lang="scss" scoped>
.basic-node {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
}
</style>
