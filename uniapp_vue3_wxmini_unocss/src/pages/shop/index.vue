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
            <view w-[100%]
              :style="{height: `calc(100% - ${tapNavHeight}px)`}"
            >
              <view w-[100%] h-232rpx px-32rpx box-border class="pageHeader">
                <view w-[100%] h-88rpx mb-32rpx flex items-center justify-between >
                  <image w-308rpx h-44rpx 
                    src="@img/shop/hLogo.png"
                    mode="scaleToFill"
                    lazy-load
                  />
                </view>
                <view w-100% h-80rpx mb-32rpx flex items-center justify-between >
                  <nut-searchbar v-model="searchValue" placeholder="请输入药品、器材名称" >
                    <template #rightin>
                      <nut-icon name="search" />
                    </template>
                  </nut-searchbar>
                  <nut-icon name="cart"></nut-icon>
                </view>
              </view>
              <view w-[100%] h-[calc(100%-232rpx)] py-24rpx pl-32rpx pr-16rpx box-border   
                class="pageCon"
              >
                <view w-[100%] h-[100%] >
                  <image w-[100%] h-126rpx mb-32rpx pr-16rpx box-border 
                    src="@img/shop/indexTab.png"
                    mode="scaleToFill"
                    lazy-load
                  />
                  <view w-[100%] h-[calc(100%-158rpx)] pr-16rpx box-border
                    flex flex-wrap content-start overflow-auto
                    class="shopBox"
                  >
                    <image h-480rpx mb-24rpx mr-24rpx 
                      class="w-[calc((100%-32rpx)/2)] shopItem"
                      src="@img/shop/shop01.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                    <image h-480rpx mb-24rpx mr-24rpx 
                      class="w-[calc((100%-32rpx)/2)] shopItem"
                      src="@img/shop/shop02.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                    <image h-480rpx mb-24rpx mr-24rpx 
                      class="w-[calc((100%-32rpx)/2)] shopItem"
                      src="@img/shop/shop03.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                    <image h-480rpx mb-24rpx mr-24rpx 
                      class="w-[calc((100%-32rpx)/2)] shopItem"
                      src="@img/shop/shop04.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                    <image h-480rpx mb-24rpx mr-24rpx 
                      class="w-[calc((100%-32rpx)/2)] shopItem"
                      src="@img/shop/shop01.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                    <image h-480rpx mb-24rpx mr-24rpx 
                      class="w-[calc((100%-32rpx)/2)] shopItem"
                      src="@img/shop/shop02.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
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
      border-bottom: 2rpx solid #EAEAEA;
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
      ::v-deep .nut-icon-cart{
        width: 40rpx;
        height: 40rpx;
        margin-left: 32rpx;
      }
    }
    .pageCon{
      .shopBox{
        .shopItem{
          &:nth-child(2n){
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>