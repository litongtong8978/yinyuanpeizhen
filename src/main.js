import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import pinia from '@/store/index'



import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)


// 如果您正在使用CDN引入，请删除下面一行。

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)
app.mount('#app')

