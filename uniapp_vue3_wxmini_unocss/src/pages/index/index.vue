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
          <!-- <image w-[100%] h-auto absolute top-0 left-0 z-0
            src="@img/index/headerBg.png"
            mode="widthFix"
            lazy-load
          /> -->
          <TopNav ref="refTapNav"></TopNav>
          <view w-[100%] class="pageCon"
            :style="{height: `calc(100% - ${tapNavHeight}px)`}"
          >
            <!-- 顶部信息 -->
            <view 
              w-[100%] h-406rpx
              class="headerInfo">
              <!-- 名称头像 登录时间 -->
              <view
                w-[100%] h-160rpx px-32rpx py-0 box-border
                flex items-center justify-start
              >
                <view
                  w-80rpx h-80rpx bg-[#98c2f8] mr-24rpx
                  border-2rpx border-solid border-[#fff] border-rd-[50%]
                ></view>
                <view w-400rpx h-auto>
                  <h3 w-400rpx font-500 text-36rpx text-[#FFFFFF] lh-52rpx text-left mb-8rpx
                    class="textEllipsis"
                  >
                    下午好，张先生
                  </h3>
                  <text w-400rpx inline-block font-400 text-24rpx lh-40rpx text-left
                    class="textEllipsis text-#ffffff/0.6"
                  >
                    最近登录：{{nowDataStr || '刚刚'}}
                  </text>
                </view>
              </view>
              <!-- 切换 通知记录 -->
              <view w-[100%] h-72rpx flex items-center justify-between pl-32rpx box-border text-[#FFFFFF]>
                <nut-button custom-color="linear-gradient(to right,  #FFDA1E, #FFBC37)" @click="showUserPopup = true">
                  <view w-[100%] h-[100%] flex items-center justify-center>
                    <image w-32rpx h-32rpx mr-12rpx
                      src="@img/icons/icon_user.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                    <text font-400 text-28rpx lh-40rpx text-left>{{userList[curUserIndex]}}</text>
                    <image w-28rpx h-28rpx ml-12rpx
                      src="@img/icons/icon_tob_arrow.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
                </nut-button>
                <view w-172rpx h-64rpx flex items-center justify-center relative
                  class="msgBtn"
                  @click="goMsgPage"
                >
                  
                  <image w-32rpx h-32rpx mr-8rpx
                    src="@img/icons/icon_msg.png"
                    mode="scaleToFill"
                    lazy-load
                  />
                  <view w-12rpx h-12rpx bg-[#ff5959] border-rd-[50%] absolute top-16rpx left-40rpx ></view>
                  <text font-400 text-24rpx lh-34rpx>通知记录</text>
                </view>
              </view>
              <!-- 温度 湿度 设备运行数 -->
              <view w-[100%] h-174rpx flex items-center justify-between px-48rpx py-0 box-border text-[#FFFFFF]>
                <view flex items-center v-for="(item,index) in deviceData" :key="index">
                  <image w-48rpx h-48rpx mr-8rpx
                    :src="item.imgSrc"
                    mode="scaleToFill"
                    lazy-load
                  />
                  <view>
                    <h5 font-400 text-28rpx lh-40rpx mb-8rpx>{{item.text}}</h5>
                    <text font-500 text-32rpx lh-46rpx>{{item.value}}</text>
                  </view>
                </view>
              </view>
            </view>
            <!-- switch 切换 菜单项 -->
            <view w-[100%] bg-[#F4F6F9] px-32rpx py-32rpx box-border
              class="switchCon">
              <TabsCon :checkTime="nowDataStr"></TabsCon>
            </view>
          </view>

        </view>
          
        <!-- <text w-[100%] h-800rpx overflow-auto absolute top-0 left-0>{{blackLineH}}px {{deInfo}}</text> -->
      </view>
      <TabBar></TabBar>
    </view>
    
  </view>

  <!-- 用户切换 -->
  <nut-popup position="bottom" closeable round 
    :custom-style="{ height: '560rpx',backgroundColor: '#F4F6F9',paddingBottom: `${blackLineH}px` }"
    @close="onCancelUser"
    v-model:visible="showUserPopup"
  >
    <view w-[100%] h-[100%] class="userPopup" >
      <view w-[100%] h-110rpx mb-8rpx flex items-center justify-center >
        <text font-500 text-32rpx lh-46rpx text-[#111111] >人员切换</text>
      </view>
      <view w-[100%] h-[calc(100%-254rpx)] px-32rpx box-border >
        <view w-[100%] h-[100%] overflow-auto flex flex-wrap content-start >
          <view h-72rpx box-border px-16rpx py-16rpx mb-16rpx mr-16rpx border-rd-16rpx border-2rpx border-solid 
            font-400 text-28rpx lh-40rpx text-[#111111]
            flex items-center justify-center
            v-for="(item,index) in userList" :key="index"
            @click="selectUserIndex = index"
            :class="['w-[calc((100%-42rpx)/3)]','userItem',index==selectUserIndex?'active':'']"
          >{{item}}</view>
        </view>
      </view>
      <view w-[100%] h-136rpx px-32rpx box-border border-t-2rpx border-t-solid border-t-[#f0f0f0] 
        flex items-center justify-between
      >
        <nut-button type="default" @click="onCancelUser">取消</nut-button>
        <nut-button type="info" @click="switchUserTap">切换</nut-button>
      </view>
    </view>
  </nut-popup>

</template>

<script setup>
  import { useConfigStore } from '@/store/config'
  import {formatTime} from "@/utils/common"
  import TabsCon from './comps/TabsCon.vue';

  const {getTabBarHeight,blackLineH} = useConfigStore()
  let nowDataStr = ref(formatTime(new Date()))

  const refTapNav = ref(null)
  let tapNavHeight = ref(0)

  // 设备数据
  const deviceData = ref([
    {
      text: "温度",
      imgSrc: "../../static/images/icons/icon_thermometer.png",
      value: "18℃"
    },
    {
      text: "湿度",
      imgSrc: "../../static/images/icons/icon_humidity.png",
      value: "50%"
    },
    {
      text: "设备运行数",
      imgSrc: "../../static/images/icons/icon_run_device.png",
      value: "6个"
    }
  ])

  const { API_DEMO_GET } = useRequest()

  const list = ref([])
  let deInfo = ref({})
  const getList = () => {
    uni.showLoading({
      title: '加载中...'
    })
    API_DEMO_GET()
      .then((res) => {
        console.log(res)
        list.value = res
        uni.hideLoading()
      })
      .catch(() => {
        uni.hideLoading()
      })
  }

  /* 用户切换 */
  let showUserPopup = ref(false)
  const userList = ref(['王阿姨',"张叔叔",'刘伯伯','李爷爷','刘奶奶','孙阿姨','二伯伯','三叔叔','四大爷'])
  let curUserIndex = ref(4)
  let selectUserIndex = ref(4)

  const switchUserTap = ()=>{
    curUserIndex.value = selectUserIndex.value
    showUserPopup.value = false
  }

  const onCancelUser = ()=>{
    selectUserIndex.value = curUserIndex.value
    showUserPopup.value = false
  }

  /* 跳转到通知记录 */
  const goMsgPage = ()=>{
    uni.navigateTo({
      url: '/pages/index/msgPage'
    })
  }

  onMounted(async () => {
    let dInfo = uni.getSystemInfoSync()
    if(dInfo  && dInfo.screenHeight){
      let size = dInfo.screenHeight - dInfo.safeArea.bottom
      size = size<0?0:size
      deInfo.value = dInfo
    }
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
      background-image: url("@img/index/headerBg.png"); 
      background-size: 100% auto;
      background-repeat: no-repeat;
      .pageCon{
        .headerInfo{
          ::v-deep .nut-button{
            width: 204rpx;
            height: 72rpx;
            border-radius: 16rpx;
            border: none;
            padding: 0;
          }
          .msgBtn{
            border: solid 2rpx transparent;
            border-radius: 64rpx 0 0 64rpx;
            background-image: linear-gradient(#4a9cff,#3e95ff 20%,#3490ff 40%, #308eff 50%,#308dff 100%),
            linear-gradient(270deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.27), rgba(255, 255, 255, 0.5));
            border-right: none;
            background-origin: border-box;
            background-clip: content-box, border-box;
          }
        }
        .switchCon{
          height: calc(100% - 406rpx);
          border-radius: 32rpx 32rpx 0 0;
          ::v-deep .TabsComps{
            .nut-tabs.horizontal{
              width: 100%;
              height: 100%;
              .nut-tabs__titles{
                background: transparent;
                height: 92rpx;
                .nut-tabs__titles-item{
                  font-weight: 400;
                  font-size: 28rpx;
                  line-height: 40rpx;
                  text-align: center;
                  color: #666;
                  .nut-tabs__titles-item__text{
                    margin-bottom: 20rpx;
                  }
                }
                .nut-tabs__titles-item.nut-tabs-active{
                  font-weight: 500;
                  font-size: 32rpx;
                  line-height: 46rpx;
                  text-align: center;
                  color: #2085FF;
                  .nut-tabs__titles-item__text{
                    margin-bottom: 26rpx;
                  }
                  .nut-tabs__titles-item__line{
                    width: 56rpx;
                    height: 4rpx;
                    border-radius: 4rpx;
                  }
                }
              }
              .nut-tabs__content{
                width: 100%;
                height: calc(100% - 92rpx);
                .nut-tab-pane{
                  background: #fff;
                  border-radius: 16rpx;
                  padding: 32rpx;
                  .tabPaneHeader{
                    .headerOpt.hOpt_t3{
                      .nut-button{
                        color: #2085FF;
                        border-color: #2085FF;
                        height: 60rpx;
                        font-size: 28rpx;
                        line-height: 40rpx;
                        text-align: center;
                        padding: 8rpx 16rpx;
                      }
                    }
                  }
                  .tabPaneCon{
                    height: calc(100% - 84rpx);
                    overflow: auto;
                    background: rgba(32, 133, 255, 0.05);
                    border-radius: 16rpx;
                    padding: 24rpx;
                    box-sizing: border-box;
                  }

                  .tabPane1{
                    .tabPaneCon{
                      padding: 0;
                      background: #fff;
                      .nut-button{
                        width: calc(50% - 8rpx);
                        height: 72rpx;
                        padding: 0;
                        box-sizing: border-box;
                        margin-top: 16rpx;
                        font-size: 28rpx;
                        line-height: 40rpx;
                        color: #fff;
                      }
                      .nut-button.nut-button--primary{
                        background: #FF5959;
                      }
                      .nut-button.nut-button--info{
                        background: #2085FF;
                      }
                      .bodyDateItem{
                        width: calc(50% - 16rpx);
                        height: auto;
                        &:nth-child(2n){
                          margin-left: 16rpx;
                          
                        }
                      }
                    }
                  }
                  .tabPane4{
                    .tabPaneCon{
                      padding: 0;
                      background: #fff;
                      border-radius: 0;
                    }
                  }


                }
              }
            }
          }
        }
      }
      
    }
  }
  ::v-deep .nut-popup{
    .nut-popup__close-icon{
      color: #333;
      top: 24rpx;
    }
    
  }

  .userPopup{
    .userItem{
      border-color: rgba(0, 0, 0, .1);
      background: transparent;
      &.active{
        border: none;
        background: #2085FF;
        color: #fff;
      }
      &:nth-child(3n){
        margin-right: 0;
      }
    }
    ::v-deep .nut-button{
      width: 336rpx;
      height: 72rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      font-weight: 400;
      &.nut-button--default{
        border: none;
        background: rgba(102, 102, 102, .1);
        color: #666666;
      }
      &.nut-button--info{
        border: none;
        background: #2085FF;
        color: #fff;
      }
    }
  }
  .test {
    border-top: 2rpx solid #f0f0f0;
  }
</style>
