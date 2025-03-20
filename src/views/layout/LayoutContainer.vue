<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '@/components/aside.vue'
import Header from '@/components/navHeader.vue'
</script>

<style lang="less" scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .el-container {
    height: 100%;
    width: 100%;
    display: flex;
   
    .el-main {
      padding: 0;
      height: calc(100vh - 50px);
      overflow-x: auto;
      background-color: #f5f7fa;
    }
  }
}
</style>