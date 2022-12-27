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
console.log(toolsComponents);
defineProps({
  tools: Array,
});
// export default {
//   props: {
//     tools: {
//       type: Array,
//       default() {
//         return [];
//       },
//     },
//   },
//   data() {
//     return {
//       toolsComponents,
//     };
//   },
//   created() {
//     console.log(this.tools);
//     console.log(this.toolsComponents);
//   },
// };
</script>

<style lang="scss" scoped></style>
