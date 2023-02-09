<template>
  <div class="basic-node">
    <div class="node-type">
      <img src="@/assets/images/bpmn/equipment-task.png" alt="" />
      <span>消息上报</span>
    </div>
    <div class="node-content">
      <div class="equipment-title">{{ nodeData.prodtypeName }}</div>
      <div class="equipment-command">{{ nodeData.deviceCommandName }}</div>
    </div>
    <div class="equipment-describe">命令参数：{{ nodeData.command }}</div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import { Node } from "@antv/x6";

const getNode = inject("getNode") as () => Node;

const node = getNode(); // 获取当前节点

const nodeData = ref(node.data);
node.on("change:data", ({ current }) => {
  console.log("change data");
  nodeData.value = current;
});
</script>

<style lang="scss" scoped>
.basic-node {
  background: #fff;
  border-radius: 4px;
}
.node-type {
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: bold;
  }
  img {
    margin-right: 10px;
  }
}
.node-content {
  display: flex;
  width: max-content;
  margin-top: 10px;
  .equipment-command {
    margin: 0 30px;
  }
  div {
    flex-shrink: 0;
  }
}
.basic-node__desc {
  display: flex;
}
.basic-node__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
