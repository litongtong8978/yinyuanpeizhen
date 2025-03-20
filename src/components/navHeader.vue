<template>
  <div class="header-container">
     <div class="header-left flex-box">
      <el-icon class="icon" size="20" @click="changeMode"><Fold/></el-icon>
      <ul class="flex-box">
        <li v-for="(item,index) in selectMenu" 
        :key="item.path"
        :class="{selected: route.path===item.path}"
         class="tab flex-box">
        <el-icon size="12">
          <component :is="item.icon"></component>
        </el-icon>
        <router-link class="text flex-box" :to="item.path"> {{ item.name }}</router-link>
      <el-icon class="close" size="12" @click="closeTab(item,index)">
       <Close/>
        </el-icon>
      </li>
      </ul>
     </div>
    <div class="header-right"> 
 <el-dropdown>
   <div class="el-dropdown-link flex-box"> 
     <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <p class="user-name">admin</p>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</div>
  </div>
</template>
<script setup>
import {useMenuStore} from "@/store"
import { useRoute,useRouter } from 'vue-router'
const route=useRoute()
const router=useRouter()
const menuStore = useMenuStore()
const selectMenu=menuStore.selectMenu
const changeMode= () => {
  menuStore.collapseMenu()
}
const closeTab=(item,index)=>{
  menuStore.closeMenu(item)
  if(route.path!==item.path){
    return
  }
//删除最后一项
  if(index===selectMenu.length) {
    if(!selectMenu.length) {
      router.push('/')
    }else{
      router.push({
        path: selectMenu[index-1].path,
      })
    }

  }else{
    //中间项
    router.push(
      {
        path:selectMenu[index].path
      }
    )
  }


}

</script>
<style lang="less" scoped>
.flex-box{
  display: flex;
  align-items: center;
  height: 100%;
  &.space-between {
    justify-content: space-between;
  }
}

.header-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color:white;
  padding-right: 25px;
  .header-left{
    height: 100%;
    .icon{
      width: 45px;
      height: 100%;
    }
    .icon:hover{
      background-color: #f5f5f5;
      cursor: pointer;
    }
    .tab{
      padding: 0 15px;
      height: 100%;
      .text{
        margin:0 10px; 
      }
      .close{
          visibility: hidden;
      }
      &.selected{
        a{
          color:skyblue;
          text-decoration:none;
      
        }
        i{
          color: #409EFF;
        }
        background-color: #ecf5ff;
        border-bottom: 2px solid #409EFF;
      }
    }
    
    .tab:hover {
      background-color: #f5f5f5;
      transition: all 0.3s;
      .close {
        visibility: inherit;
        cursor: pointer;
        color: #333;
      }
    }
  }
  
  .header-right{
    .user-name{
      margin-left: 10px;
    }
  }
  a{
    height: 100%;
    color:#333;
    font-size:15px;
    text-decoration:none
  }
  .header-left {
    .tab:hover {
      background-color: #f5f5f5;
      transition: all 0.3s;
    }
  }
}
</style>