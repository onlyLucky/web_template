import { createI18n } from 'vue-i18n';
// import { localRead } from '@/libs/util'
import customZhCn from './lang/zh-CN'
import customEnUs from './lang/en-US'

// const zh = require('view-ui-plus/dist/locale/zh-CN') || {}; 这个会报错
// const en = require('view-ui-plus/dist/locale/en-US') || {};
import zh from "view-ui-plus/dist/locale/zh-CN";
import en from "view-ui-plus/dist/locale/en-US";

// 自动根据浏览器系统语言设置语言
const navLang: string = navigator.language
// const localLang: boolean = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
// let lang = localLang || localRead('local') || 'zh-CN'

const messages = {
  'zh-CN': Object.assign(zh, customZhCn),
  'en-US': Object.assign(en, customEnUs)
}
const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: 'zh-CN',
  messages
});


export default i18n
