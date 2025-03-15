<template>
 <el-menu
        :style="{ width: isCollapse ? '64px' : '230px' }"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse" 
      >
      <p class="logo-lg">{{ isCollapse ? '' : 'DIDI陪诊'}}</p>
       <TreeMenu :index="'1'" :menuData=menuData></TreeMenu>
       
      </el-menu>
</template>
<script setup>
import TreeMenu from "@/components/treeMenu.vue"
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import {useMenuStore} from "@/store"
const menuStore = useMenuStore()
const  isCollapse  = menuStore.isCollapse

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
  transition: width 0.3s linear;
  .logo-lg{
     font-size: 20px;
     text-align: center;
     height: 50px;
     line-height: 50px;
     color: aliceblue;
  }

}
</style>