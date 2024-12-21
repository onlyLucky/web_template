<!-- 公共组件 顶部导航 1.自定义，无标题，按钮 2. -->
<template>
  <view w-[100%] id="refNav">
    <!-- 顶部电池状态条 -->
    <view w-[100%]
      :style="{height: `${topBatteryH}px`}"
    ></view>
    <!-- nav header -->
    <!-- <view w-[100%] bg-[#F4F6F9] h-80rpx></view> -->
    <view w-[100%] bg-[#F4F6F9] h-88rpx v-show="props.isCustom">
      <slot name="nav"></slot>
    </view>
  </view>
</template>
<script setup>
import {useConfigStore} from "@/store/config"
const {topBatteryH} = useConfigStore()

const props = defineProps({
  isCustom: {
    type: Boolean,
    default: false
  }
})

const instance = getCurrentInstance();
const getNavHeight = async(cb)=>{
  await nextTick()
  uni.createSelectorQuery().in(instance.proxy).select('#refNav').boundingClientRect(rect => {
    if (rect) {
      console.log("#refNav rect: ",rect)
    }
  }).exec(cb)
}
defineExpose({
  getNavHeight
})
</script>
<style scoped lang="scss">
</style>