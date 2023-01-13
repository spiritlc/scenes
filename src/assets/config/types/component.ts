import { materialKey } from "./material";
import { portsKey } from "./ports";

// 服务器端获取的侧边栏配置项
export interface ComponentPostConfig {
  id?: string; // id
  componentId?: string;
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
  defaultValue?: string; // 默认值
  description: string; // 设备命令描述
  icon?: string; // icon
  name?: string; // 设备命令英文标识
  sort?: number; // ?
  thenLabel?: boolean; // ?
  type?: string; // ?
  valType?: string; // 值类型
  variants?: string; // 变体信息
  whenLabel?: boolean; // ?
}
// 前端配置的侧边栏配置项，在服务器返回基础上扩展和画布的映射关系
export interface ComponentConfig extends ComponentPostConfig {
  shape: {
    template: materialKey; // 模板名称
    config?: object; // 自定义配置项
  };
  port?: {
    // 链接桩
    templates: Array<portsKey>; // 链接桩模板
  };
  attr?: {
    template: string; // 模板名称
    config?: object; // 自定义配置项
  };
}

export interface ComponentDataI {
  className: string;
  classCode: string;
  children: Array<ComponentConfig>;
}
