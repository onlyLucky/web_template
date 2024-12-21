<template>
  <view
    w-[100%] h-[100%] overflow-hidden box-border
    relative
    :style="{paddingBottom: `${blackLineH}px`}"
  >
    <view w-[100%] h-[100%]>
      <view w-[100%] bg-[#F4F6F9]
        class="indexPageCon"
        :style="{height: `calc(100% - ${getTabBarHeight}rpx)`}"
      >
        <view w-[100%] h-[100%]
          class="indexBgCon">

          <view absolute top-0 left-0 class="pageHeaderBg"></view>

          <view w-[100%] h-[100%] z-1 relative >
            <TopNav ref="refTapNav"></TopNav>
            <view w-[100%] class="pageCon"
              :style="{height: `calc(100% - ${tapNavHeight}px)`}"
            >
              <view w-[100%] h-88rpx mb-32rpx px-32rpx box-border flex items-center justify-between >
                <h3 text-[#111] font-bold text-36rpx lh-44rpx>我的</h3>
              </view>
              <view w-[100%] h-[calc(100%-120rpx)] overflow-auto>
                <image w-[100%] h-auto
                  src="@img/user/userIndex.png"
                  mode="widthFix"
                  lazy-load
                />
              </view>
            </view>
          </view>
          

        </view>
      </view>
      <TabBar></TabBar>
    </view>
    
  </view>
</template>
<script setup>
  const wsState = inject('wsNum');
  import { useConfigStore } from '@/store/config'
  const {getTabBarHeight,blackLineH} = useConfigStore()

  const refTapNav = ref(null)
  let tapNavHeight = ref(0)

  onMounted(async () => {
    
    await refTapNav.value.getNavHeight((res)=>{
      if(res.length>=0){
        tapNavHeight.value = res[0].height
      }
    })
  })
  onShow(()=>{
    console.log("onshow")
    console.log("wsState",wsState.value)
  })
</script>

<style scoped lang="scss">
.indexPageCon{
  .indexBgCon{
    background: #F4F6F9;
    .pageHeaderBg{
      width: 100%;
      height: 550rpx;
      background: #fff;
    }
    .pageCon{
    }
  }
}
</style>