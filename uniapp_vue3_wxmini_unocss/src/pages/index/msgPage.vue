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
                    <view w-40rpx h-40rpx flex items-center justify-center @click="goBack">
                      <view w-24rpx h-24rpx relative rotate="45">
                        <view w-4rpx h-24rpx border-rd-2rpx bg-[#000] absolute top-0 left-0 ></view>
                        <view w-24rpx h-4rpx border-rd-2rpx bg-[#000] absolute bottom-0 left-0 ></view>
                      </view>
                    </view>
                    <view w-308rpx h-[100%] flex items-center justify-between relative class="navTabCenter">
                      <view w-130rpx h-[100%] flex items-center justify-center
                        v-for="(item,index) in navList" :key="index"
                        :class="[index==curNavIndex?'active':'']"
                        @click="switchNavItem(index)"
                      >
                        <view w-130rpx h-48rpx relative >
                          <h3 whitespace-nowrap text-[#999] font-400 text-32rpx lh-44rpx mb-4rpx class="navItemH3">
                            {{item.name}}
                          </h3>
                          <view w-16rpx h-16rpx border-rd-[50%] bg-[#FF5959] absolute top--4rpx right--10rpx 
                            v-show="item.isPoint"
                          ></view>
                        </view>
                        
                      </view>
                      <view w-32rpx h-4rpx border-rd-4rpx bg-[#2085FF] absolute bottom-0 left-0 transition="left duration-0.4s" :style="{left: `${navList[curNavIndex].x}rpx`}"></view>
                    </view>
                    <view>
                      <view w-40rpx h-40rpx flex items-center justify-center ></view>
                    </view>
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
                  <view w-[100%] box-border h-auto border-rd-16rpx bg-[#fff] mb-48rpx class="msgBox">

                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto py-24rpx flex items-center justify-between class="msgItemInfo w-[calc(100%-112rpx)]">
                        <view h-auto class="w-[calc(100%-152rpx)]">
                          <view w-[100%] h-46rpx flex items-center mb-8rpx >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx mr-16rpx 
                              class="msgItemName textEllipsis" 
                            >张爷爷</h3>
                            <nut-tag custom-color="#FFA620" plain>未回复</nut-tag>
                          </view>
                          <text text-[#999] font-400 text-28rpx lh-40rpx class="textEllipsis">3分钟前</text>
                        </view>
                        <nut-button type="info" @click="showCallPopup = true">接听</nut-button>
                      </view>
                    </view>
                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto py-24rpx flex items-center justify-between class="msgItemInfo w-[calc(100%-112rpx)]">
                        <view h-auto class="w-[calc(100%-152rpx)]">
                          <view w-[100%] h-46rpx flex items-center mb-8rpx >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx mr-16rpx 
                              class="msgItemName textEllipsis" 
                            >张爷爷</h3>
                            <nut-tag custom-color="#FFA620" plain>未回复</nut-tag>
                          </view>
                          <text text-[#999] font-400 text-28rpx lh-40rpx class="textEllipsis">3分钟前</text>
                        </view>
                        <nut-button type="info">接听</nut-button>
                      </view>
                    </view>
                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto py-24rpx flex items-center justify-between class="msgItemInfo w-[calc(100%-112rpx)]">
                        <view h-auto class="w-[calc(100%-152rpx)]">
                          <view w-[100%] h-46rpx flex items-center mb-8rpx >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx mr-16rpx 
                              class="msgItemName textEllipsis" 
                            >张爷爷</h3>
                            <nut-tag custom-color="#FFA620" plain>未回复</nut-tag>
                          </view>
                          <text text-[#999] font-400 text-28rpx lh-40rpx class="textEllipsis">3分钟前</text>
                        </view>
                        <nut-button plain type="info">回复</nut-button>
                      </view>
                    </view>
                    
                  </view>

                  <view w-[100%] h-48rpx flex items-center justify-between mb-20rpx >
                    <view flex items-center >
                      <image w-36rpx h-36rpx mr-12rpx
                        src="@img/icons/icon_msg02.png"
                        mode="scaleToFill"
                        lazy-load
                      />
                      <view  flex items-center >
                        <h3 text-[#111] font-bold text-32rpx lh-46rpx >历史呼救</h3>
                        <text text-[#111] font-400 text-24rpx lh-34rpx >（99+）</text>
                      </view>
                      
                    </view>
                  </view>
                  <view w-[100%] box-border h-auto border-rd-16rpx bg-[#fff] mb-48rpx class="msgBox">

                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto py-24rpx flex items-center justify-between class="msgItemInfo w-[calc(100%-112rpx)]">
                        <view h-auto class="w-[calc(100%-152rpx)]">
                          <view w-[100%] h-46rpx flex items-center mb-8rpx >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx mr-16rpx 
                              class="msgItemName textEllipsis" 
                            >张爷爷</h3>
                            <!-- <nut-tag custom-color="#FFA620" plain>未回复</nut-tag> -->
                          </view>
                          <text text-[#999] font-400 text-28rpx lh-40rpx class="textEllipsis">3分钟前</text>
                        </view>
                        <!-- <nut-button type="info">接听</nut-button> -->
                      </view>
                    </view>
                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto py-24rpx flex items-center justify-between class="msgItemInfo w-[calc(100%-112rpx)]">
                        <view h-auto class="w-[calc(100%-152rpx)]">
                          <view w-[100%] h-46rpx flex items-center mb-8rpx >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx mr-16rpx 
                              class="msgItemName textEllipsis" 
                            >张爷爷</h3>
                            <!-- <nut-tag custom-color="#FFA620" plain>未回复</nut-tag> -->
                          </view>
                          <text text-[#999] font-400 text-28rpx lh-40rpx class="textEllipsis">3分钟前</text>
                        </view>
                        <!-- <nut-button type="info">接听</nut-button> -->
                      </view>
                    </view>
                    <view w-[100%] px32rpx box-border flex items-center justify-between  class="msgItem">
                      <view w-80rpx h-80rpx border-rd-[50%] mr-32rpx overflow-hidden flex items-center justify-center >
                        <view w-[100%] h-[100%] bg-[#F4F6F9] ></view>
                      </view>
                      <view h-auto py-24rpx flex items-center justify-between class="msgItemInfo w-[calc(100%-112rpx)]">
                        <view h-auto class="w-[calc(100%-152rpx)]">
                          <view w-[100%] h-46rpx flex items-center mb-8rpx >
                            <h3 text-[#333] font-bold text-32rpx lh-46rpx mr-16rpx 
                              class="msgItemName textEllipsis" 
                            >张爷爷</h3>
                            <!-- <nut-tag custom-color="#FFA620" plain>未回复</nut-tag> -->
                          </view>
                          <text text-[#999] font-400 text-28rpx lh-40rpx class="textEllipsis">3分钟前</text>
                        </view>
                        <!-- <nut-button type="info">接听</nut-button> -->
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

  <!-- 呼救提醒 -->
  <nut-popup position="bottom" closeable round 
    :custom-style="{ height: '560rpx',backgroundColor: 'transparent',paddingBottom: `${blackLineH}px` }"
    @close="onCancelCell"
    v-model:visible="showCallPopup"
  >
    <view w-[100%] h-[100%] relative class="pCallPopup">
      <view w-[100%] h-480rpx absolute bottom-0 left-0 class="pCallBox">
        <view w-[100%] px-40rpx box-border class="pCallCon h-[calc(100%-104rpx)]">
          <h1 w-[100%] h-180rpx text-[#FF5959] font-bold text-56rpx lh-200rpx mb-20rpx >呼救提醒</h1>
          <h3 text-[#111] font-bold text-36rpx lh-52rpx mb-16rpx >张爷爷正在呼救中...</h3>
          <view flex items-center >
            <text text-[#999] font-400 text-28rpx lh-40rpx >已呼救：</text>
            <text text-[#FF5959] font-400 text-28rpx lh-40rpx>00:00:59</text>
          </view>
        </view>
        <view w-[100%] h-104rpx px-32rpx box-border border-t-2rpx border-t-[#F0F0F0] border-t-solid
          flex items-center justify-center 
        >
          <nut-button type="info">接听</nut-button>
        </view>
      </view>
      <image w-240rpx h-240rpx absolute top-0rpx right-80rpx 
        src="@img/index/pCallImg.png"
        mode="scaleToFill"
        lazy-load
      />
      <view w-[100%] bg-[#fff] absolute left-0 
        :style="{height: `${blackLineH}px`,bottom: `-${blackLineH}px`}"
      ></view>
    </view>
  </nut-popup>


</template>
<script setup>
  import { useConfigStore } from '@/store/config'
  const {blackLineH} = useConfigStore()

  const refTapNav = ref(null)
  let tapNavHeight = ref(0)

  /* 搜索 */
  let searchValue = ref("")

  /* nav tab 切换 */
  let curNavIndex = ref(0)
  let navList = ref([
    {
      name: "呼救记录",
      x: 48,
      isPoint: false,
    },
    {
      name: "其他消息",
      x: 228,
      isPoint: true,
    }
  ])

  const switchNavItem = (index)=>{
    curNavIndex.value = index
  }

  const goBack = ()=>{
    uni.navigateBack({
      delta: 1
    })
  }

  /* 呼救提醒 */
  let showCallPopup = ref(false)
  const onCancelCell = ()=>{}

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
    .navTabCenter{
      .active{
        .navItemH3{
          color: #111;
          font-weight: bold;
          background-color: transparent;
        }
      }
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
          .msgItemInfo{
            border-bottom: 2rpx solid rgba(153, 153, 153, .1);
          }
          .msgItemName{
            max-width: calc(100% - 104rpx);
          }
          &:nth-last-child(1){
            .msgItemInfo{
              border-bottom: none;
            }
          }
          ::v-deep .nut-tag{
            width: 88rpx;
            height: 40rpx;
            font-size: 24rpx;
            line-height: 34rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
          }
          ::v-deep .nut-button--info{
            width: 136rpx;
            height: 60rpx;
            border-radius: 60rpx;
            background: #2085FF;
            border: none;
          }
          ::v-deep .nut-button--plain{
            background: transparent;
            color: #2085FF;
            border: 2rpx solid #2085FF;
          }
        }
      }
    }
  }
}
.pCallPopup{
  .pCallBox{
    border-top-left-radius: 32rpx;
    border-top-right-radius: 32rpx;
    background-color: #fff;
    border: 2rpx solid #fff;
    box-sizing: border-box;
    overflow: hidden;
    .pCallCon{
      background: linear-gradient( 180deg, #ffdede 0%, #ffffff 50%);
    }
    ::v-deep .nut-button--info{
      width: 100%;
      height: 72rpx;
      background: #FF5959;
    }
  }
  & + ::v-deep .nut-popup__close-icon{
    color: #333;
    top: 120rpx;
  }
  
}

.test{
}
</style>