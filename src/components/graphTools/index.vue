<template>
  <div>
    <component
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

<style lang="scss" scoped></style>
