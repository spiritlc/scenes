// StartEvent.ts
import { CircleNode, CircleNodeModel } from "@logicflow/core";
import { HBPMN_END_EVENT } from "./constants";

class StartEventModel extends CircleNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.text.value = "结束";
    this.text.editable = false;
    this.text.x = this.x;
    this.text.y = this.y + this.r;
    this.r = 30;

    // 结束节点不能作为输出节点
    const circleOnlyAsTarget = {
      message: "正方形节点下一个节点只能是圆形节点",
      validate: (
        sourceNode: any,
        targetNode: any,
        sourceAnchor: any,
        targetAnchor: any
      ) => {
        console.log(sourceNode, targetNode, sourceAnchor, targetAnchor);
        return sourceNode.type !== HBPMN_END_EVENT;
      },
    };
    this.sourceRules.push(circleOnlyAsTarget);
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeWidth = 4;
    return style;
  }
}
class StartEventView extends CircleNode {}

export default {
  type: HBPMN_END_EVENT,
  view: StartEventView,
  model: StartEventModel,
};
