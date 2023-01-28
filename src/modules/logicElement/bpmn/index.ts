import LogicFlow from "@logicflow/core";

// 任务
import StartEvent from "./StartEvent"; // 开始任务
import EndEvent from "./EndEvent"; // 结束任务
import UserTask from "./UserTask"; // 人工任务
import ServiceTask from "./ServiceTask";
// 网关
import ExclusiveGateway from "./ExclusiveGateway";

class HBpmn {
  static pluginName = "HBpmn";
  constructor({ lf }: { lf: LogicFlow }) {
    // do anything
    // lf.on("node:add", ({ data }) => {
    //   console.log(data);
    //   if (data.type === "bpmn:self") {
    //     console.log("self");
    //   }
    // });
    lf.register(StartEvent); // 开始任务
    lf.register(EndEvent); // 结束任务
    lf.register(UserTask); // 用户任务
    lf.register(ServiceTask); // 系统任务

    lf.register(ExclusiveGateway); // 排他网关
  }
  // render(lf, toolOverlay) {
  //   // do anything
  // }
  destroy() {
    // do anythine
  }
}
export default HBpmn;
