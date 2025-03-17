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

  const user = ref({})
  const getUser = async () => {
    user.value = res.data.data

  }
  const setUser = (obj) => {
    user.value = obj
  }
  const setUserInfo = (obj) => {
    user.userInfo = obj

  }
  const removeUserInfo = () => {
    user.userInfo = {}
  }
  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser,
    setUserInfo,
    removeUserInfo

  }
}, {
  persist: true
})
