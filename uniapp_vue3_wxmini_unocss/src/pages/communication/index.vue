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
        <view w-[100%] h-[100%] relative
          class="indexBgCon">

          <view absolute top-0 left-0 class="pageHeaderBg"></view>
          
          <view w-[100%] h-[100%] z-1 relative >
            <TopNav ref="refTapNav"></TopNav>
            <view w-[100%]
              :style="{height: `calc(100% - ${tapNavHeight}px)`}"
            >
              <view w-[100%] h-232rpx px-32rpx box-border class="pageHeader">
                <view w-[100%] h-88rpx flex items-center justify-between >
                  <h3 text-[#111] font-bold text-36rpx lh-44rpx>通讯录</h3>
                </view>
                <view w-100% h-80rpx my-32rpx >
                  <nut-searchbar v-model="searchValue" placeholder="请输入人员姓名" >
                    <template #rightin>
                      <nut-icon name="search" />
                    </template>
                  </nut-searchbar>
                  
                </view>
              </view>
              <view w-[100%] h-[calc(100%-232rpx)] px-32rpx pl-32rpx pr-16rpx box-border   
                class="pageCon"
              >
                <view w-[100%] h-[100%] pr-16rpx box-border overflow-auto >
                  <image w-[100%] h-auto
                    src="@img/comm/commIndex.png"
                    mode="widthFix"
                    lazy-load
                  />
                  
                </view>
                  
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
  import { useConfigStore } from '@/store/config'
  const {getTabBarHeight,blackLineH} = useConfigStore()

  const refTapNav = ref(null)
  let tapNavHeight = ref(0)

  /* 搜索 */
  let searchValue = ref("")

  /* tab 切换 */
  let curTabIndex = ref("1")

  onMounted(async () => {
    await refTapNav.value.getNavHeight((res)=>{
      if(res.length>=0){
        tapNavHeight.value = res[0].height
      }
    })
  })
</script>

<style scoped lang="scss">
.indexPageCon{
  .indexBgCon{
    background: #F4F6F9;
    .pageHeaderBg{
      width: 100%;
      height: 550rpx;
      background: linear-gradient(180deg, #b9d0ec,#F4F6F9);
    }
    .pageHeader{
      ::v-deep .nut-searchbar{
        padding: 0;
        background: transparent;
        height: 80rpx;
        .nut-searchbar__search-input{
          height: 80rpx;
          background: #fff;
          border-radius: 16rpx;
          .uni-input-placeholder{
            color: #999;
            font-size: 28rpx;
            line-height: 40rpx;
          }
        }
      }
    }
    .pageCon{
    }
  }
}
.test{
}
</style>