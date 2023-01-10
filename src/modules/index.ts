import { ComponentConfig } from "@/assets/config/types/component";
import registerMaterial from "@/modules/material/index";
import { getPortConfig } from "@/modules/port/index";
import { Node } from "@antv/x6";

// 注册组件方法
export default function registerComponent(
  componentConfigs: Array<ComponentConfig>
) {
  componentConfigs.forEach((config) => {
    console.log("reee", config);
    const options: Node.Properties = {};
    // 链接桩属性
    options.ports = getPortConfig({
      portTemplates: config.port?.templates || [],
    });
    options.name = config.name;
    console.log(options.ports);
    const shapeConfig = config.shape;
    registerMaterial([{ template: shapeConfig.template, options }]); // 注册当前节点
  });
}
