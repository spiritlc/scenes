<template>
  <div class="basic-node">
    <img class="basic-node__icon" :src="nodeConfig.icon" alt="" />
    <div class="node-name">{{ nodeConfig.description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onMounted } from "vue";
import { Node } from "@antv/x6";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const getNode: (() => Node) | undefined = inject("getNode");

const node = ref<Node>();
const nodeConfig = ref<any>({ attrData: [] });

onMounted(() => {
  if (getNode) {
    node.value = getNode();
    nodeConfig.value = node.value.data;
  }
});

// export default {
//   data() {
//     return {
//       node: null,
//       nodeConfig: {},
//     };
//   },
//   inject: ["getNode"],
//   mounted() {
//     const node = this.getNode();
//     this.node = node;
//     this.nodeConfig = node.data;
//   },
//   computed: {
//     configArr() {
//       return Object.keys(this.nodeConfig.attrData).map(
//         (key) => this.nodeConfig.attrData[key]
//       );
//     },
//   },
// };
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
