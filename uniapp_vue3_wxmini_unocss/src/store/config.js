import { piniaStore } from '@/store'
import { defineStore } from 'pinia'

const defineAppConfig = defineStore('AppConfig', {
  state: () => {
    return {
      tabBar: {
        height: 120 // 底部菜单高度 rpx
      },
      blackLineH: 0, // ios 小黑条高度
      topBatteryH: 0 // 顶部电池状态高度
    }
  },
  getters: {
    getTabBarHeight: (state) => state.tabBar.height
  },
  actions: {
    setBlackLineHeight (size) {
      console.log('setBlackLineHeight', size)
      this.blackLineH = size
    },
    setTopStatusHeight (size) {
      console.log('setTopStatusHeight', size)
      this.topBatteryH = size
    }
  },
  persist: false // 配置持久化
})

export function useConfigStore () {
  return defineAppConfig(piniaStore)
}
