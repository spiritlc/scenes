<template>
  <div class="basic-node">
    <div class="basic-node__desc">
      <img class="basic-node__icon" :src="nodeConfig.icon" alt="" />
      <div class="node-name">{{ nodeConfig.description }}</div>
    </div>
    <!-- <div class="operation" v-if="attrData.operationSign">
      {{ attrData.operationSign === "greaterThan" ? "高于" : "低于" }}
      {{ attrData.value.desc }}
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onMounted } from "vue";
import { Node } from "@antv/x6";

const getNode: (() => Node) | undefined = inject("getNode");

const node = ref<Node>();
const nodeConfig = ref<any>({ attrData: [] });
const attrData = ref<any>({});

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
  padding: 10px;
  background: #fff;
  border-radius: 4px;
}
.basic-node__desc {
  display: flex;
}
.basic-node__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
