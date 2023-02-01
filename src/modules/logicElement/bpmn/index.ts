import LogicFlow from "@logicflow/core";

// 任务
import StartEvent from "./StartEvent"; // 开始任务
import TimerEvent from "./TimerEvent"; // 定时器任务
import EndEvent from "./EndEvent"; // 结束任务
import UserTask from "./UserTask"; // 人工任务
import ServiceTask from "./ServiceTask"; // 服务任务
import ReceiveTask from "./ReceiveTask"; // 接收任务
import CallActivity from "./CallActivity"; // 调用活动
import EquipmentTask from "./EquipmentTask";
// 网关
import ExclusiveGateway from "./ExclusiveGateway";
import ParallelGateway from "./ParallelGateway";
import ComplexGateway from "./ComplexGateway";
import ComplexGatewayAnd from "./ComplexGatewayAnd";
import ComplexGatewayOr from "./ComplexGatewayOr";

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
    lf.register(TimerEvent); // 定时器任务
    lf.register(EndEvent); // 结束任务
    lf.register(UserTask); // 用户任务
    lf.register(ServiceTask); // 系统任务
    lf.register(ReceiveTask); // 接收任务
    lf.register(CallActivity);
    lf.register(EquipmentTask); // 设备任务

    lf.register(ExclusiveGateway); // 排他网关
    lf.register(ParallelGateway); // 并行网关
    lf.register(ComplexGateway); // 复杂网关
    lf.register(ComplexGatewayAnd); // 复杂-and-网关
    lf.register(ComplexGatewayOr); // 复杂-or-网关
  }
  // render(lf, toolOverlay) {
  //   // do anything
  // }
  destroy() {
    // do anythine
  }
}
export default HBpmn;
