import {
  EQUIPMENT_ATTR,
  TIME_ATTR,
  WEATHER_ATTR,
  FENCE_ATTR,
  EQUIPMENT_ATTR_ACTION,
  MESSAGE_ATTR_ACTION,
  DELAY_ATTR_ACTION,
} from "@/modules/attribute/constants";

import equipment from "./attrEquipment.vue"; // 设备条件
import time from "./attrTime.vue"; // 定时条件
import weather from "./attrWeather.vue"; // 天气条件
import fence from "./attrFence.vue"; // 地理围栏条件
import equipmentAction from "./attrEquipmentAction.vue"; // 设备动作
import messageAction from "./attrMessageAction.vue"; // 设备动作
import delayAction from "./attrDelayAction.vue";

export default {
  [EQUIPMENT_ATTR]: equipment,
  [TIME_ATTR]: time,
  [WEATHER_ATTR]: weather,
  [FENCE_ATTR]: fence,
  [EQUIPMENT_ATTR_ACTION]: equipmentAction,
  [MESSAGE_ATTR_ACTION]: messageAction,
  [DELAY_ATTR_ACTION]: delayAction,
};
