// 兼容 ?.
export function publicCheckData(arr: Array<any>) {
  let data = arr[0];
  for (let i = 1; i < arr.length; i++) {
    data = data[arr[i]];
    if (!data) {
      return undefined;
    }
  }
  return data;
}
