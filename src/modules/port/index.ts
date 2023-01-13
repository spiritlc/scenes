// 所有节点的映射关系
import portsMap from "./template";
import { portsKey } from "@/assets/config/types/ports";
import { PortManager } from "@antv/x6/lib/model/port";

// 根据节点获取链接桩配置信息
export const getPortConfig = ({
  portTemplates, // 链接桩模板
}: // portConfig,
{
  portTemplates?: Array<portsKey>;
  // portConfig: object;
}) => {
  const portConfig: Partial<PortManager.Metadata> | PortManager.PortMetadata[] =
    { groups: {}, items: [] };
  // 存在连接桩模板，遍历获取对应的配置项
  if (portTemplates) {
    portTemplates.forEach((template) => {
      portConfig.items = Array.prototype.concat(
        portConfig.items,
        portsMap[template].items
      );
      portConfig.groups = Object.assign(
        {},
        portConfig.groups,
        portsMap[template].groups || {}
      );
    });
  }

  return portConfig;
};
