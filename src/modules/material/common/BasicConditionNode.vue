<template>
  <div class="basic-node">
    <img class="basic-node__icon" :src="nodeConfig.icon" alt="" />
    <div class="node-name">{{ nodeConfig.description }}</div>
    <!-- {{  nodeConfig.attrData }} -->
    <!-- <div>
      <span v-for="(item, index) in configArr" :key="index">{{ item }}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      node: null,
      nodeConfig: {},
    };
  },
  inject: ["getNode"],
  mounted() {
    const node = this.getNode();
    this.node = node;
    console.log(this.node);
    this.nodeConfig = node.data;
  },
  computed: {
    configArr() {
      return Object.keys(this.nodeConfig.attrData).map(
        (key) => this.nodeConfig.attrData[key]
      );
    },
  },
};
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
