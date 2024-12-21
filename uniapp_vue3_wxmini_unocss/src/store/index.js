import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

export const piniaStore = createPinia()
piniaStore.use(
  createPersistedState({
    storage: {
      /* eslint-disable */
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync
      /* eslint-enable */
    }
  })
)

export function setupStore (app) {
  app.use(piniaStore)
}
