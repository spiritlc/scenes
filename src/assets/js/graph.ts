/**
 * 画布相关的方法
 */
import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Export } from "@antv/x6-plugin-export";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import {
  initKeyCopy,
  initKeyPaste,
  initKeyCut,
  initKeyUndo,
  initKeyRedo,
} from "./keyEvent";
import { Selection } from "@antv/x6-plugin-selection"; // 获取选中
import { Clipboard } from "@antv/x6-plugin-clipboard"; // 复制粘贴
import { History } from "@antv/x6-plugin-history"; // 历史记录

/**
 * 初始化画布
 * @param { object } options
 */
export const initGraph = (options: object): Graph => {
  const graph: Graph = new Graph(options);
  // 是否启用对其线
  graph.use(
    new Snapline({
      enabled: true,
    })
  );
  // 开启选中
  graph.use(
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    })
  );
  // 开启复制粘贴功能
  graph.use(
    new Clipboard({
      enabled: true,
    })
  );
  // 开启键盘快捷键
  graph.use(
    new Keyboard({
      enabled: true,
    })
  );
  // 开启历史记录
  graph.use(
    new History({
      enabled: true,
    })
  );
  graph.use(new Export()); // 导出功能
  return graph;
};

/**
 * 添加画布快捷键
 * @param { Array } keyArr
 */
export const initKeyboard = (graph: Graph, keyArr: Array<string>) => {
  keyArr.forEach((item) => {
    switch (item) {
      case "copy":
        initKeyCopy(graph);
        break;
      case "paste":
        initKeyPaste(graph);
        break;
      case "cut":
        initKeyCut(graph);
        break;
      case "undo":
        initKeyUndo(graph);
        break;
      case "redo":
        initKeyRedo(graph);
        break;
      default:
        break;
    }
  });
};
