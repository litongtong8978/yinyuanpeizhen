import axios from 'axios'
import { useUserStore } from "@/store"
import { ElMessage } from 'element-plus';

const http = axios.create({
  // 通用请求的地址前缀
  // baseURL: 'https://wechatopen.mynatapp.cc/v3pz',
  baseURL: 'https://v3pz.itndedu.com/v3pz',
  // 
  timeout: 10000, // 超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  const whiteUrl = ['/get/code', '/user/authentication', '/login']
  const userStore = useUserStore()

  // 获取请求路径（去除 baseURL）
  const requestPath = config.url.replace(config.baseURL, '')

  // 如果不是白名单接口，需要添加token
  if (!whiteUrl.includes(requestPath)) {
    const token = userStore.token
    if (token) {
      // 使用 X-token 请求头
      config.headers['X-token'] = token
      // console.log('Request headers:', config.headers)
    } else {
      console.warn('No token found for protected route:', requestPath)
      ElMessage.warning('请先登录')
      window.location.href = '/login'
      return Promise.reject('No token found')
    }
  }
  return config;
}, function (error) {
  ElMessage.error('请求配置错误')
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  const { code, message, data } = response.data

  // 添加调试日志
  // console.log('Response data:', response.data)

  // 请求成功
  if (code === 200 || code === 0 || code === 10000) {
    return response;
  }

  // token失效
  if (code === -2) {
    console.warn('Token invalid:', message)
    const userStore = useUserStore()
    userStore.removeToken()
    userStore.removeUserInfo()
    ElMessage.warning(message || 'Token已失效，请重新登录')
    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
    return Promise.reject(message)
  }

  // 其他业务错误
  if (code === -1) {
    ElMessage.warning(message || '操作失败')
    return Promise.reject(message)
  }

  return response;
}, function (error) {
  // 处理网络错误
  let message = ''
  if (error.response) {
    console.error('Error response:', error.response)
    // 服务器返回错误状态码
    switch (error.response.status) {
      case 401:
        message = 'Token已失效，请重新登录'
        const userStore = useUserStore()
        userStore.removeToken()
        userStore.removeUserInfo()
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = '网络连接错误'
    }
  } else if (error.message.includes('timeout')) {
    message = '请求超时'
  } else {
    message = '网络连接错误'
  }

  ElMessage.error(message)
  return Promise.reject(error)
});

export default http