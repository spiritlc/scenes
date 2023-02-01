// ExclusiveGateway.ts

import { HBPMN_OR_GATEWAY } from "./constants";
import { DiamondNode, DiamondNodeModel } from "@logicflow/core";

class ExclusiveGatewayModel extends DiamondNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.text.editable = false;
    this.text.value = "or";
    this.rx = 30;
    this.ry = 30;
    this.style.stroke = "rgb(24, 125, 255)";
  }
}
class ExclusiveGatewayModelView extends DiamondNode {
  // private getLabelShape() {
  //   const { model } = this.props;
  //   const { x, y, width, height } = model;
  //   const style = model.getNodeStyle();
  //   return h(
  //     "svg",
  //     {
  //       x: x - width / 2 + 15,
  //       y: y - height / 2 + 12,
  //       width: 36,
  //       height: 36,
  //       viewBox: "0 0 1274 1024",
  //     },
  //     [
  //       h("path", {
  //         fill: style.stroke,
  //         d: "M476 72a8 8 0 0 1 8-8h56a8 8 0 0 1 8 8v353.089l249.671-249.672a8 8 0 0 1 11.314 0l39.598 39.598a8 8 0 0 1 0 11.314L598.912 476H952a8 8 0 0 1 8 8v56a8 8 0 0 1-8 8H598.912l249.671 249.671a8 8 0 0 1 0 11.314l-39.598 39.598a8 8 0 0 1-11.314 0L548 598.911V952a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V598.912L226.329 848.583a8 8 0 0 1-11.314 0l-39.598-39.598a8 8 0 0 1 0-11.314L425.089 548H72a8 8 0 0 1-8-8v-56a8 8 0 0 1 8-8h353.089L175.417 226.329a8 8 0 0 1 0-11.314l39.598-39.598a8 8 0 0 1 11.314 0L476 425.088V72z",
  //       }),
  //     ]
  //   );
  // }
  // // /**
  // //  * 完全自定义节点外观方法
  // //  */
  // getShape() {
  //   const { model } = this.props;
  //   const { points } = model;
  //   const style = model.getNodeStyle();
  //   return h("g", {}, [
  //     h("polygon", {
  //       ...style,
  //       points,
  //     }),
  //     this.getLabelShape(),
  //   ]);
  // }
}

export default {
  type: HBPMN_OR_GATEWAY,
  view: ExclusiveGatewayModelView,
  model: ExclusiveGatewayModel,
};
