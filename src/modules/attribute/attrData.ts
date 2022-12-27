/**
 * 用于子数据变更时同步父数据
 */
import { watch } from "vue";

// 按照惯例，组合式函数名以“use”开头
export default function useSyncAttrData(emit: any, attrData: object) {
  // 监听数据
  watch(
    attrData,
    () => {
      emit("syncData", attrData);
    },
    { deep: true }
  );
}
