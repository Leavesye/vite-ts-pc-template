import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import localConfig from './local-config'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  return {
    plugins: [
      vue(), 
      // jsx语法支持
      vueJsx(),
      // mock数据模拟
      viteMockServe({
        mockPath: './mock',
        // 是否开启mock
        localEnabled: localConfig[mode]?.mockEnabled
      }),
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})
