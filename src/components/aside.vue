<template>
 <div class="aside-wrapper">
   <el-menu
        :style="{width:!isCollapse ? '230px':'64px'}"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse" 
      >
      <div class="logo-container">
        <p class="logo-lg" :class="{ 'collapsed': isCollapse }"> {{ isCollapse ? '' : 'DIDI陪诊'}}</p>
      </div>
      <TreeMenu :index="'1'" :menuData="menuData"></TreeMenu>
    </el-menu>
 </div>
</template>
<script setup>
import TreeMenu from "@/components/treeMenu.vue"
import {useRouter} from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import {useMenuStore} from "@/store"

const menuStore = useMenuStore()
// 使用 computed 来确保响应式连接
const isCollapse = computed(() => menuStore.isCollapse)
const router = useRouter()
const menuData = ref([])

onMounted(() => {
  // 确保获取到根路由的子路由
  const rootRoute = router.options.routes.find(route => route.path === '/')
  if (rootRoute && rootRoute.children) {
    menuData.value = rootRoute.children
  }
})

const handleOpen = () => {}
const handleClose = () => {}
</script>
<style lang="less" scoped>
.aside-wrapper {
  height: 100vh;
  overflow: hidden;
  
  .aside-container {
    height: 100%;
    border: none;
    transition: width 0.3s ease-in-out;
  }

  .logo-container {
    padding: 0 20px;
    height: 50px;
    background-color: #545c64;
    overflow: hidden;
    .logo-lg {
      font-size: 20px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: aliceblue;
      margin: 0;
      transition: all 0.3s ease-in-out;
      white-space: nowrap;
      overflow: hidden;
      transform-origin: left;
      transform: scaleX(1);
      opacity: 1;

      &.collapsed {
        transform: scaleX(0);
        opacity: 0;
      }
    }
  }

  :deep(.el-menu) {
    border-right: none;
  }

  :deep(.el-sub-menu) {
    .el-sub-menu__title {
      transition: all 0.3s ease-in-out;
    }
  }

  :deep(.el-menu-item) {
    transition: all 0.3s ease-in-out;
  }
}
</style>
