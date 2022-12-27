// mainPage 属性模板和静态名称映射
import mainPageAttrMap from "./mainPage/register";

// 所有属性模板和静态名称映射
const attrMap = {
  ...mainPageAttrMap,
};

// 批量获取
export const getAttrMap = (attrNameArr: Array<keyof typeof attrMap>) => {
  const attrMapObj: { [key: string]: any } = {};
  attrNameArr.forEach((name) => {
    attrMapObj[name] = attrMap[name];
  });
  return attrMapObj;
};
// 获取单独的属性模板
export const getAttrTemplate = (attrName: keyof typeof attrMap) => {
  return attrMap[attrName];
};