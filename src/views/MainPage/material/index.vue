<template>
  <div class="material-content">
    <el-collapse v-model="activeNames" @change="changeCollapse">
      <el-collapse-item title="条件组件" name="condition">
        <menu-item v-bind="$attrs" :menu-list="conditionList"></menu-item>
      </el-collapse-item>
      <el-collapse-item title="功能组件" name="logic">
        <menu-item v-bind="$attrs" :menu-list="logicList"></menu-item>
      </el-collapse-item>
      <el-collapse-item title="动作组件" name="action"> </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
// 依赖
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";
import useInitMaterial from "@/views/MainPage/composition/useInitMaterial";

// 配置项
const materialObj = useInitMaterial();
const conditionList = materialObj.conditionList;
const logicList = materialObj.logicList;
// const actionList = materialObj.actionList;
const activeNames = ref(["condition", "action", "logic"]);
const changeCollapse = function () {
  console.log("world");
};
</script>
<style lang="scss" scoped>
.material-content {
  width: 100%;
  height: 100%;
  // box-shadow: 2px 0 20px 0 rgba($color: #000000, $alpha: 0.1);
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.7);
    background: #666;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
    border-radius: 10px;
    background: #bbb;
  }
  ::v-deep(.el-collapse) {
    padding: 0 20px;
  }
  ::v-deep(.el-collapse-item__header) {
    font-size: 14px;
  }
  ::v-deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
</style>
