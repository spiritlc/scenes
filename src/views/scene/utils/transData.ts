/**
 * 方法，用于将画布数据转换为给后台传递的数据
 */
export default function transData(graphData: { cells: Array<any> }) {
  console.log(graphData);
  graphData.cells.forEach((item) => {
    // 获取节点，进行数据转换
    if (item.shape !== "edge") {
      // 转义设备条件
    }
  });
}

// 通过连线获取当前
