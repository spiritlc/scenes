<template>
  <div class="flow-basic__attr">
    <h4>全局属性</h4>
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
      <el-form-item label="场景名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="场景分类标签" prop="tag">
        <el-select v-model="ruleForm.tag" placeholder="请选择场景分类标签">
          <el-option label="低碳节能" value="weiyu" />
          <el-option label="安心居家" value="chufang" />
          <el-option label="灯光氛围" value="anfang" />
          <el-option label="健康睡眠" value="dengguang" />a
          <el-option label="家庭空气" value="kongqi" />
          <el-option label="居家环境" value="tongyong" />
        </el-select>
      </el-form-item>
      <el-form-item label="场景标签" prop="atag">
        <el-select v-model="ruleForm.atag" placeholder="请选择场景标签">
          <el-option label="卫浴" value="weiyu" />
          <el-option label="厨房" value="chufang" />
          <el-option label="安防" value="anfang" />
          <el-option label="灯光" value="dengguang" />
          <el-option label="空气" value="kongqi" />
          <el-option label="通用" value="tongyong" />
        </el-select>
      </el-form-item>
      <el-form-item label="场景描述" prop="name">
        <el-input v-model="ruleForm.name" type="textarea" />
      </el-form-item>
      <el-form-item label="关联分组" prop="group">
        <el-select v-model="ruleForm.group" placeholder="请选择分组">
          <el-option label="分组1" value="weiyu" />
          <el-option label="分组2" value="chufang" />
        </el-select>
      </el-form-item>

      <el-form-item label="生效时间" prop="group">
        <el-col :span="11">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="ruleForm.date2"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
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
