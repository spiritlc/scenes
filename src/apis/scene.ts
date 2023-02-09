import { iotRequest } from "@/infrastructure/apis/api";

// 获取设备条件类型
export const fnGetAllProdtype = () => {
  return iotRequest({
    path: "/developerportal/developer/prodtype/getAllProdtypeList",
  });
};
// 获取定时条件
export const fnGetAlltimer = () => {
  return iotRequest({
    method: "get",
    path: "/developerportal/developer/component/cmptPropList/TIMER",
  });
};
// 获取天气条件
export const fnGetAllweather = () => {
  return iotRequest({
    method: "get",
    path: "/developerportal/developer/component/cmptPropList/WEATHER",
  });
};
// 地理围栏条件
export const fnGetAllgeofence = () => {
  return iotRequest({
    method: "get",
    path: "/developerportal/developer/component/cmptPropList/GEOFENCE",
    // {}
  });
};
// 延时动作
export const fnGetAllDelay = () => {
  return iotRequest({
    method: "get",
    path: "/developerportal/developer/component/cmptPropList/DELAY",
  });
};
