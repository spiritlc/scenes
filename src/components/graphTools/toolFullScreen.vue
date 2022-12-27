<template>
  <el-tooltip class="item" effect="dark" content="适应屏幕" placement="bottom">
    <el-icon @click="centerFn"><FullScreen /></el-icon>
  </el-tooltip>
</template>

<script>
import { Graph } from "@antv/x6";

export default {
  props: {
    graph: Graph,
  },
  methods: {
    centerFn() {
      if (this.graph) {
        const num = 1 - this.graph.zoom();
        num > 1 ? this.graph.zoom(num * -1) : this.graph.zoom(num);
        this.graph.centerContent();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
