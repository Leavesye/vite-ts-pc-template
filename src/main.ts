import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './lang/i18n'
import App from './App.vue'
import BaseTable from '@/components/base/BaseTable/index.vue'

const app = createApp(App)

app.component('BaseTable', BaseTable)
app.use(ElementPlus).use(router).use(store).use(i18n)
app.mount('#app')
