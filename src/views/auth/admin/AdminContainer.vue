<template>
  
</template>

<script setup>
import { authAdminService} from '@/api'
import {ref,onMounted} from 'vue'
import {useUserStore} from '@/store'
import { useRouter } from 'vue-router'

const paginationData=ref({
  pageNum:1,
  pageSize:10
})
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  // 检查 token 是否存在
  console.log('Current token:', userStore.token)
  
  if (!userStore.token) {
    console.error('No token found, redirecting to login...')
    router.push('/login')
    return
  }

  authAdminService(paginationData.value)
    .then(res => {
      console.log('API response:', res)
    })
    .catch(error => {
      console.error('API error:', error)
      if (error.response?.status === 401) {
        // token 无效或过期
        userStore.removeToken()
        router.push('/login')
      }
    })
})

</script>

<style>

</style>