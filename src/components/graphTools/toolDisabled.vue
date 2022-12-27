<template>
  <el-tooltip class="item" effect="dark" content="是否禁用" placement="bottom">
    <el-icon v-if="isLock" @click="lockFn"><Lock /></el-icon>
    <el-icon v-else @click="lockFn"><Unlock /></el-icon>
  </el-tooltip>
</template>

<script>
import { Graph } from "@antv/x6";

export default {
  props: {
    graph: Graph,
  },
  data() {
    return {
      isLock: false,
    };
  },
  methods: {
    lockFn: function () {
      this.isLock = !this.isLock;
      if (this.isLock && this.graph) {
        this.graph.enablePanning();
        this.graph.enableKeyboard();
      } else if (this.graph) {
        this.graph.disablePanning();
        this.graph.disableKeyboard();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
