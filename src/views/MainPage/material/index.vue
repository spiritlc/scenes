<template>
  <div class="material-content">
    <menu-item
      v-bind="$attrs"
      :menu-list="[...conditionList, ...logicList]"
    ></menu-item>
  </div>
</template>

<script lang="ts" setup>
// 依赖
import MenuItem from "./MenuItem.vue";
import useInitMaterial from "@/views/MainPage/composition/useInitMaterial";

// 配置项
const materialObj = useInitMaterial();
const conditionList = materialObj.conditionList;
const logicList = materialObj.logicList;
// const actionList = materialObj.actionList;
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
  ::v-deep(.el-tabs__header) {
    padding-left: 20px;
  }
  ::v-deep(.el-tabs__active-bar) {
    background-color: $active-color;
  }
  ::v-deep(.el-tabs__item:hover),
  ::v-deep(.el-tabs__item.is-active) {
    color: $active-color;
  }
}
</style>
