<template>
  <div class="logic-flow__tools">
    <!-- <el-button-group>
      <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
      <el-button type="primary">
        Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </el-button-group> -->

    <el-button-group v-for="item in toolsData" :key="item.id">
      <el-button
        v-for="temp in item.children"
        :key="temp.key"
        :title="temp.name"
        @click="handleClick(temp)"
      >
        <el-icon>
          <component :is="temp.icon || temp.key"></component>
        </el-icon>
      </el-button>
    </el-button-group>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRoute } from "vue-router";
import LogicFlow from "@logicflow/core";
import { ElMessage } from "element-plus";
const route = useRoute();

const props = defineProps<{
  lf: LogicFlow;
}>();
const lf = toRefs(props).lf;
const id = route.query.id as string;
// 事件处理
const saveData = () => {
  const data = lf.value.getGraphData();
  const lfData = JSON.parse(localStorage.getItem("logicData") || "{}");
  lfData[id] = data;
  localStorage.setItem("logicData", JSON.stringify(lfData));
  ElMessage({
    message: "保存成功",
    type: "success",
  });
};
const handleClick = (data: any) => {
  switch (data.key) {
    case "ZoomIn":
      lf.value.zoom(true); // 放大
      break;
    case "ZoomOut":
      lf.value.zoom(false); // 缩小
      break;
    case "Undo":
      lf.value.undo(); // 返回上一步
      break;
    case "Redo":
      lf.value.redo(); // 恢复下一步
      break;
    case "Reset":
      lf.value.clearData(); // 重置
      break;
    case "Save":
      saveData();
      break;
    default:
      break;
  }
};

const toolsData = [
  {
    id: "1",
    children: [
      {
        key: "ZoomIn",
        name: "放大",
      },
      {
        key: "ZoomOut",
        name: "缩小",
      },
    ],
  },
  {
    id: "2",
    children: [
      {
        key: "Undo",
        icon: "RefreshLeft",
        name: "返回上一步",
      },
      {
        key: "Redo",
        icon: "RefreshRight",
        name: "恢复下一步",
      },
      {
        key: "Reset",
        icon: "Refresh",
        name: "重置",
      },
      {
        key: "Save",
        icon: "Download",
        name: "保存",
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.el-button-group {
  margin-right: 5px;
}
.logic-flow__tools {
  background: rgb(248, 248, 248);
  padding: 5px 0 5px 225px;
}
</style>
