<template>
  <div class="basic-node">
    <img class="basic-node__icon" :src="nodeConfig.icon" alt="">
    <div class="node-name">{{ nodeConfig.description }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nodeConfig: {}
      }
    },
    inject: ["getNode"],
    mounted () {
      const node = this.getNode();
      this.nodeConfig = node.data
    },
  }
</script>

<style lang="scss" scoped>
.basic-node {
  border: 1px solid #ccc;
  display: flex;
  padding: 10px;
  background: #FFF;
}
.basic-node__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>