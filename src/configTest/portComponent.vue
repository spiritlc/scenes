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
    <el-form-item label="连接桩名称" prop="description">
      <el-input v-model="ruleForm.description" />
    </el-form-item>
    <el-form-item label="连接桩标识" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="连接桩位置" prop="region">
      <el-select v-model="ruleForm.shape" placeholder="Activity zone">
        <el-option label="上" value="top" />
        <el-option label="下" value="bottom" />
        <el-option label="左" value="left" />
        <el-option label="右" value="right" />
      </el-select>
    </el-form-item>
    <el-form-item label="连接桩样式配置" prop="icon"> </el-form-item>
    <el-divider />
    <p style="font-size: 16px; margin: -5px 0 15px">连接桩规则配置</p>
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
  description: "",
  icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
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
      const data = {
        name: ruleForm.name, // 组件名称
        icon: ruleForm.icon, // 组件图标
        description: ruleForm.name, // 组件名称
        shape: {
          // UI容器模板
          template: ruleForm.shape,
        },
        port: {
          // 连接桩模板
          templates: ruleForm.type,
        },
      };
      const localConfig = JSON.parse(localStorage.getItem("config") || "[]");
      localConfig.push(data);

      localStorage.setItem("config", JSON.stringify(localConfig));
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

<style>
img {
  width: 24px;
  height: 24px;
}
</style>
