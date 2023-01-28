// StartEvent.ts

import { HBPMN_START_EVENT } from "./constants";
import { CircleNode, CircleNodeModel, h } from "@logicflow/core";

class StartEventModel extends CircleNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.text.value = "开始";
    this.text.editable = false;
    this.text.x = this.x;
    this.text.y = this.y + this.r;
    this.r = 30;
  }
}
class StartEventView extends CircleNode {
  /**
   * 完全自定义节点外观方法
   */
  getShape() {
    const { model } = this.props;
    const { width, height, r, x, y } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("circle", {
        ...style,
        r,
        cx: x,
        cy: y,
        width,
        height,
      }),
    ]);
  }
}

export default {
  type: HBPMN_START_EVENT,
  view: StartEventView,
  model: StartEventModel,
};
