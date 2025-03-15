import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMenuStore = defineStore('menu', () => {
  const isCollapse = ref(false)
  const selectMenu = ref([])
  const collapseMenu = () => {
    isCollapse.value = !isCollapse.value
  }
  const addMenu = (payload) => {
    if (selectMenu.value.findIndex(item => item.path === payload.path) === -1) { selectMenu.value.push(payload) }
  }
  const closeMenu = (payload) => {
    const index = selectMenu.value.findIndex(item => item.name === payload.name)
    selectMenu.value.splice(index, 1)

  }
  return {
    selectMenu,
    collapseMenu,
    isCollapse,
    addMenu,
    closeMenu
  }
})