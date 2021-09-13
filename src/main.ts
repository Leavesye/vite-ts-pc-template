import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import configI18n from './lang/i18n'
import App from './App.vue'
import BaseTable from '@/components/base/BaseTable/index.vue'

const app = createApp(App)
app.component('BaseTable', BaseTable)
app.use(ElementPlus).use(router).use(store).use(configI18n(app))
app.mount('#app')
