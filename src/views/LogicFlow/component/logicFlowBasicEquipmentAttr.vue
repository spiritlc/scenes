<template>
  <div class="flow-basic__attr">
    <h4>设备属性</h4>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      label-position="top"
      status-icon
    >
      <el-form-item label="类型">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="3">消息上报</el-radio>
          <el-radio :label="6">消息下发</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备产品类型" prop="tag">
        <el-select v-model="ruleForm.tag" placeholder="请选择设备产品类型">
          <el-option label="穿衣镜" value="weiyu" />
          <el-option label="电熨斗" value="chufang" />
          <el-option label="床头灯" value="anfang" />
          <el-option label="智能温控器" value="dengguang" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备命令" prop="atag">
        <el-select v-model="ruleForm.atag" placeholder="请选择设备命令">
          <el-option label="目标温度" value="weiyu" />
          <el-option label="目标湿度" value="chufang" />
        </el-select>
      </el-form-item>
      <el-form-item label="命令参数" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  tag: "",
  atag: "",
  group: "",
  date2: "",
  date1: "",
  type: [],
  resource: "",
  desc: "",
});

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
