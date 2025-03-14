<template>
 <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
      <p class="logo-lg">DIDI陪诊</p>
       <TreeMenu :index="'1'" :menuData=menuData></TreeMenu>
       
      </el-menu>
</template>
<script setup>
import TreeMenu from "@/components/treeMenu.vue"
import {useRouter} from 'vue-router'
import {reactive,ref} from 'vue'
const router=useRouter()
// console.log(router)
// const menuData=reactive(router.options.routes[0].children)
const menuData=ref(router.options.routes[0].children)
// console.log(menuData);
// console.log(menuData.value);
const handleOpen=()=>{}
const handleClose=()=>{}
</script>
<style  lang="less" scoped>
.aside-container{
  height: 100vh;
  .logo-lg{
     font-size: 20px;
     text-align: center;
     height: 50px;
     line-height: 50px;
     color: aliceblue;
  }

}
</style>