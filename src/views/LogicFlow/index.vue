<template>
  <div class="logicFlow-list-block">
    <div class="common-title">
      <h3>场景列表</h3>
      <el-button @click="goToCreateScene">新建场景</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="场景名称" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="modifyTime" label="修改时间" />
      <el-table-column prop="creater" label="创建人" />
      <el-table-column fixed="right" label="操作">
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
            @click="editScene(scope.row)"
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

const router = useRouter();

const tableData = ref(
  JSON.parse(
    localStorage.getItem("logicList") || '[{"id":0,"name":"汽车生产"}]'
  )
);
localStorage.setItem("logicList", JSON.stringify(tableData.value));

type sceneDataType = { id: number; name: string };
// 事件
// 跳转到创建场景
const goToCreateScene = () => {
  const name = prompt("请输入场景名称");
  if (name) {
    // 创建新场景
    tableData.value.push({
      id: tableData.value.length,
      name,
    });
    localStorage.setItem("logicList", JSON.stringify(tableData.value));
  }
};
// 编辑场景
const editScene = (item: sceneDataType) => {
  router.push({
    name: "createLogicFlow",
    query: { id: item.id, name: item.name },
  });
};
const handleClick = (item: { id: number; name: string }) => {
  router.push({
    name: "logicFlowDetail",
    query: { id: item.id },
  });
};
</script>

<style lang="scss" scoped>
.logicFlow-list-block {
  margin: auto;
  padding: 40px;
}
.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
