type requestErrorCatchParams = {
  openErrorModel?: boolean;
  openCorrectModel?: boolean;
  dataKey?: string;
  defaultRes?: object | Array<any> | null;
  data: any;
};

import { ElMessage } from "element-plus";

/**
 * 获取
 * @param { requestErrorCatchParams }
 */

export default function requestErrorCatch({
  openErrorModel = true,
  openCorrectModel = false,
  data,
  defaultRes = {},
  dataKey = "data",
}: requestErrorCatchParams) {
  // const errorInfoKey = ["retInfo"];
  const retCodeArr = ["00000"];
  console.log(data);

  if (retCodeArr.indexOf(data.retCode) > -1) {
    openCorrectModel
      ? ElMessage({ type: "success", message: data.retInfo })
      : null;
    return data[dataKey];
  } else {
    openErrorModel ? ElMessage({ type: "error", message: data.retInfo }) : null;
    return defaultRes;
  }
}
