// ExclusiveGateway.ts

import { HBPMN_PARALLEL_GATEWAY } from "./constants";
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
          d: "M960.621531 575.791885 571.769268 575.791885l0 382.755404-120.688733 0L451.080535 575.791885 64.875566 575.791885 64.875566 448.207092l386.204969 0L451.080535 65.451688l120.688733 0 0 382.755404 388.853285 0L960.622554 575.791885z",
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
  type: HBPMN_PARALLEL_GATEWAY,
  view: ExclusiveGatewayModelView,
  model: ExclusiveGatewayModel,
};
