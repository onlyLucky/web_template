
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import ViewUIPlus from 'view-ui-plus'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  }
})
// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  // 判断有没有登录
  // ViewUIPlus.LoadingBar.start();
  /* if (!localStorage.getItem('token')) {
    if (to.name == "login") {
      next();
    } else {
      // router.push('login')
    }
  } else {
    next();
  } */
  next();
});
router.afterEach((to, from, next) => {
  // ViewUIPlus.LoadingBar.finish()
  console.log(to, 'to')
  window.scrollTo(0, 0)
})

export default router