/**
 * author
 * 处理画布节点
 *
 */
import { Dnd } from "@antv/x6-plugin-dnd";
import type { Graph } from "@antv/x6";
import { ComponentConfig } from "@/assets/config/types/component";

/**
 * 创建新dnd实例,用于预创建节点
 * @param { string } type 节点类型
 * @param { Graph } graph 目标画布
 */
export const createDnd = function (graph: Graph) {
  const dnd: Dnd = new Dnd({
    target: graph,
  });
  return dnd;
};

/**
 * 创建节点,添加拖拽信息
 * @param { Graph } graph 画布实例
 * @param { object } options 节点配置信息
 */
export const createNode = ({
  graph,
  dnd,
  event,
  options,
  data,
}: {
  graph: Graph;
  dnd: Dnd;
  event: MouseEvent;
  options: any;
  data: ComponentConfig;
}) => {
  const node = graph.createNode(options);
  node.setData(data);
  dnd.start(node, event); // 开始拖拽
  return node;
};
