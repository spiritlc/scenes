// 公共物料注册方法映射
import { Node } from "@antv/x6";
import commonRegisterMap from "./common/register";

// 节点名称和注册方法关联关系
export const registerMap = {
  ...commonRegisterMap,
};

// 批量注册物料
const registerMaterial = (
  nodeName: Array<{
    template: keyof typeof registerMap;
    options: Node.Properties;
  }>
) => {
  nodeName.forEach((config) => {
    registerMap[config.template](config.options);
  });
};
export default registerMaterial;
