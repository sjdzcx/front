import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { //别名
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.json', '.vue'] //自动寻找的后缀名称
  }
})
