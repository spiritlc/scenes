import { Graph, Cell, Node } from "@antv/x6";

const logicShapArr = ["or", "and", "serial"];

/**
 * 递归处理各个节点
 *
 */
const recurCell = (cell: Node, obj: any) => {
  let resultObj;
  // 当前节点是逻辑节点
  if (logicShapArr.indexOf(cell.shape as string) > -1) {
    resultObj = {
      relationType: cell.shape,
      children: [],
    };
  } else {
    resultObj = {
      relationType: "serial",
      children: [],
    };
  }
  obj.children.push(resultObj);
};

/**
 * 数据适配方法
 * @param { Graph } graph 当前画布实例
 * @param { { cells: Cell.Properties[]; } } data  画布内数据
 */
const adapterData = (
  graph: Graph,
  data: {
    cells: Cell.Properties[];
  }
) => {
  console.log(graph, data);

  // 获取源头节点
  const rootCells = graph.getRootNodes();
  const rootCellLength = rootCells.length;
  // 没有源头节点或者源头节点有多个，当前决策组数据不正确
  if (rootCellLength === 0 || rootCellLength > 1) {
    console.log("当前决策组有多个源头节点，请检测");
  } else {
    const cells = data.cells;
    const cellsObj: any = {};
    cells.forEach((item) => {
      // 当前是连线
      if (item.shape === "edge") {
        console.log(item.source.cell);
        cellsObj[`edge-${item.source.cell}`] = cellsObj[item.source.cell]
          ? [...cellsObj[item.source.cell], item]
          : [item];
      } else if (item.id) {
        cellsObj[item.id] = item;
      }
      const resultObj = {
        relationType: "serial",
        children: [],
      };

      const rootCell = rootCells[0];
      recurCell(rootCell, resultObj);
      //
      console.log(resultObj);
    });

    console.log(cellsObj);
  }
};
export default adapterData;
