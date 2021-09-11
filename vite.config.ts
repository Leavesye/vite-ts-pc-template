import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(), 
      // jsx语法支持
      vueJsx(),
      // mock数据模拟
      viteMockServe({
        // default
        mockPath: 'mock',
        // 是否开启mock
        localEnabled: true,
      }),
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})
