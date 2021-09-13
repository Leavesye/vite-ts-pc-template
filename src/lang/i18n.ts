import { createI18n } from 'vue-i18n'
import messages from './index'

export default function configI18n(app) {
  const i18n = createI18n({
    fallbackLocale: 'zh',
    globalInjection: true,
    legacy: false,
    locale: 'zh',
    messages
  })
  return i18n
}
