<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive,onBeforeUnmount} from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {getCodeService,authenticationService,loginService} from "@/api"
import {useUserStore} from '@/store'
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
  userName: '',
  passWord: '',
  validCode: '',
})
const userStore=useUserStore()
const router = useRouter()


// 账号校验规则
const validateUser = (rule, value, callback) => {
  // 不能为空
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const reg = /^1[3-9]\d{9}$/
    reg.test(value) ? callback() : callback(new Error('手机号格式不对,请输入正确手机号'))
  }
}

// 密码校验规则
const validatePass = (rule, value, callback) => {
  // 不能为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/
    reg.test(value) ? callback() : callback(new Error('密码格式不对,需要4到16位字母/数字/下划线/减号'))
  }
  
}
const rules = reactive({
  userName: [{ validator: validateUser, trigger: 'blur' }],
  passWord: [{ validator: validatePass, trigger: 'blur' }],
  // 在rules中添加验证码规则
   validCode: [
  { required: true, message: '请输入验证码', trigger: 'blur' },
  { len: 4, message: '验证码必须为4位', trigger: 'blur' }
]
})

//判断手机号和验证码是否正确
const validFn= ()=> {
      if (!/^1[3-9]\d{9}$/.test(formModel.value.userName)) {
        ElMessage.error('请输入正确手机号')
        return false
      }
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
  getCodeService({tel:formModel.value.userName}).then(({data})=>{
    console.log(data);
  }
)
}

const register = async () => {
  try {
    await form.value.validate()
    const res = await authenticationService(formModel.value)
    console.log('注册响应:', res.data)
    
    if(res.data.code === 10000) {
      const { token, userInfo } = res.data.data
      // 直接使用原始 token，不添加任何前缀
      userStore.setToken(token)
      userStore.setUserInfo(userInfo)
      
      ElMessage({
        message: '注册成功',
        type: 'success',
        plain: true,
      })
      isRegister.value = false
    } else {
      ElMessage.error(res.data.message || '注册失败')
    }
  } catch (error) {
    console.error('注册错误:', error)
    ElMessage.error('注册失败，请重试')
  }
}

const login = async () => {
  try {
    await form.value.validate()
    const res = await loginService(formModel.value)
    console.log('服务器响应:', res.data)
    
    if (res.data.code === 10000) {
      const { token, userInfo } = res.data.data
      // 直接使用原始 token，不添加任何前缀
      userStore.setToken(token)
      userStore.setUserInfo(userInfo)
      
      // 打印调试信息
      console.log('Token:', token)
      console.log('UserInfo:', userInfo)
      
      ElMessage({
        message: '登录成功',
        type: 'success',
        plain: true,
      })
      router.push('/dashboard')
    } else {
      ElMessage.error(res.data.message || '登录失败')
    }
  } catch (error) {
    console.error('登录错误:', error)
    ElMessage.error('登录失败，请重试')
  }
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
        <el-form-item prop="userName">
          <el-input
            v-model="formModel.userName"
            :prefix-icon="User"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="formModel.passWord"
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
        <el-form-item prop="userName">
          <el-input
            v-model="formModel.userName"
            :prefix-icon="User"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="formModel.passWord"
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


