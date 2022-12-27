<template>
  <div class="basic-node">
    {{ nodeConfig.name }}
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
}
</style>
