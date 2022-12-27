<template>
  <div class="material-content">
    <el-tabs v-model="activeName">
      <el-tab-pane label="条件" name="condition">
        <menu-item v-bind="$attrs" :menu-list="conditionList"></menu-item>
      </el-tab-pane>
      <el-tab-pane label="逻辑" name="logic">
        <menu-item v-bind="$attrs" :menu-list="logicData"></menu-item>
      </el-tab-pane>
      <el-tab-pane label="动作" name="actuib">
        <menu-item v-bind="$attrs" :menu-list="actionList"></menu-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
// 依赖
import { onMounted, ref } from "vue";
import { MenuConfig, MenuDataI } from "@/assets/config/types/menu";
// 物料
import { registerNode } from "@/modules/material";
import {
  BASIC_CONDITION_NODE,
  BASIC_RELATION_NODE,
  BASIC_ACTION_NODE,
} from "@/modules/material/constants";
// api
import {
  fnGetAlltimer,
  fnGetAllweather,
  fnGetAllgeofence,
  fnGetAllDelay,
} from "@/apis/scene";
// 属性配置
import {
  TIME_ATTR,
  WEATHER_ATTR,
  FENCE_ATTR,
  DELAY_ATTR_ACTION,
} from "@/modules/attribute/constants";

import MenuItem from "./MenuItem.vue";

import { conditionData, logicData, actionData } from "@/components/config";

// 配置项
const conditionList = ref<Array<MenuDataI>>(conditionData);
const actionList = ref<Array<MenuDataI>>(actionData);

// tabs
const activeName = ref("condition");
// 侧边栏渲染
onMounted(() => {
  registerNode([BASIC_CONDITION_NODE, BASIC_RELATION_NODE, BASIC_ACTION_NODE]); // 注册物料节点
  getMaterial(); // 获取物料配置项,并且与本地物料模板建立关联关系
});
// 获取左侧物料配置
const getMaterial = () => {
  Promise.all([
    fnGetAlltimer(), // 时间条件
    fnGetAllweather(), // 天气条件
    fnGetAllgeofence(), // 地理围栏条件
    fnGetAllDelay(), // 动作
  ]).then(([timeRes, weatherRes, geoRes, delayRes]) => {
    // 定时条件
    if (timeRes && timeRes.data) {
      conditionList.value[1].children = timeRes.data.map((item: MenuConfig) => {
        return {
          ...item,
          attrType: TIME_ATTR, // 属性模板
          shapeType: BASIC_CONDITION_NODE, // 物料模板
        };
      });
    }
    // 天气条件
    if (weatherRes && weatherRes.data) {
      conditionList.value[2].children = weatherRes.data.map(
        (item: MenuConfig) => {
          return {
            ...item,
            attrType: WEATHER_ATTR, // 属性模板
            shapeType: BASIC_CONDITION_NODE, // 物料模板
          };
        }
      );
    }
    // 围栏信息
    if (geoRes && geoRes.data) {
      conditionList.value[3].children = geoRes.data.map((item: MenuConfig) => {
        return {
          ...item,
          attrType: FENCE_ATTR, // 属性模板
          shapeType: BASIC_CONDITION_NODE, // 物料模板
        };
      });
    }
    // 延时动作
    if (delayRes && delayRes.data) {
      actionList.value[2].children = delayRes.data.map((item: MenuConfig) => {
        return {
          ...item,
          attrType: DELAY_ATTR_ACTION, // 属性模板
          shapeType: BASIC_ACTION_NODE, // 物料模板
        };
      });
    }
  });
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
  >>> .el-tabs__nav-scroll {
    padding: 0 15px;
  }
  >>> .el-tabs__active-bar {
    background-color: $active-color;
  }
  >>> .el-tabs__item:hover,
  >>> .el-tabs__item.is-active {
    color: $active-color;
  }
}
</style>
