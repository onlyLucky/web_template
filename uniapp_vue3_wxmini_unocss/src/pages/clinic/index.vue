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
                  <image w-260rpx h-50rpx 
                    src="@img/clinic/hLogo.png"
                    mode="scaleToFill"
                    lazy-load
                  />
                </view>
                <view w-[100%] h-80rpx my-32rpx flex items-center justify-between >
                  <nut-searchbar v-model="searchValue" placeholder="症状、疾病、医生名" >
                    <template #rightin>
                      <nut-icon name="search" />
                    </template>
                  </nut-searchbar>
                  <image w-40rpx h-40rpx shrink-0 ml-32rpx 
                    src="@img/icons/icon_record.png"
                    mode="scaleToFill"
                  />
                </view>
              </view>
              <view w-[100%] h-[calc(100%-232rpx)] px-32rpx pl-32rpx pr-16rpx box-border   
                class="pageCon"
              >
                <view w-[100%] h-[100%] pr-16rpx box-border overflow-auto >
                  <image w-[100%] h-234rpx mb-24rpx 
                    src="@img/clinic/indexAd.png"
                    mode="scaleToFill"
                    lazy-load
                  />
                  <image w-[100%] h-382rpx mb-24rpx 
                    src="@img/clinic/indexTab.png"
                    mode="scaleToFill"
                    lazy-load
                  />

                  <view w-[100%] h-auto relative>
                    <view w-[100%] h-240rpx absolute top-0 left-0 class="tabConBg"></view>
                    <view w-[100%] px-32rpx pt-32rpx box-border flex items-center z-1 relative
                    >
                      <h3 text-[#111] font-bold text-32rpx lh-46rpx mr-12rpx >找专家</h3>
                      <text text-[#999] font-400 text-24rpx lh-34rpx>知名专家 权威诊疗</text>
                    </view>
                    <view class="TabsComps">
                      <nut-tabs v-model="curTabIndex" custom-color="#2085FF" swipeable title-scroll title-gutter="10" :ellipsis="false">
                        <nut-tab-pane title="泌尿科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="消化内科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="中医科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="全科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="神经内科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="眼科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="骨科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="普外科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="呼吸科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                        <nut-tab-pane title="心血管内科">
                          <view w-[100%] h-auto >
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor01.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                            <image w-[100%] h-460rpx mb-24rpx 
                              src="@img/clinic/doctor02.png"
                              mode="scaleToFill"
                              lazy-load
                            />
                          </view>
                        </nut-tab-pane>
                      </nut-tabs>
                    </view>

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
      .tabConBg{
        background: linear-gradient(180deg, #fefefe,#F4F6F9);
        border-top-left-radius: 16rpx;
        border-top-right-radius: 16rpx;
      }
      .TabsComps{
        ::v-deep .nut-tabs{
          .nut-tabs__titles{
            height: 116rpx;
            .nut-tabs__list{
              .nut-tabs__titles-item{
                color: #999;
                font-size: 28rpx;
                font-weight: 400;
                line-height: 40rpx;
                &.nut-tabs-active{
                  color: #111;
                }
                .nut-tabs__titles-item__line{
                  width: 32rpx;
                  bottom: 28rpx;
                }
              }
            }
          }
          .nut-tabs__content{
            .nut-tab-pane{
              padding: 0;
              background: transparent;
            }
          }
        }
      }
    }
  }
}
.test{
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
}
</style>