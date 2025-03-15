import axios from 'axios'
import { useUserStore } from "@/store"
import { ElMessage } from 'element-plus';
const http = axios.create({
  // 通用请求的地址前缀
  baseURL: 'https://wechatopen.mynatapp.cc/v3pz',
  // baseURL: 'https:/v3pz.itndedu.com/v3pz',

  timeout: 10000, // 超时时间
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const userStore = useUserStore()
  const whiteUrl = ['/get/code', '/user/authentication', '/login']
  if (userStore.token && !whiteUrl.includes(config.url)) {
    config.headers['X-token'] = userStore.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.code === -1) {
    ElMessage.warning(response.data.message)
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default http