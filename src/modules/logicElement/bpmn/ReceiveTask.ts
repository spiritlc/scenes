// UserTaskNode.js
import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { HBPMN_RECEIVE_TASK } from "./constants";

class UserTaskModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 200;
    this.height = 100;
    this.radius = 5;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    return style;
  }
}
class UserTaskView extends RectNode {
  private getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      "svg",
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: "0 0 1274 1024",
      },
      [
        h("path", {
          fill: style.stroke,
          d: "M780.8 341.333333H243.2l268.8 149.333334v85.333333L213.333333 409.6V682.666667h597.333334V409.6l-298.666667 166.4v-85.333333L780.8 341.333333zM896 256v512H128V256h768z",
        }),
      ]
    );
  }
  /**
   * 完全自定义节点外观方法
   */
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("rect", {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
      }),
      this.getLabelShape(),
    ]);
  }
}

export default {
  type: HBPMN_RECEIVE_TASK,
  view: UserTaskView,
  model: UserTaskModel,
};
