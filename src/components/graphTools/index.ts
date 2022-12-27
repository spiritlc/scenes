import zoom from "./toolZoom.vue";
import fullScreen from "./toolFullScreen.vue";
import save from "./toolSave.vue";
import disabled from "./toolDisabled.vue";
// 静态数据
import {
  TOOL_ZOOM,
  TOOL_FULLSCREEN,
  TOOL_SAVE,
  TOOL_DISABLED,
} from "@/assets/config/constants";

export default {
  [TOOL_ZOOM]: zoom,
  [TOOL_FULLSCREEN]: fullScreen,
  [TOOL_SAVE]: save,
  [TOOL_DISABLED]: disabled,
};
