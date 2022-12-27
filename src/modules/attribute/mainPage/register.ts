import {
  EQUIPMENT_ATTR,
  TIME_ATTR,
  WEATHER_ATTR,
  FENCE_ATTR,
} from "@/modules/attribute/constants";

import equipment from "./attrEquipment.vue"; // 设备条件
import time from "./attrTime.vue"; // 定时条件
import weather from "./attrWeather.vue"; // 天气条件
import fence from "./attrFence.vue"; // 地理围栏条件

export default {
  [EQUIPMENT_ATTR]: equipment,
  [TIME_ATTR]: time,
  [WEATHER_ATTR]: weather,
  [FENCE_ATTR]: fence,
};
