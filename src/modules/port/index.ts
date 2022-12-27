// 公共节点
import commonPorts from "./common";

// 所有节点的映射关系
const portsMap = {
  ...commonPorts,
};

// 获取当前节点的链接桩信息
export const getPortConfig = (type: string) => {
  return portsMap[type as keyof typeof portsMap];
};
