// 正确完整的 vite.config.js
import { defineConfig } from 'vite' // 必须导入 defineConfig
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite' // 修复路径拼写错误，原代码缺少 'e'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // 补全 ElementPlusResolver 导入路径

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()] // 移除多余分号
    }),
    Components({
      resolvers: [ElementPlusResolver()] // 移除多余分号
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})