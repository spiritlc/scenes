/**
 * 获取当前画布配置信息
 */
// 依赖
import { initGraph } from "@/assets/js/graph";
import createGraphRules from "@/modules/graph/rules";

// 画布配置项
import { Graph } from "@antv/x6";
import { initGraphParamsI } from "./types";
import graphMap from "./template/graphMap";
import { ValidateConnectionArgs } from "@/modules/graph/types";
// 基础配置项
import commonConfig from "@/modules/graph/template/common";

// 注册画布方法
export function registerGraph({
  templateName,
  container,
  config,
}: initGraphParamsI): Graph {
  const options = {
    container,
  };
  // 使用模板配置进行渲染
  if (templateName) {
    Object.assign(options, graphMap[templateName]);
  } else if (config) {
    // 使用配置项进行渲染
    Object.assign(options, commonConfig, config.options || {}, {
      validateConnection: function (
        this: Graph,
        params: ValidateConnectionArgs
      ) {
        return createGraphRules(config.rules || [], params)();
      },
    });
  }
  return initGraph(options);
}
