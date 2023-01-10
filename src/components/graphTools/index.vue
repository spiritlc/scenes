<template>
  <div class="graph-tools__block">
    <component
      class="graph-tools__item"
      v-bind="$attrs"
      v-for="item in tools"
      :key="item"
      :is="toolsComponents[item]"
    >
    </component>
  </div>
</template>

<script setup lang="ts">
import toolsComponents from ".";
defineProps<{
  tools: Array<keyof typeof toolsComponents>;
}>();
</script>

<style lang="scss" scoped>
.graph-tools__block {
  display: flex;
}
::v-deep(.el-icon) {
  margin: 0 3px;
}
</style>
