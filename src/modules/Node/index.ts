// // <!--
// // * @Description: 节点模块，功能 - 节点，节点数据
// // * @Author: guocong
// // * @Date: 2023-02-06 10:19:51
// // * @LastEditTime: 2023-02-06 10:19:51
// // * @LastEditors: Please set LastEditors
// // -->

import { ref } from "vue";

class NodeModule {
  // private data: NodeData; // 当前节点
  // private type: string; // 描述节点的类型
  // super
  public nodeData = ref<any>({}); // 当前的node/edge数据
  public attrTab: string; // 当前的属性tab

  constructor(nodeData: any) {
    this.updateNodeData(nodeData);
    this.attrTab = "basic";
  }
  updateNodeData(data: any) {
    console.log("new Data", "===>", data);
    this.nodeData.value = data;
  }
}

export default NodeModule;
