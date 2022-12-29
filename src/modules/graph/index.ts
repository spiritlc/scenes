/**
 * 获取当前画布配置信息
 */
// 依赖
import { graphOption } from "@/assets/config/types/graphOption";
// 画布配置项静态名称
import { MAIN_PAGE_GRAPH } from "./constants";

// 画布配置项
import commonConfig from "./common";
import mainPageConig from "./mainPage";

const graphMap = {
  [MAIN_PAGE_GRAPH]: mainPageConig,
};

export default function getGraphConfig(
  configName: keyof typeof graphMap | Array<keyof typeof graphMap>,
  options: graphOption
) {
  if (typeof configName === "string") {
    // 单一的属性配置
    return Object.assign({}, commonConfig, graphMap[configName](options));
  } else {
    const res = Object.assign({}, commonConfig);
    configName.forEach((item) => {
      Object.assign(res, graphMap[item](options));
    });
    return res;
  }
}
