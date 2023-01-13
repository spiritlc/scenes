<template>
  <div class="basic-node">
    <img class="basic-node__icon" :src="nodeConfig.icon" alt="" />
    <div class="node-name">
      {{ attrData.descision || nodeConfig.description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onMounted } from "vue";
import { Node } from "@antv/x6";

const getNode: (() => Node) | undefined = inject("getNode");

const node = ref<Node>();
const nodeConfig = ref<any>({ attrData: [] });
const attrData = ref<any>({});

// computed()
// const nodeConfig = computed(() => {
//   return (node.value && node.value.data) || {};
// });

onMounted(() => {
  if (getNode) {
    node.value = getNode();
    nodeConfig.value = node.value.data;
    attrData.value = nodeConfig.value.attrData || {};
    console.log(nodeConfig.value);
    node.value.on("change:data", ({ current }) => {
      nodeConfig.value = current;
      attrData.value = nodeConfig.value.attrData || {};
    });
  }
});
</script>

<style lang="scss" scoped>
.basic-node {
  border: 1px solid #ccc;
  display: flex;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
}
.basic-node__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
