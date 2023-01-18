<template>
  <div class="basic-node">
    <div class="basic-node__group">
      <img class="basic-node__icon" :src="nodeConfig.icon" alt="" />
      <div class="node-name">
        {{ attrData.descision || nodeConfig.description }}
      </div>
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
  display: flex;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;

  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
.basic-node__group {
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.basic-node__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
