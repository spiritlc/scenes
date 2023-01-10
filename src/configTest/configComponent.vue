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
    <el-form-item label="组件名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="UI容器" prop="region">
      <el-select v-model="ruleForm.shape" placeholder="Activity zone">
        <el-option label="基础模板" value="basicNode" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-divider />
    <p style="font-size: 16px; margin: -5px 0 15px">链接桩配置</p>
    <el-form-item label="使用模板" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="链接桩模板" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="conditionInPort" name="type">
          条件输入节点
        </el-checkbox>
        <el-checkbox label="conditionOutPort" name="type">
          条件输出节点
        </el-checkbox>
        <el-checkbox label="actionInPort" name="type">
          动作输入节点
        </el-checkbox>
        <el-checkbox label="actionOutPort" name="type">
          动作输出节点
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        创建
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  shape: "",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: "Please input 组件名称", trigger: "blur" }],
  shape: [
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
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(ruleForm);
    if (valid) {
      console.log("submit!");
      // const data = {
      //   name: ruleForm.name,
      //   shape: {
      //     template: ruleForm.shape,
      //   },
      //   // port: {
      //   //   templates: ruleForm.
      //   // }
      // };
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
