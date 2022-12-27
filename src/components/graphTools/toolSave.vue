<template>
  <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
    <el-icon @click="saveFn"><UploadFilled /></el-icon>
  </el-tooltip>
</template>

<script>
import { Graph } from "@antv/x6";

export default {
  props: {
    graph: Graph,
  },
  methods: {
    saveFn() {
      console.log(this.graph.toJSON({ diff: true }));
      localStorage.setItem(
        "x6Json",
        JSON.stringify(this.graph.toJSON({ diff: true }))
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
