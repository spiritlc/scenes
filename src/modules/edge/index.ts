import commonEdge from "./common/register";
// 连接线
const edgeMap = {
  ...commonEdge,
};

// 注册方法
export const registerEdge = (edgeArr: Array<keyof typeof edgeMap>) => {
  edgeArr.forEach((edgeName) => {
    edgeMap[edgeName]();
  });
};
