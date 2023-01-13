// 属性静态数据
// 物料静态数据
import {
  BASIC_NODE,
  BASIC_OR_NODE,
  BASIC_DESCISION_NODE,
} from "@/modules/material/constants";
// 节点静态数据
import {
  CONDITION_OUT_PORT,
  CONDITION_IN_PORT,
  BASIC_OR_PORT,
  ACTION_IN_PORT,
} from "@/modules/port/constants";
// 物料配置types
import { ComponentDataI } from "@/assets/config/types/component";
import {
  EQUIPMENT_ATTR,
  DESCISION_ATTR,
  EQUIPMENT_ATTR_ACTION,
  MESSAGE_ATTR_ACTION,
} from "../modules/attribute/constants";

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
        attr: {
          template: EQUIPMENT_ATTR,
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
    className: "决策点",
    classCode: "descision",
    children: [
      {
        id: "descision",
        name: BASIC_DESCISION_NODE,
        description: "决策节点",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        // shapeType: BASIC_RELATION_NODE,
        shape: {
          template: BASIC_DESCISION_NODE,
        },
        port: {
          templates: [CONDITION_OUT_PORT, CONDITION_IN_PORT],
        },
        attr: {
          template: DESCISION_ATTR,
        },
      },
    ],
  },
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
  // {
  //   className: "决策组",
  //   classCode: "rules",
  //   // children: [
  //   //   {

  //   //   }
  //   // ]
  // },
  {
    className: "设备动作",
    classCode: "equipmentActioin",
    children: [
      {
        id: "prodTypeActionId",
        name: "prodTypeAction",
        description: "设备执行",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shape: {
          template: BASIC_NODE,
        },
        port: {
          templates: [ACTION_IN_PORT],
        },
        attr: {
          template: EQUIPMENT_ATTR_ACTION,
        },
      },
    ],
  },
  {
    className: "消息动作",
    classCode: "messageGroup",
    children: [
      {
        id: "messageId",
        name: "messagePush",
        description: "消息通知",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shape: {
          template: BASIC_NODE,
        },
        port: {
          templates: [ACTION_IN_PORT],
        },
        attr: {
          template: MESSAGE_ATTR_ACTION,
        },
      },
    ],
  },
  {
    className: "延时动作",
    classCode: "delayGroup",
    children: [],
  },
];
