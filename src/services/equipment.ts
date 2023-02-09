/**
 * @Description: 用于描述设备相关接口
 * @Author: guocong
 * @Date: 2023-02-06 11:03:10
 * @LastEditTime: 2023-02-06 11:03:10
 * @LastEditors: Please set LastEditors
 */

import { iotRequest } from "@/infrastructure/apis/api";
import {
  getAllProdtypeListApi,
  getProdtypeConditionFunctionListApi,
  getProdtypeActionFunctionListApi,
} from "@/infrastructure/apis/apis";
import requestErrorCatch from "@/infrastructure/requestErrorCatch";
/**
 * getAllProdType 获取所有
 */
export async function queryAllProdType() {
  const res = await iotRequest({
    path: getAllProdtypeListApi,
  });
  return requestErrorCatch({ data: res, defaultRes: [] });
}
/**
 * 获取所有的设备上报命令
 */
export async function queryAllProdtypeCondition(prodtypeId: string) {
  const res = await iotRequest({
    path: getProdtypeConditionFunctionListApi,
    params: {
      prodtypeId,
    },
  });
  return requestErrorCatch({ data: res, defaultRes: [] });
}
/**
 * 获取所有的设备下发命令
 */
export async function queryAllProdtypeAction(prodtypeId: string) {
  const res = await iotRequest({
    path: getProdtypeActionFunctionListApi,
    params: {
      prodtypeId,
    },
  });
  return requestErrorCatch({ data: res, defaultRes: [] });
}
