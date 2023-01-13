<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="决策点" prop="descision">
      <el-select
        v-model="ruleForm.descisionId"
        placeholder="请选择决策点"
        @change="changeDescision"
      >
        <el-option
          v-for="item in descisionNodeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="决策方式" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="正确" name="type" />
        <el-checkbox label="错误" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useSyncAttrData from "../useSyncAttrData";
import { find } from "lodash";

// 声明
const emit = defineEmits(["syncData"]);

// 事件
const changeDescision = (val: any) => {
  console.log(val);
  const descision = find(descisionNodeList, (item) => item.id === val);
  ruleForm.descision = descision.name;
};

// 获取所有的决策点数据
const descisionNodeList = JSON.parse(
  localStorage.getItem("descisionNodeList") || "[]"
);
console.log(descisionNodeList);

onMounted(() => {
  useSyncAttrData(emit, ruleForm);
});

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "Hello",
  descisionId: "",
  descision: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  descisionId: [
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }));
</script>
