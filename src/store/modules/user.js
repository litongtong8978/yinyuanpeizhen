import { defineStore } from "pinia";
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  const userInfo = ref({})
  const getUser = async () => {
    // 这里应该调用获取用户信息的 API
    // 暂时返回空对象
    return userInfo.value
  }

  const setUserInfo = (obj) => {
    userInfo.value = obj
  }
  const removeUserInfo = () => {
    userInfo.value = {}
  }
  return {
    token,
    setToken,
    removeToken,
    userInfo,
    getUser,
    setUserInfo,
    removeUserInfo
  }
}, {
  persist: true
})
