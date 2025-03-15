<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive,onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {getCodeService} from "@/api"
const imgUrl=new URL('../../../public/login-head.png',import.meta.url).href
const form = ref()
const timer=ref()
const isRegister = ref(false)
const countdown=reactive({
  validText:'获取验证码',
  time:60
})
let flag=false
const formModel = ref({
  username: '',
  password: '',
  validCode: '',
})
const validateUser = (rule, value, callback) => {
  // 不能为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^1[3-9]\d{9}$/
    reg.test(value) ? callback() : callback(new Error('手机号格式不对,请输入正确手机号'))
  }
}
const validatePass = (rule, value, callback) => {
  // 不能为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/
    reg.test(value) ? callback() : callback(new Error('密码格式不对,需要4到16位字母/数字/下划线/减号'))
  }
  
}

const rules = {
  userName: [{ validator: validateUser, trigger: 'blur' }],
  passWord: [{ validator: validatePass, trigger: 'blur' }],
}


const validFn= ()=> {
      if (!/^1[3-9]\d{9}$/.test(formModel.value.username)) {
        ElMessage.error('请输入正确手机号')
        return false
      }
      // if (/^\w{4}$/.test(formModel.value.validCode)) {
      //   ElMessage.error('请输入正确验证码')
      //   return false
      // }
      return true
}
const countdownChange=()=>{
 if (flag) {return}
 if(validFn()){  
  
  timer.value = setInterval(() => {
    if (countdown.time <= 0) {
      countdown.validText = '获取验证码'
      countdown.time = 60
      flag = false
      clearInterval(timer.value)
    } else {
      countdown.time -= 1
      countdown.validText = `剩余${countdown.time}s`
    }
  }, 1000)
  flag = true
  console.log('发送短信')}
  getCodeService({tel:formModel.username}).then(({data})=>{
    console.log(data);
  }

  )
}

const register=()=>{
  console.log("1");
}
const login=()=>{
  console.log("2")
}


onBeforeUnmount(()=>{
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" >
      <img :src="imgUrl" alt="">
      <img :src="imgUrl" alt="">
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="validCode">
          <el-input
            v-model="formModel.validCode"
            :prefix-icon="Lock"
            placeholder="验证码"
          >
          <template #append>
                <span @click="countdownChange">{{countdown.validText}}</span>
           </template>
        </el-input>
          
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input :prefix-icon="View" placeholder="确认密码"></el-input>
        </el-form-item> -->
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>


