<template>
  <div class="common-block">
    <el-row v-show="!route.meta.hideMenu" class="tac">
      <el-col :span="24">
        <h5 class="mb-2">haigeek</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="changeRouter"
        >
          <el-menu-item index="flow-list">
            <el-icon><icon-menu /></el-icon>
            <span>场景流程</span>
          </el-menu-item>
          <el-menu-item index="descision-group-list">
            <el-icon><document /></el-icon>
            <span>决策组</span>
          </el-menu-item>
          <el-menu-item index="descision-node-list">
            <el-icon><Location /></el-icon>
            <span>决策点</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const changeRouter = (routerName: string) => {
  router.push(routerName);
};
</script>
<style lang="scss" scoped>
.common-block {
  display: flex;
  .el-row {
    flex-shrink: 0;
    margin-right: 20px;
  }
}
</style>
