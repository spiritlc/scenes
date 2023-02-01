<template>
  <div v-if="attrCompont" class="flow-attr__block">
    <component :is="attrCompont"></component>
  </div>
</template>

<script setup lang="ts">
import { BaseEdgeModel, BaseNodeModel } from "@logicflow/core";
import logicFlowBasicAttr from "./component/logicFlowBasicAttr.vue";
import logicFlowBasicEquipment from "./component/logicFlowBasicEquipmentAttr.vue";
import logicFlowBasicServiceAttr from "./component/logicFlowBasicServiceAttr.vue";
import { computed } from "vue";

const props = defineProps<{
  activeCell: BaseNodeModel | BaseEdgeModel | null;
}>();

const attrMap: any = {
  basic: logicFlowBasicAttr,
  "h-bpmn:equipmentTask": logicFlowBasicEquipment,
  "h-bpmn:serviceTask": logicFlowBasicServiceAttr,
};

const attrCompont = computed(() => {
  const mapKey =
    props.activeCell === null ? "basic" : props.activeCell.data.type;
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
