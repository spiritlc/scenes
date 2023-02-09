// UserTaskNode.js
import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { HBPMN_EQUIPMENT_TASK } from "./constants";

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
          d: "M1035.09001747 686.59460362V79.64608611H-11.09001747v606.94851751h492.95525433v192.93487986h-274.01820648v60.32985611h608.33610417v-60.32985611h-273.98804156v-192.93487986h492.89492448z m-985.85017885-60.32985612V139.97594225h925.52032276v486.28880525H49.23983862z",
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
  type: HBPMN_EQUIPMENT_TASK,
  view: UserTaskView,
  model: UserTaskModel,
};
