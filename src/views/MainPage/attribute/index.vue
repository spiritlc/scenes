<template>
  <div class="flow-attr__block">
    <component :is="attrCompont"></component>
  </div>
</template>

<script setup lang="ts">
import AttrBasic from "./AttrBasic.vue";
import AttrEquipment from "./AttrEquipment.vue";
// import logicFlowBasicServiceAttr from "./component/logicFlowBasicServiceAttr.vue";
import { computed, inject } from "vue";
import { TASK_EQUIPMENT } from "@/modules/material/constants";

const activeCell: any = inject("activeCell"); // 注入的当前被选中的元素

// 属性ui-Map
const attrMap: any = {
  basic: AttrBasic,
  [TASK_EQUIPMENT]: AttrEquipment,
  "h-bpmn:serviceTask": AttrEquipment,
};

// 获取当前需要展示的组件UI容器
const attrCompont = computed(() => {
  console.log(activeCell.value);
  const mapKey = activeCell.value ? activeCell.value.shape : "basic";
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
