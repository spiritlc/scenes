<template>
  <div class="home">
    <bpmnMenu v-if="route.name !== 'logicFlowDetail'" :lf="lf"></bpmnMenu>
    <div class="logic-block">
      <div id="logic-flow" ref="flow"></div>
    </div>
    <!-- 属性配置 -->
  </div>
</template>

<script setup lang="ts">
import bpmnMenu from "./bpmnMenu.vue";
import useInitLogicFlow from "./composition/useInitLogicFlow";
import { useRoute } from "vue-router";

const route = useRoute();

// 初始化画布
const graphInstance = useInitLogicFlow();
const lf = graphInstance.lf;
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 97vh;
  display: flex;
}
.logic-block {
  width: 0;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
}
#logic-flow {
  width: 100%;
  height: 100%;
}

.bpmn-example-container {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.graph-io {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  padding: 10px;
  display: flex;
}
.graph-io > span {
  margin: 0 5px;
  cursor: pointer;
}
#upload-xml {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}
.upload {
  position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.upload::-webkit-file-upload-button {
  cursor: pointer;
}
::v-deep(.custom-save) {
  background: url(data:image/png;base64,TTkzMS44ODIgMjU5Ljg4MmwtMTY3Ljc2NC0xNjcuNzY0QTk2IDk2IDAgMCAwIDY5Ni4yMzYgNjRIMTYwQzEwNi45OCA2NCA2NCAxMDYuOTggNjQgMTYwdjcwNGMwIDUzLjAyIDQyLjk4IDk2IDk2IDk2aDcwNGM1My4wMiAwIDk2LTQyLjk4IDk2LTk2VjMyNy43NjRhOTYgOTYgMCAwIDAtMjguMTE4LTY3Ljg4MnpNNjA4IDE2MHYxNjBIMzUyVjE2MGgyNTZ6IG0yNDQgNzA0SDE3MmExMiAxMiAwIDAgMS0xMi0xMlYxNzJhMTIgMTIgMCAwIDEgMTItMTJoODR2MjA4YzAgMjYuNTEgMjEuNDkgNDggNDggNDhoMzUyYzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhWMTY3Ljc2NGwxNTYuNDg2IDE1Ni40ODZhMTIgMTIgMCAwIDEgMy41MTQgOC40ODZWODUyYTEyIDEyIDAgMCAxLTEyIDEyek01MTIgNDY0Yy05Ny4wNDYgMC0xNzYgNzguOTU0LTE3NiAxNzZzNzguOTU0IDE3NiAxNzYgMTc2IDE3Ni03OC45NTQgMTc2LTE3Ni03OC45NTQtMTc2LTE3Ni0xNzZ6IG0wIDI1NmMtNDQuMTEyIDAtODAtMzUuODg4LTgwLTgwczM1Ljg4OC04MCA4MC04MCA4MCAzNS44ODggODAgODAtMzUuODg4IDgwLTgwIDgweg==)
    center center no-repeat;
}
</style>
