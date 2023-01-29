// UserTaskNode.js
import { RectNode, RectNodeModel } from "@logicflow/core";
import { HBPMN_CALL_ACTIVITY } from "./constants";

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
class UserTaskView extends RectNode {}

export default {
  type: HBPMN_CALL_ACTIVITY,
  view: UserTaskView,
  model: UserTaskModel,
};
