import NodeModule from ".";
import { watchEffect, watch, ref } from "vue";
import ProductModule from "@/modules/Equipment/ProductModule";

class EquipmentNode extends NodeModule {
  productIn; // 调用的设备实例
  deviceCommand = ref<Array<any>>([]); // 设备命令列表

  constructor(nodeData: any) {
    super(nodeData);
    this.nodeData.value.commandType = nodeData.commandType || "up"; // 默认上报
    this.deviceCommand.value = []; // 初始化命令列表

    this.productIn = new ProductModule(); // 获取依赖的设备模型

    this.getConfig(); // 设备节点获取配置项
    if (this.nodeData.value.componentId) {
      this.getAllCommand();
    }

    // 设备产品类型变化后，获取对应的设备命令
    watch(
      () => this.nodeData.value.componentId,
      () => {
        // 当前有选中产品类型
        if (this.nodeData.value.componentId) {
          this.getAllCommand();
        }
        const productType = this.productIn.getProdTypeById(
          this.nodeData.value.componentId
        );
        this.nodeData.value.stdDesc = productType.prodtypeName;
        this.nodeData.value.prodtypeName = productType.prodtypeName;
        this.nodeData.value.prodtypeCode = productType.prodtypeCode;
        this.nodeData.value.deviceCommand = "";
      }
    );
    // 设备命令变化后，获取对应的命令内容
    watchEffect(() => {
      // 当前有选中产品类型
      const productType = this.productIn.getDeviceCommandById(
        this.nodeData.value.deviceCommand
      );
      this.nodeData.value.deviceCommandName = productType.stdDescription;
      this.nodeData.value.deviceCommandCode = productType.prodtypeCode;
    });
  }

  // 切换类型后清除数据
  resetData() {
    this.nodeData.componentId = "";
  }

  // 获取配置数据
  getConfig() {
    //基础配置项
    if (this.attrTab === "basic") {
      this.productIn.getAllProdType();
    }
  }

  //获取设备命令
  async getAllCommand() {
    // 消息的上报
    if (this.nodeData.value.commandType === "up") {
      await this.productIn.getAllProdtypeCondition(
        this.nodeData.value.componentId
      );
    } else {
      // 消息下发
      await this.productIn.getAllProdtypeAction(
        this.nodeData.value.componentId
      );
    }
    this.deviceCommand.value = this.productIn.deviceCommand.value.map(
      (item) => {
        let description = item.description;
        if (item.type === "deviceSkill") {
          description = "(技)" + item.description;
        } else if (item.type === "skill") {
          description = "(语音)" + item.description;
        }
        return {
          ...item,
          description,
        };
      }
    );
    console.log(this.deviceCommand.value);
  }
}

export default EquipmentNode;
