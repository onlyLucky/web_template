<!-- 消息列表 -->
<template>
  <view
    w-[100%] h-[100%] overflow-hidden box-border
    relative
    :style="{paddingBottom: `${blackLineH}px`}"
  >
    <view w-[100%] h-[100%]>
      <view w-[100%] h-[100%] bg-[#F4F6F9]
        class="indexPageCon"
      >
        <view w-[100%] h-[100%] relative
          class="indexBgCon">

          <view absolute top-0 left-0 class="pageHeaderBg" :style="{height: `${tapNavHeight}px`}"></view>
          
          <view w-[100%] h-[100%] z-1 relative >
            <TopNav ref="refTapNav" isCustom >
              <template #nav>
                <view w-[100%] h-88rpx px-32rpx box-border bg-[#fff] >
                  <view w-[100%] h-88rpx flex items-center justify-between >
                    <h3 text-[#111] font-bold text-36rpx lh-44rpx>通讯录</h3>
                  </view>
                </view>
              </template>
            </TopNav>
            <view w-[100%]
              :style="{height: `calc(100% - ${tapNavHeight}px)`}"
            >
              <view w-100% h-144rpx py-32rpx px-32rpx box-border class="pageHeader" >
                <nut-searchbar v-model="searchValue" placeholder="搜索患者姓名" >
                  <template #rightin>
                    <nut-icon name="search" />
                  </template>
                </nut-searchbar>
                
              </view>
              <view w-[100%] h-[calc(100%-144rpx)] px-32rpx pl-32rpx pr-16rpx box-border   
                class="pageCon"
              >
                <view w-[100%] h-[100%] pr-16rpx box-border overflow-auto >
                  <view w-[100%] h-48rpx flex items-center justify-between mb-20rpx >
                    <view flex items-center >
                      <image w-36rpx h-36rpx mr-12rpx
                        src="@img/icons/icon_msg01.png"
                        mode="scaleToFill"
                        lazy-load
                      />
                      <h3 text-[#111] font-bold text-32rpx lh-46rpx >未回复</h3>
                    </view>
                    <view flex items-center >
                      <text text-[#999] font-400 text-24rpx lh-34rpx >更多</text>
                      <image w-28rpx h-28rpx ml-4rpx
                        src="@img/icons/icon_tolb_arrow.png"
                        mode="scaleToFill"
                        lazy-load
                      />
                    </view>
                  </view>
                  <view w-[100%] py-24rpx box-border h-auto border-rd-16rpx bg-[#fff] class="msgBox">
                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto flex items-center justify-between class="w-[calc(100%-112rpx)]">
                        <view >
                          <view flex items-center >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx >张爷爷</h3>
                            <nut-tag custom-color="#FFA620" plain>未回复</nut-tag>
                          </view>
                          <text>正在呼救</text>
                        </view>
                        <nut-button type="info">接听</nut-button>
                      </view>
                    </view>
                  </view>
                </view>
                  
              </view>

            </view> 
          </view>
        </view>
      </view>

    </view>
    
  </view>
</template>
<script setup>
  import { useConfigStore } from '@/store/config'
  const {blackLineH} = useConfigStore()

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
      height: 110rpx;
      background: #fff;
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
      .msgBox{
        .msgItem{
          ::v-deep .nut-button--info{
            width: 136rpx;
            height: 60rpx;
            border-radius: 60rpx;
            background: #2085FF;
            border: none;
          }
        }
      }
    }
  }
}
.test{
}
</style>