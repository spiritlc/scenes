import type { Graph } from "@antv/x6";

// 复制
export const initKeyCopy = (graph: Graph) => {
  // copy
  graph.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
};
// 粘贴
export const initKeyPaste = (graph: Graph) => {
  graph.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });
};
// 剪切
export const initKeyCut = (graph: Graph) => {
  graph.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });
};
export const initKeyUndo = (graph: Graph) => {
  // undo redo
  graph.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.canUndo()) {
      graph.undo();
    }
    return false;
  });
};
export const initKeyRedo = (graph: Graph) => {
  // undo redo
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.canRedo()) {
      graph.redo();
    }
    return false;
  });
};
