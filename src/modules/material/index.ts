// 公共物料注册方法映射
import commonRegisterMap from "./common/register";

// 节点名称和注册方法关联关系
const registerMap = {
  ...commonRegisterMap,
};

// 批量注册物料
export const registerMaterial = (nodeName: Array<keyof typeof registerMap>) => {
  nodeName.forEach((name) => {
    registerMap[name]();
  });
};
