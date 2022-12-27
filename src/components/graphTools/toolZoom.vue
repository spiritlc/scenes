<template>
  <span>
    <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
      <el-icon @click="zoomFn(0.2)"><ZoomIn /></el-icon>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
      <el-icon @click="zoomFn(-0.2)"><ZoomOut /></el-icon>
    </el-tooltip>
  </span>
</template>

<script>
import { Graph } from "@antv/x6";

export default {
  props: {
    graph: Graph,
  },
  methods: {
    zoomFn(num) {
      this.graph && this.graph.zoom(num);
    },
  },
};
</script>

<style lang="scss" scoped></style>
