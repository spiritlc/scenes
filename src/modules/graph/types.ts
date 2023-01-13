import graphMap from "@/modules/graph/template/graphMap";
import graphRulesMap from "@/modules/graph/rules/graphRulesMap";
import { Edge, EdgeView, Cell, CellView } from "@antv/x6";

interface selfConfigI {
  rules?: Array<keyof typeof graphRulesMap>;
  options?: object;
}

export interface initGraphParamsI {
  templateName?: keyof typeof graphMap; // 模板名称，没有模板的情况下，使用配置项和基本配置混合注册画布
  container: HTMLElement; // dom节点，
  config?: selfConfigI; // 自定义的画布配置项
}

// 连接规则判断函数参数
export interface ValidateConnectionArgs {
  type?: Edge.TerminalType | null;
  edge?: Edge | null;
  edgeView?: EdgeView | null;
  sourceCell?: Cell | null;
  targetCell?: Cell | null;
  sourceView?: CellView | null;
  targetView?: CellView | null;
  sourcePort?: string | null;
  targetPort?: string | null;
  sourceMagnet?: Element | null;
  targetMagnet?: Element | null;
}

export interface SelfValidateConnectionArgs extends ValidateConnectionArgs {
  sourcePortName: string;
  sourcePortType: string;
  targetPortName: string;
  targetPortType: string;
}
