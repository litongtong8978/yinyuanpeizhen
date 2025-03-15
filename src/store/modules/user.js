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

  }
  const setUser = (obj) => {
  }

  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
}, {
  persist: true
})
