import { createI18n } from 'vue-i18n'
import messages from './index'

const i18n = createI18n({
  fallbackLocale: 'ch',
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale: 'zh',
  messages
})

export default i18n
