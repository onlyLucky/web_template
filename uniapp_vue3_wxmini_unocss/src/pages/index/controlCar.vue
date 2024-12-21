<!-- 控制小车 -->
<template>
  <view
    w-[100%] h-[100%] overflow-hidden box-border
    relative
    :style="{paddingBottom: `${blackLineH}px`}"
  >
    <view w-[100%] h-[100%] px-32rpx py-32rpx box-border bg-[#F4F6F9] class="ctrlPage">
      <view w-[100%] h-[100%] overflow-auto >
        <!-- rtmp video 微信真机可行-->
        
        <view w-[100%] h-440rpx bg-[#fff] mb-32rpx >
          <!-- #ifdef MP-WEIXIN -->
          <live-player w-[100%] h-440rpx src="rtmp://test.chinapaperless.com:1936/live/livestream1106" mode="RTC"	autoplay @statechange="onPlayStatechange" @error="onPlayerError" />
          <!-- #endif -->
          <!-- #ifdef H5 -->
          <view w-[100%] h-440rpx bg-[#000] flex items-center justify-center >
            <text text-[#fff] font-400 text-24rpx lh-34rpx >正在开发中...</text>
          </view>
          <!-- #endif -->
        </view>
        <!-- 遥控器 -->
        <view flex items-center mb-16rpx>
          <image w-36rpx h-36rpx mr-6rpx
            src="@img/icons/icon_ctrl_device.png"
            mode="scaleToFill"
          />
          <h3 font-500 text-32rpx lh-46rpx text-[#333] >遥控器</h3>
        </view>
        <!-- <view w-[100%] flex items-center justify-center >
          <view relative>
            <image w-640rpx h-640rpx
              src="@img/index/control_car.png"
              mode="scaleToFill"
            />
            <view></view>
          </view>
        </view> -->
        <!-- 遥控器 -->
        <view w-[100%] flex items-center justify-center >
          <view w-480rpx h-480rpx border-rd-[100%] relative mt-96rpx 
            class="clicker"
          >
            <view w-440rpx h-440rpx border-rd-[100%] bg-[#ecf0f3] overflow-hidden
              absolute top-20rpx left-20rpx 
              flex items-center justify-center
              class="clickerCon"
            >
            <!--  -->
              <view w-440rpx h-440rpx flex flex-wrap rotate="45" class="ctrlDirection">
                <view w-220rpx h-220rpx box-border border-2rpx border-solid border-[#C3C8CE] bg-[#ecf0f3] 
                  flex items-center justify-center 
                  class="ctrlDirectionItem"
                >
                  <view w-28rpx h-28rpx relative class="icon_direction">
                    <view w-4rpx h-28rpx border-rd-4rpx bg-[#8d939a] absolute top-0 left-0 ></view>
                    <view w-28rpx h-4rpx border-rd-4rpx bg-[#8d939a] absolute top-0 left-0 ></view>
                  </view>
                </view>
                <view w-220rpx h-220rpx box-border border-2rpx border-solid border-[#C3C8CE] bg-[#ecf0f3] 
                  flex items-center justify-center
                  class="ctrlDirectionItem"
                >
                  <view w-28rpx h-28rpx relative class="icon_direction">
                    <view w-4rpx h-28rpx border-rd-4rpx bg-[#8d939a] absolute top-0 right-0 ></view>
                    <view w-28rpx h-4rpx border-rd-4rpx bg-[#8d939a] absolute top-0 left-0 ></view>
                  </view>
                </view>
                <view w-220rpx h-220rpx box-border border-2rpx border-solid border-[#C3C8CE] bg-[#ecf0f3] 
                  flex items-center justify-center
                  class="ctrlDirectionItem"
                >
                  <view w-28rpx h-28rpx relative class="icon_direction">
                    <view w-4rpx h-28rpx border-rd-4rpx bg-[#8d939a] absolute top-0 left-0 ></view>
                    <view w-28rpx h-4rpx border-rd-4rpx bg-[#8d939a] absolute bottom-0 left-0 ></view>
                  </view>
                </view>
                <view w-220rpx h-220rpx box-border border-2rpx border-solid border-[#C3C8CE] bg-[#ecf0f3] 
                  flex items-center justify-center
                  class="ctrlDirectionItem"
                >
                  <view w-28rpx h-28rpx relative class="icon_direction">
                    <view w-4rpx h-28rpx border-rd-4rpx bg-[#8d939a] absolute top-0 right-0 ></view>
                    <view w-28rpx h-4rpx border-rd-4rpx bg-[#8d939a] absolute bottom-0 left-0 ></view>
                  </view>
                </view>
              </view>
              <view w-200rpx h-200rpx border-rd-[100%]
                absolute left-[50%] top-[50%] translate-[-50%,-50%]
                flex items-center justify-center
                class="cenCtrl"
                @click="tapCenterCtrl"
              >
                <view w-50rpx h-60rpx relative class="icon_center_ctrl">
                  <view w-6rpx h-60rpx border-rd-6rpx bg-[#8d939a] absolute top-0 left-0 ></view>
                  <view w-6rpx h-60rpx border-rd-6rpx bg-[#8d939a] absolute top-0 right-0 ></view>
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

  onMounted(async () => {
  })

  const onPlayStatechange = (e)=>{
    console.log('live-player code:', e.detail.code)
  }
  const onPlayerError = (e) =>{
    console.error('live-player error:', e.detail.errMsg)
  }

  const tapCenterCtrl = ()=>{
    
  }
</script>
<style scoped lang="scss">
  .ctrlPage{
    .clicker{
      background: linear-gradient(130deg, #c4c6c9,#ced5e0);
      .clickerCon{
        box-shadow: 18px 18px 30px 0px rgba(209,217,230,0.9), -18px 18px 30px 0px rgba(209,217,230,0.2), inset -1px -1px 2px 0px rgba(209,217,230,0.5), inset 1px 1px 2px 0px rgba(255,255,255,0.3);
        .ctrlDirection{
          .ctrlDirectionItem{
            transition: .3s;
          }
          .ctrlDirectionItem:active{
            background-color: #d8e5f5;
            .icon_direction{
              view{
                background-color: #2085FF;
              }
            }
          }
        }
        .cenCtrl{
          background: #ECF0F3;
          box-shadow: inset 5px 5px 13px 0px rgba(209,217,230,0.9), inset -5px -5px 10px 0px rgba(255,255,255,0.9), inset 5px -5px 10px 0px rgba(209,217,230,0.2), 1px 1px 2px 0px rgba(255,255,255,0.3);
          border: 2rpx solid #DBDEE0;
          transition: .3s;
        }
        .cenCtrl:active{
          background: #d8e5f5;
          .icon_center_ctrl{
            view{
              background-color: #2085FF;
            }
          }
        }
      }
    }
  }
  
</style>