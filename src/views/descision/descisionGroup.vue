<template>
  <div class="rules-block">
    <div class="common-title">
      <h3>决策组列表</h3>
      <el-button @click="createDescisionGroup">新建决策组</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="决策组名称" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="modifyTime" label="修改时间" width="180" />
      <el-table-column prop="modifyTime" label="是否启用" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            >详情</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="goToEditDescisionGroup(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { descisionNodeItem } from "@/assets/config/types/descision";

const router = useRouter();
// 数据初始化
const tableData = ref(
  JSON.parse(localStorage.getItem("descisionGroupList") || "[]")
);

// 事件处理
// 创建决策点
const createDescisionGroup = () => {
  const name = prompt("请输入决策组名称");
  if (name) {
    tableData.value.push({
      id: `${tableData.value.length + 1}`,
      name,
    });
    localStorage.setItem("descisionGroupList", JSON.stringify(tableData.value));
  }
};
// 跳转到编辑决策页面
const goToEditDescisionGroup = (item: descisionNodeItem) => {
  router.push({
    name: "createDescisionGroup",
    query: { id: item.id, name: item.name },
  });
};

const handleClick = (item: { id: number; name: string }) => {
  router.push({
    name: "rulesDetail",
    query: { id: item.id },
  });
};
</script>

<style lang="scss" scoped>
.rules-block {
  margin: auto;
}
.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
