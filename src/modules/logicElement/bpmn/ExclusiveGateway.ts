// ExclusiveGateway.ts

import { HBPMN_EXCLUSIVE_GATEWAY } from "./constants";
import { DiamondNode, DiamondNodeModel, h } from "@logicflow/core";

class ExclusiveGatewayModel extends DiamondNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    console.log(this);
    this.text.editable = false;
    this.rx = 30;
    this.ry = 30;
    this.style.stroke = "rgb(24, 125, 255)";
  }
}
class ExclusiveGatewayModelView extends DiamondNode {
  private getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      "svg",
      {
        x: x - width / 2 + 15,
        y: y - height / 2 + 12,
        width: 36,
        height: 36,
        viewBox: "0 0 1274 1024",
      },
      [
        h("path", {
          fill: style.stroke,
          d: "M617.92 516.096l272 272-101.824 101.824-272-272-272 272-101.856-101.824 272-272-275.008-275.04L241.056 139.2l275.04 275.04 275.04-275.04 101.824 101.824-275.04 275.04z",
        }),
      ]
    );
  }
  // /**
  //  * 完全自定义节点外观方法
  //  */
  getShape() {
    const { model } = this.props;
    const { points } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("polygon", {
        ...style,
        points,
      }),
      this.getLabelShape(),
    ]);
  }
}

export default {
  type: HBPMN_EXCLUSIVE_GATEWAY,
  view: ExclusiveGatewayModelView,
  model: ExclusiveGatewayModel,
};
