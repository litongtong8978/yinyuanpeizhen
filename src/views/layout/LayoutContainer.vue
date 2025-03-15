
<template>
  <div class="common-layout">
    <el-container>
     <Aside></Aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
         <Header></Header>
        <!-- <el-main>Main</el-main> -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script  setup>
import Aside from '@/components/aside.vue'
import Header from '@/components/navHeader.vue'

</script>
<style lang="less" scoped>
.common-layout{
height: 100%;
.el-container{
  height: 100%;}
  
}
</style>