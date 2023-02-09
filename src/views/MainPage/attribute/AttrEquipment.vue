<template>
  <div class="flow-basic__attr">
    <h4>设备属性</h4>
    <el-form
      ref="ruleFormRef"
      :model="nodeInstance.nodeData"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      label-position="top"
      status-icon
    >
      <el-form-item label="类型">
        <el-radio-group
          v-model="nodeInstance.nodeData.commandType"
          @change="nodeInstance.resetData()"
        >
          <el-radio
            v-for="item in nodeInstance.productIn.commandTypeMap"
            :label="item.id"
            :key="item.id"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备产品类型" prop="componentId">
        <el-select
          filterable
          clearable
          v-model="nodeInstance.nodeData.componentId"
          placeholder="请选择设备产品类型"
        >
          <el-option
            v-for="item in nodeInstance.productIn.productTypeArr"
            :label="item.prodtypeName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备命令" prop="deviceCommand">
        <el-select
          filterable
          v-model="nodeInstance.nodeData.deviceCommand"
          placeholder="请选择设备命令"
        >
          <el-option
            v-for="item in nodeInstance.deviceCommand"
            :label="item.description"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="命令参数" prop="command">
        <el-input v-model="nodeInstance.nodeData.command" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import EquipmentNode from "@/modules/Node/EquipmentNode";
import { inject } from "vue";

// 表单配置项
const formSize = ref("default");

// 当前选中元素
const activeCellData: any = inject("activeCell");
// 当前画布实例
// const lf: LogicFlow = inject("lf") as LogicFlow;
// const activeId = activeCellData.value.id;
console.log(activeCellData.value.id, "value");

const nodeInstance = ref(new EquipmentNode(activeCellData.value.data));

// 组件销毁前进行数据的同步
// onBeforeUnmount(() => {
//   lf.value
//     .getNodeModelById(activeId)
//     .setProperties(nodeInstance.value.nodeData);
// });

const ruleFormRef = ref<FormInstance>();
// const ruleForm = reactive({
//   name: "",
//   componentId: "",
//   acomponentId: "",
//   group: "",
//   date2: "",
//   date1: "",
//   type: [],
//   resource: "",
//   desc: "",
// });

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
});

// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log("submit!");
//     } else {
//       console.log("error submit!", fields);
//     }
//   });
// };

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }));
</script>

<style scoped lang="scss">
.flow-basic__attr {
  padding: 20px;
}
h4 {
  margin-bottom: 20px;
}
.el-form-item {
  margin-bottom: 20px;
}
.el-select {
  width: 100%;
}
</style>
