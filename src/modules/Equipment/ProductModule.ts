import {
  queryAllProdType,
  queryAllProdtypeCondition,
  queryAllProdtypeAction,
} from "@/services/equipment";
import { ref } from "vue";
import { commandType } from "./constants";

/**
 * 设备模型，用于描述设备相关的数据和行为
 */
class ProductModule {
  productTypeArr = ref<Array<any>>([]); // 设备产品类型
  deviceCommand = ref<Array<any>>([]); // 设备命令列表

  // 设备消息类型
  commandTypeMap = commandType;

  // 获取设备所有的相关产品类型
  getAllProdType() {
    queryAllProdType().then((res: Array<any>) => {
      this.productTypeArr.value = res;
    });
  }
  // 通过id获取产品类型数据
  getProdTypeById(id: string) {
    return this.productTypeArr.value.filter((item) => item.id === id)[0] || {};
  }
  // 获取设备上报命令列表
  async getAllProdtypeCondition(id: string) {
    this.deviceCommand.value = await queryAllProdtypeCondition(id);
  }
  // 获取设备下发命令列表
  async getAllProdtypeAction(id: string) {
    this.deviceCommand.value = await queryAllProdtypeAction(id);
  }
  getDeviceCommandById(id: string) {
    return this.deviceCommand.value.filter((item) => item.id === id)[0] || {};
  }
}

export default ProductModule;
