/**
 * @Description: 本地存储
 */
const PREFIX = import.meta.env.VITE_APP_PREFIX

/* eslint-disable */
const storage = {
  local: {
    has: (key) => {
      return !!uni.getStorageSync(`${PREFIX}${key}`)
    },
    get: (key) => {
      return uni.getStorageSync(`${PREFIX}${key}`)
    },
    set: (key, value) => {
      uni.setStorageSync(`${PREFIX}${key}`, value)
    },
    remove: (key) => {
      uni.removeStorageSync(`${PREFIX}${key}`)
    },
    clear: () => {
      uni.clearStorageSync()
    }
  }
}
/* eslint-enable */

export default storage
