/**
 * 连接桩相关方法
 */
// import portConfig from "@/modules/port/common";
import { Node } from "@antv/x6";

/**
 * 获取当前节点配置项，
 * 先从配置项中读取是否为多个链接桩
 * 1.多个链接桩进行信息整合
 * 2.单个链接桩直接获取
 */
export const getPortConfig = (type: string) => {
  console.log(type);
  // return portConfig[type] || {};
  // 单个链接桩
};

/**
 * 节点上添加链接桩
 * @param { Node } node 节点
 * @param { object } options
 */
export const addPort = (node: Node, options: any) => {
  node.addPort(options);
};
