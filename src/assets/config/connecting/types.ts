import { Edge, EdgeView, Cell, CellView } from "@antv/x6";

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
