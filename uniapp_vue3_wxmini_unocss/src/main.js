import { createSSRApp } from 'vue'
import App from './App.vue'
import TabBar from './components/common/tabbar.vue'
import TopNav from './components/common/topNav.vue'
import { setupStore } from './store'
import 'virtual:uno.css'
export function createApp () {
  const app = createSSRApp(App)
  // 绑定组件
  app.component('TabBar', TabBar)
  app.component('TopNav', TopNav)
  setupStore(app)
  return {
    app
  }
}
