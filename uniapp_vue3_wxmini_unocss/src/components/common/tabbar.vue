<!-- 公共组件 底部公共菜单 -->
<template>
  <view 
    w-[100%] px-10rpx py-0 box-border overflow-hidden
    border-t-1rpx border-t-solid border-t-[#f0f0f0]
    flex items-center justify-between
    bg-#fff
    :style="{height: `${getTabBarHeight}rpx`}"
  >
    <view 
      flex flex-col items-center justify-center
      :style="{width: `${getTabBarHeight}rpx`,height: `${getTabBarHeight}rpx`}"
      v-for="(item,index) in tabList" :key="index"
      @click="goTabPage(index)"
    >
      <image 
        w-48rpx h-48rpx mb-4rpx
        :src="index==current?item.selectedIconPath:item.iconPath"
        mode="aspectFit"
        lazy-load
      />
      <text
        h-24rpx lh-28rpx
        text-20rpx text-center text-[#666]
        :style="{color: index==current?'#2085FF':'#666'}"
      >{{item.text}}</text>
    </view>
  </view>
  
</template>
<script setup>
  import {useConfigStore} from "@/store/config"
  let pages = getCurrentPages(); // 获取当前页面栈的实例
  let currentPage = pages[pages.length - 1]; // 当前页面的实例
  let currentRoute = currentPage.route; // 获取当前页面的路由
  
  const { getTabBarHeight } = useConfigStore()
  
  let current = ref(0)
  const tabList = ref([
    {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "../../static/images/navbar/index.png",// require 在setup 无效  import 引入需要好几次引用
      "selectedIconPath": "../../static/images/navbar/index_active.png"
    },
    {
      "pagePath": "pages/clinic/index",
      "text": "诊疗",
      "iconPath": "../../static/images/navbar/clinic.png",
      "selectedIconPath": "../../static/images/navbar/clinic_active.png"
    },
    {
      "pagePath": "pages/shop/index",
      "text": "商城",
      "iconPath": "../../static/images/navbar/shop.png",
      "selectedIconPath": "../../static/images/navbar/shop_active.png"
    },
    {
      "pagePath": "pages/communication/index",
      "text": "通讯",
      "iconPath": "../../static/images/navbar/comm.png",
      "selectedIconPath": "../../static/images/navbar/comm_active.png"
    },
    {
      "pagePath": "pages/user/index",
      "text": "我的",
      "iconPath": "../../static/images/navbar/user.png",
      "selectedIconPath": "../../static/images/navbar/user_active.png"
    }
  ])
  const setCurrent = ()=>{
    let index = tabList.value.findIndex(menu=>menu.pagePath==currentRoute)
    current.value = index>=0?index:0
    // console.log("setCurrent: ",current.value)
  }
  setCurrent()


  const props = defineProps({
    // 当前选中下标
    index: {
      type: Number,
      default: 0
    }
  })
  const goTabPage = (index)=>{
    if(index == current.value) return
    let url = '/'+tabList.value[index].pagePath
    uni.switchTab({
      url
    })
  }
</script>
<style scoped lang="scss">
</style>