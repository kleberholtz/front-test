import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import pt_br from './lang/pt-br.json'
import { themeConfig } from 'configs/theme.config'

const resources = {
    en: {
        translation: en
    },
    ptBr: {
        translation: pt_br
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: themeConfig.locale,
    lng: themeConfig.locale,
    interpolation: {
        escapeValue: false
    }
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
    ptBr: () => import('dayjs/locale/pt-br'),
}

export default i18n