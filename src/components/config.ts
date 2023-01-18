// 属性静态数据
// 物料静态数据
import {
  BASIC_NODE,
  BASIC_LOGIC_NODE,
  BASIC_DESCISION_NODE,
  BASIC_DESCISION_GROUP,
  GATEWAY_NODE,
  TASK_NODE,
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
  DESCISION_GROUP_ATTR,
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
          template: BASIC_LOGIC_NODE,
        },
        port: {
          templates: [BASIC_OR_PORT],
        },
      },
      {
        id: "andId",
        name: "and",
        description: "会签节点",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        // shapeType: BASIC_RELATION_NODE,
        shape: {
          template: BASIC_LOGIC_NODE,
        },
        port: {
          templates: [BASIC_OR_PORT],
        },
      },
      {
        id: "serialId",
        name: "serial",
        description: "串行节点",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shape: {
          template: BASIC_LOGIC_NODE,
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

export const descisionGroup: Array<ComponentDataI> = [
  {
    className: "决策组",
    classCode: "descisionGroup",
    children: [
      {
        id: "descisionGroup",
        name: BASIC_DESCISION_GROUP,
        description: "决策组",
        icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
        shape: {
          template: BASIC_DESCISION_GROUP,
        },
        // port: {
        //   templates: [ACTION_IN_PORT],
        // },
        attr: {
          template: DESCISION_GROUP_ATTR,
        },
      },
    ],
  },
];
export const actionData: Array<ComponentDataI> = [
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

// 事件节点
export const eventData: ComponentDataI = {
  className: "任务",
  classCode: "gateway",
  children: [
    {
      id: "User",
      name: TASK_NODE,
      description: "人工任务",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
    {
      id: "Service",
      name: TASK_NODE,
      description: "服务任务",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
    {
      id: "Receive",
      name: TASK_NODE,
      description: "接受任务",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
    {
      id: "Service",
      name: TASK_NODE,
      description: "调用活动",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
  ],
};
// 网关节点
export const gatewayData: ComponentDataI = {
  className: "网关",
  classCode: "gateway",
  children: [
    {
      id: "Exclusive",
      name: GATEWAY_NODE,
      description: "互斥网关",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: GATEWAY_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      attr: {
        template: EQUIPMENT_ATTR_ACTION,
      },
    },
    {
      id: "Parallel",
      name: GATEWAY_NODE,
      description: "并行网关",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: GATEWAY_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
  ],
};
// 任务节点
export const taskData: ComponentDataI = {
  className: "任务",
  classCode: "gateway",
  children: [
    {
      id: "User",
      name: TASK_NODE,
      description: "人工任务",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
    {
      id: "Service",
      name: TASK_NODE,
      description: "服务任务",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
    {
      id: "Receive",
      name: TASK_NODE,
      description: "接受任务",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
    {
      id: "Service",
      name: TASK_NODE,
      description: "调用活动",
      icon: "https://resource.haigeek.com/download/resource/selfService/portal/img/41899b4c118d410687b0c199375cc39b.png",
      shape: {
        template: TASK_NODE,
      },
      // port: {
      //   templates: [ACTION_IN_PORT],
      // },
      // attr: {
      //   template: EQUIPMENT_ATTR_ACTION,
      // },
    },
  ],
};
