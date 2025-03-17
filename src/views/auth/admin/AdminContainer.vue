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
onMounted(()=>{
  authAdminService(paginationData.value).then(res=>{
    console.log(res)
  })
  
})

</script>

<style>

</style>