<template>
  <div class="flow-basic__attr">
    <h4>服务属性</h4>
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
          <el-radio :label="3">常规</el-radio>
          <el-radio :label="6">自定义服务</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 3" label="服务类型" prop="tag">
        <el-select v-model="ruleForm.tag" placeholder="请选择设备产品类型">
          <el-option label="室外温度" value="weiyu" />
          <el-option label="室外湿度" value="chufang" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 3" label="命令参数" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 6" label="接入Api" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 6" label="输入参数" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 6" label="输出参数" prop="name">
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
  type: 3,
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
