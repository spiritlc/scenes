<template>
  <div class="pattern">
    <el-collapse v-model="activeCol">
      <el-collapse-item
        v-for="temp in menuData"
        :key="temp.id"
        :title="temp.title"
        :name="temp.id"
      >
        <div
          v-for="item in temp.children"
          :key="item.type"
          class="pattern-item"
        >
          <div
            class="pattern-ins"
            @mousedown="addNode($event, item.type)"
            :class="item.className"
          ></div>
          <div>{{ item.name }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref } from "vue";
import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { createNode } from "@/assets/js/material";

// 依赖注入
const graph = inject("graph") as Ref<Graph>;
const dnd = inject("dnd") as Ref<Dnd>;

// 事件
function addNode(e: MouseEvent, type: string) {
  if (graph && dnd) {
    createNode({
      graph: graph.value,
      dnd: dnd.value,
      event: e,
      options: {
        shape: type, // 节点信息
      },
      data: {},
    });
  }
}

// 物料配置项
const activeCol = ["control", "events", "gateways", "task", "logic"];
// 事件数据
const eventData = [
  {
    name: "开始",
    type: "h-bpmn:startEvent",
    className: "pattern-start",
  },
  // {
  //   name: "时间开始",
  //   type: "h-bpmn:timerIntermediateEvent",
  //   className: "pattern-start",
  // },
  {
    name: "时间事件",
    type: "h-bpmn:timerIntermediateEvent",
    className: "pattern-time",
  },
  {
    name: "结束",
    type: "h-bpmn:endEvent",
    className: "pattern-end",
  },
];
// 任务数据
const taskData = [
  {
    name: "用户任务",
    type: "h-bpmn:userTask",
    className: "pattern-user",
  },
  // {
  //   name: "系统任务",
  //   type: "h-bpmn:serviceTask",
  //   className: "pattern-service",
  // },
  {
    name: "设备状态",
    type: "task-state",
    className: "pattern-equipment-state",
  },
  {
    name: "设备任务",
    type: "task-equipment",
    className: "pattern-equipment",
  },
  {
    name: "服务任务",
    type: "h-bpmn:serviceTask",
    className: "pattern-service",
  },
  // {
  //   name: "接收任务",
  //   type: "h-bpmn:receiveTask",
  //   className: "pattern-receive",
  // },
  // {
  //   name: "接收任务",
  //   type: "h-bpmn:receiveTask",
  //   className: "pattern-receive",
  // },
  {
    name: "调用活动",
    type: "h-bpmn:callActivity",
    className: "pattern-call",
  },
];
const menuData = [
  {
    id: "events",
    title: "事件",
    children: eventData,
  },
  {
    id: "task",
    title: "任务",
    children: taskData,
  },
  {
    id: "logic",
    title: "逻辑",
    children: [
      {
        name: "逻辑或",
        type: "h-bpmn:complexGatewayOr",
        className: "pattern-or",
      },
      {
        name: "逻辑且",
        type: "h-bpmn:complexGatewayAnd",
        className: "pattern-and",
      },
      {
        name: "复杂逻辑",
        type: "h-bpmn:complexGateway",
        className: "pattern-complex",
      },
      {
        name: "条件判断",
        type: "h-bpmn:exclusiveGateway",
        className: "pattern-exclusive",
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.pattern {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  z-index: 111;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  font-size: 12px;
  color: #676768;
  user-select: none;
}
.pattern-item {
  width: 80px;
  margin: 0 5px;
  display: flex;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
::v-deep(.el-collapse-item__content) {
  display: flex;
  flex-wrap: wrap;
}

.pattern-selection {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=)
    center center no-repeat;
  cursor: pointer;
}
.pattern-start {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==)
    center center no-repeat;
}
.pattern-end {
  background: url(../../assets/images/bpmn/end.png) center center no-repeat;
  background-size: 60%;
}
.pattern-user {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==)
    center center no-repeat;
}
.pattern-service {
  background: url(../../assets/images/bpmn/service.png) center center no-repeat;
  background-size: 60%;
}
.pattern-equipment-state {
  background: url(../../assets/images/bpmn/state.png) center center no-repeat;
  background-size: 80%;
}
.pattern-equipment {
  background: url(../../assets/images/bpmn/equipment-task.png) center center
    no-repeat;
  background-size: 80%;
}
.pattern-exclusive {
  background: url(../../assets/images/bpmn/exclusive.png) center center
    no-repeat;
  background-size: 60%;
}
.pattern-parallel {
  background: url(../../assets/images/bpmn/plus.png) center center no-repeat;
  background-size: 60%;
}
.pattern-receive {
  background: url(../../assets/images/bpmn/receive.png) center center no-repeat;
  background-size: 80%;
}
.pattern-call {
  background: url(../../assets/images/bpmn/call.png) center center no-repeat;
  background-size: 70%;
}
.pattern-complex {
  background: url(../../assets/images/bpmn/complex.png) center center no-repeat;
  background-size: 70%;
}
.pattern-time {
  background: url(../../assets/images/bpmn/time.png) center center no-repeat;
  background-size: 70%;
}
.pattern-or {
  background: url(../../assets/images/bpmn/or.png) center center no-repeat;
  background-size: 70%;
}
.pattern-and {
  background: url(../../assets/images/bpmn/and.png) center center no-repeat;
  background-size: 70%;
}

.pattern-ins {
  width: 36px;
  height: 36px;
  opacity: 0.99;
  cursor: grab;
}
</style>
