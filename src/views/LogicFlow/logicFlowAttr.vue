<template>
  <div v-if="attrCompont" class="flow-attr__block">
    <component :is="attrCompont"></component>
  </div>
</template>

<script setup lang="ts">
import logicFlowBasicAttr from "./component/logicFlowBasicAttr.vue";
import logicFlowBasicEquipment from "./component/logicFlowBasicEquipmentAttr.vue";
import logicFlowBasicServiceAttr from "./component/logicFlowBasicServiceAttr.vue";
import { computed, inject } from "vue";

const activeCellData: any = inject("activeCell"); // 注入的当前被选中的元素

// 属性ui-Map
const attrMap: any = {
  basic: logicFlowBasicAttr,
  "h-bpmn:equipmentTask": logicFlowBasicEquipment,
  "h-bpmn:serviceTask": logicFlowBasicServiceAttr,
};

// 获取当前需要展示的组件UI容器
const attrCompont = computed(() => {
  const mapKey =
    activeCellData.value === null ? "basic" : activeCellData.value.type;
  return attrMap[mapKey] || null;
});
</script>

<style lang="scss" scoped>
.flow-attr__block {
  width: 400px;
  height: 100%;
  overflow: auto;
}
</style>
