<template>
  <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
    <el-icon @click="saveFn"><UploadFilled /></el-icon>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { Graph } from "@antv/x6";
const props = defineProps<{
  graph?: Graph;
}>();
const emit = defineEmits(["saveData"]);

const saveFn = () => {
  if (props.graph) {
    emit("saveData", props.graph.toJSON({ diff: true }));
  }
  // localStorage.setItem(
  //   "x6Json",
  //   JSON.stringify(props.graph.toJSON({ diff: true }))
  // );
};
</script>

<style lang="scss" scoped></style>
