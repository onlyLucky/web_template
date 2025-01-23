import { createApp } from 'vue'
import "normalize.css"
import './style.css'
import App from './App.vue'
const app = createApp(App)
// 路由设置
import router from '@/router/index'
app.use(router)
import { setupStore } from '@/store'
// 挂载store
setupStore(app);

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入所有的icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
