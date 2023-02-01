// <!--
// * @Description: h-bpmn element constants
// * @Author: guocong
// * @Date: 2023-01-28 14:45:22
// * @LastEditTime: 2023-01-28 14:45:22
// * @LastEditors: Please set LastEditors
// -->
// 任务
export const HBPMN_START_EVENT = "h-bpmn:startEvent"; // 开始任务
export const HBPMN_TIMER_START_EVENT = "h-bpmn:timerIntermediateEvent"; // 定时器任务
export const HBPMN_END_EVENT = "h-bpmn:endEvent"; // 结束任务
export const HBPMN_USER_TASK = "h-bpmn:userTask"; // 用户任务
export const HBPMN_SERVICE_TASK = "h-bpmn:serviceTask"; // 系统任务
export const HBPMN_RECEIVE_TASK = "h-bpmn:receiveTask"; // 接收任务
export const HBPMN_CALL_ACTIVITY = "h-bpmn:callActivity"; // 调用活动
export const HBPMN_EQUIPMENT_TASK = "h-bpmn:equipmentTask"; // 设备任务
// 网关
export const HBPMN_EXCLUSIVE_GATEWAY = "h-bpmn:exclusiveGateway"; // 互斥网关
export const HBPMN_PARALLEL_GATEWAY = "h-bpmn:parallelGateway"; // 并行网关
export const HBPMN_COMPLEX_GATEWAY = "h-bpmn:complexGateway"; // 复杂网关
export const HBPMN_OR_GATEWAY = "h-bpmn:complexGatewayOr"; // 复杂-或-网关
export const HBPMN_AND_GATEWAY = "h-bpmn:complexGatewayAnd"; // 复杂-且-网关
