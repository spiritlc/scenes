// 属性静态数据

import {
  EQUIPMENT_ATTR,
  EQUIPMENT_ATTR_ACTION,
  MESSAGE_ATTR_ACTION,
} from "@/modules/attribute/constants";
// 物料静态数据
import {
  BASIC_CONDITION_NODE,
  BASIC_RELATION_NODE,
  BASIC_ACTION_NODE,
} from "@/modules/material/constants";
// 物料配置types
import { MenuDataI } from "@/assets/config/types/menu";

export const conditionData: Array<MenuDataI> = [
  {
    className: "设备条件",
    classCode: "equipment",
    children: [
      {
        description: "设备条件",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        attrType: EQUIPMENT_ATTR,
        shapeType: BASIC_CONDITION_NODE,
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
    children: [
      {
        id: "prodTypeId",
        name: "prodType",
        description: "设备触发",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        componentId: "3404d74e0ede4f33ba8ab72e11de8eac",
        createTime: "2019-04-17 10:03:50",
        defaultValue: "sunrise",
        sort: 4,
        thenLabel: false,
        type: "forecastweather",
        updateTime: "2019-04-17 10:03:59",
        valType: "enum",
        variants:
          '[{"description":"日出","stdValue":"sunrise"},{"description":"日落","stdValue":"sunset"}]',
        whenLabel: true,
        attrType: EQUIPMENT_ATTR,
        shapeType: BASIC_CONDITION_NODE,
      },
    ],
  },
];
export const logicData: Array<MenuDataI> = [
  {
    className: "逻辑关系",
    classCode: "relation",
    children: [
      {
        id: "andId",
        name: "and",
        description: "满足全部条件",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shapeType: BASIC_RELATION_NODE,
      },
      {
        id: "orId",
        name: "or",
        description: "满足任意条件",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shapeType: BASIC_RELATION_NODE,
      },
    ],
  },
];
export const actionData: Array<MenuDataI> = [
  {
    className: "设备动作",
    classCode: "equipmentActioin",
    children: [
      {
        id: "prodTypeActionId",
        name: "prodTypeAction",
        description: "设备执行",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        attrType: EQUIPMENT_ATTR_ACTION,
        shapeType: BASIC_ACTION_NODE,
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
        attrType: MESSAGE_ATTR_ACTION,
        shapeType: BASIC_ACTION_NODE,
      },
    ],
  },
  {
    className: "延时动作",
    classCode: "delayGroup",
    children: [],
  },
];
