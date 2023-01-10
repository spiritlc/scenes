// 属性静态数据
// 物料静态数据
import { BASIC_NODE, BASIC_OR_NODE } from "@/modules/material/constants";
// 节点静态数据
import {
  CONDITION_OUT_PORT,
  CONDITION_IN_PORT,
  BASIC_OR_PORT,
} from "@/modules/port/constants";
// 物料配置types
import { ComponentDataI } from "@/assets/config/types/component";

export const conditionData: Array<ComponentDataI> = [
  {
    className: "设备条件",
    classCode: "equipment",
    children: [
      {
        description: "设备条件",
        name: "equipment",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shape: {
          template: BASIC_NODE,
        },
        port: {
          templates: [CONDITION_OUT_PORT, CONDITION_IN_PORT],
        },
      },
    ],
  },
  {
    className: "定时条件",
    classCode: "time",
    children: [],
  },
  {
    className: "天气条件",
    classCode: "weather",
    children: [],
  },
  {
    className: "地理围栏条件",
    classCode: "geofence",
    children: [],
  },
];
export const logicData: Array<ComponentDataI> = [
  {
    className: "逻辑关系",
    classCode: "relation",
    children: [
      {
        id: "andId",
        name: "or",
        description: "并行节点",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        // shapeType: BASIC_RELATION_NODE,
        shape: {
          template: BASIC_OR_NODE,
        },
        port: {
          templates: [BASIC_OR_PORT],
        },
      },
    ],
  },
  // {
  //   className: "逻辑关系",
  //   classCode: "relation",
  //   children: [
  //     {
  //       id: "andId",
  //       name: "and",
  //       description: "满足全部条件",
  //       icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
  //       shapeType: BASIC_RELATION_NODE,
  //     },
  //     {
  //       id: "orId",
  //       name: "or",
  //       description: "满足任意条件",
  //       icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
  //       shapeType: BASIC_RELATION_NODE,
  //     },
  //   ],
  // },
];
export const actionData: Array<ComponentDataI> = [
  {
    className: "设备动作",
    classCode: "equipmentActioin",
    children: [],
  },
  {
    className: "消息动作",
    classCode: "messageGroup",
    children: [],
  },
  {
    className: "延时动作",
    classCode: "delayGroup",
    children: [],
  },
];
