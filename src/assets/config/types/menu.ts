// 服务器端获取的侧边栏配置项
export interface MenuPostConfig {
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
export interface MenuConfig extends MenuPostConfig {
  attrType?: string; // 属性模板,侧边栏和右侧属性栏映射关系
  shapeType: string; // 物料模板,侧边栏和拖拽生成节点映射关系
}

export interface MenuDataI {
  className: string;
  classCode: string;
  children: Array<MenuConfig>;
}
