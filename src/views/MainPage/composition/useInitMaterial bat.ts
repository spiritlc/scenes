/**
 * 处理物料数据获取，注册物料模型
 */
// 依赖方法
import { ref } from "vue";
// types
import {
  ComponentConfig,
  ComponentDataI,
} from "@/assets/config/types/component";
// api
import {
  fnGetAlltimer,
  fnGetAllweather,
  fnGetAllgeofence,
  fnGetAllDelay,
} from "@/apis/scene";
// 静态数据
import { BASIC_NODE } from "@/modules/material/constants";
import {
  TIME_ATTR,
  WEATHER_ATTR,
  FENCE_ATTR,
  DELAY_ATTR_ACTION,
} from "@/modules/attribute/constants";
// 配置项
import { conditionData, logicData, actionData } from "@/components/config";
import registerComponent from "@/modules/index";
import {
  CONDITION_OUT_PORT,
  CONDITION_IN_PORT,
} from "@/modules/port/constants";

export default function useInitMaterial() {
  // 配置项
  const conditionList = ref<Array<ComponentDataI>>(conditionData);
  const logicList = ref<Array<ComponentDataI>>(logicData);
  const actionList = ref<Array<ComponentDataI>>(actionData);
  const componentList = ref<Array<ComponentConfig>>([]);

  const localConfig = JSON.parse(localStorage.getItem("config") || "[]");
  if (localConfig.length) {
    conditionList.value.push({
      className: "自定义组件",
      classCode: "self",
      children: localConfig,
    });
  }

  console.log(conditionList);

  // 获取物料配置,建立数据和模型关联关系
  Promise.all([
    fnGetAlltimer(), // 时间条件
    fnGetAllweather(), // 天气条件
    fnGetAllgeofence(), // 地理围栏条件
    fnGetAllDelay(), // 动作
  ]).then(([timeRes, weatherRes, geoRes, delayRes]) => {
    // 定时条件
    if (timeRes && timeRes.data) {
      conditionList.value[1].children = timeRes.data.map(
        (item: ComponentConfig) => {
          return {
            ...item,
            shape: {
              template: BASIC_NODE,
            },
            port: {
              templates: [CONDITION_OUT_PORT, CONDITION_IN_PORT],
            },
            attr: {
              template: TIME_ATTR,
            },
          };
        }
      );
    }
    // 天气条件
    if (weatherRes && weatherRes.data) {
      conditionList.value[2].children = weatherRes.data.map(
        (item: ComponentConfig) => {
          return {
            ...item,
            shape: {
              template: BASIC_NODE,
            },
            port: {
              templates: [CONDITION_OUT_PORT, CONDITION_IN_PORT],
            },
            attr: {
              template: WEATHER_ATTR,
            },
          };
        }
      );
    }
    // 围栏信息
    if (geoRes && geoRes.data) {
      conditionList.value[3].children = geoRes.data.map(
        (item: ComponentConfig) => {
          return {
            ...item,
            shape: {
              template: BASIC_NODE,
            },
            port: {
              templates: [CONDITION_OUT_PORT, CONDITION_IN_PORT],
            },
            attr: {
              template: FENCE_ATTR,
            },
          };
        }
      );
    }
    // 延时动作
    if (delayRes && delayRes.data) {
      actionList.value[2].children = delayRes.data.map(
        (item: ComponentConfig) => {
          return {
            ...item,
            shape: {
              template: BASIC_NODE,
            },
            port: {
              templates: [CONDITION_OUT_PORT, CONDITION_IN_PORT],
            },
            attr: {
              template: DELAY_ATTR_ACTION,
            },
          };
        }
      );
    }

    conditionList.value.forEach((item) => {
      componentList.value.push(...item.children);
    });
    logicList.value.forEach((item) => {
      componentList.value.push(...item.children);
    });
    console.log(componentList.value);
    registerComponent(componentList.value);
  });

  return {
    conditionList, // 条件
    logicList, // 逻辑关系
    actionList, // 动作
    componentList,
  };
}
