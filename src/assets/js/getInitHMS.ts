/*
 * @Descripttion:
 * @version:
 * @Author: mry
 * @Date: 2022-03-22 17:58:54
 * @LastEditors: mry
 * @LastEditTime: 2022-03-22 18:14:49
 */
const initHMS = (num: number, flag: boolean | undefined) => {
  if (typeof flag === "undefined") flag = false;
  const setHMS = new Array(num);
  for (let i = 0; i < num; i++) {
    if (flag && i < 10) {
      setHMS[i] = "0" + i.toString();
    } else {
      setHMS[i] = i.toString();
    }
  }
  return setHMS;
};
export default {
  initHMS,
};
