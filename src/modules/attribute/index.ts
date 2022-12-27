// mainPage 属性模板和静态名称映射
import mainPageAttrMap from "./mainPage/register";

// 所有属性模板和静态名称映射
const attrMap = {
  ...mainPageAttrMap,
};

export const getAttrMap = (attrNameArr: Array<keyof typeof attrMap>) => {
  const attrMapObj: { [key: string]: any } = {};
  attrNameArr.forEach((name) => {
    attrMapObj[name] = attrMap[name];
  });
  return attrMapObj;
};
