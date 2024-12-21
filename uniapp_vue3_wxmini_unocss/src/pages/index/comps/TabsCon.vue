<!-- 主界面tabs 切换 -->
<template>
  <view w-[100%] h-[100%] class="TabsComps" >
    <nut-tabs v-model="curTabIndex" custom-color="#2085FF" swipeable title-scroll title-gutter="16" :ellipsis="false">
      <nut-tab-pane title="身体检测">
        <view w-[100%] h-[100%] overflow-hidden class="tabPane1">
          <!-- 顶部标题 -->
          <view w-[100%] h-60rpx mb-24rpx flex items-center justify-between
            class="tabPaneHeader"
          >
            <view flex items-center>
              <image w-36rpx h-36rpx mr-12rpx
                src="@img/icons/icon_index_th1.png"
                mode="scaleToFill"
                lazy-load
              />
              <h3 text-[#111] font-500 text-32rpx lh-46rpx mr-12rpx >实时检测</h3>
              <text text-[#999] font-400 text-24rpx lh-34rpx v-show="checkTime">({{ checkTime }})</text>
            </view>
            <view class="headerOpt hOpt_t3">
              <view flex items-center>
                <text text-[#999] font-400 text-24rpx lh-34rpx>历史检测</text>
                <image w-28rpx h-28rpx ml-4rpx
                  src="@img/icons/icon_tolb_arrow.png"
                  mode="scaleToFill"
                />
              </view>
            </view>
          </view>
          <!-- 内容 -->
          <view w-[100%] class="tabPaneCon">
            
            <view w-[100%] h-[100%] >
              <view w-[100%] h-[calc(100%-88rpx)] overflow-hidden>
                <!-- 实时监测 -->
                <view w-[100%] h-[100%] overflow-auto flex flex-wrap>
                  <view v-for="(item,index) in bodyDate" :key="index"
                    border-rd-16rpx px-24rpx py-24rpx box-border mb-16rpx 
                    class="bodyDateItem bg-#2085FF/0.05 "
                  >
                    <view w-[100%] flex items-center mb-8rpx>
                      <view w-2px h-16rpx mr-10rpx border-rd-2rpx bg-[#2085FF] ></view>
                      <h6 font-400 text-24rpx lh-34rpx text-[#333] >{{item.name}}</h6>
                    </view>
                    <view w-[100%] flex items-center mb-20rpx>
                      <h3 ml-10rpx mr-12rpx font-bold text-40rpx lh-58rpx text-[#333] >{{item.value}}</h3>

                      <!-- 上升、下降 -->
                      <view w-28rpx h-28rpx relative v-show="item.status == 1">
                        <view w-10rpx h-10rpx absolute left-8rpx top-2rpx rotate="45"
                          border-2rpx border-solid border-[#FF5959] border-r-none border-b-none 
                        ></view>
                        <view w-2rpx h-20rpx absolute left-[50%] translate-x-[-50%] top-4rpx bg-[#FF5959] ></view>
                      </view>
                      <view w-28rpx h-28rpx relative v-show="item.status == 2">
                        <view w-10rpx h-10rpx absolute left-8rpx bottom-2rpx rotate="45"
                          border-2rpx border-solid border-[#2085FF] border-l-none border-t-none 
                        ></view>
                        <view w-2rpx h-20rpx absolute left-[50%] translate-x-[-50%] top-4rpx bg-[#2085FF] ></view>
                      </view>

                    </view>
                    <text w-[100%] inline-block font-400 text-24rpx lh-34rpx text-[#999] 
                      class="textEllipsis"
                    >参考值{{item.referValue}}</text>
                  </view>
                </view>
              </view>
              <view w-[100%] h-88rpx flex items-center justify-between >
                <nut-button type="primary">代呼救（SOS）</nut-button>
                <nut-button type="info">远程体检</nut-button>
              </view>
            </view>

          </view>
        </view>
      </nut-tab-pane>
      <nut-tab-pane title="护理床">
        <view w-[100%] h-[100%] overflow-hidden >
          <!-- 顶部标题 -->
          <view w-[100%] h-60rpx mb-24rpx flex items-center justify-between
            class="tabPaneHeader"
          >
            <view flex items-center>
              <image w-36rpx h-36rpx mr-12rpx
                src="@img/icons/icon_index_th2.png"
                mode="scaleToFill"
                lazy-load
              />
              <h3 text-[#111] font-500 text-32rpx lh-46rpx text-left>XIMEI护理床</h3>
            </view>
          </view>
          <!-- 内容 -->
          <view w-[100%] class="tabPaneCon">
            
            <view w-[100%] h-[100%] >
              <view w-[100%] h-[100%] overflow-hidden>
                <!-- 小车状态 -->
                <view w-[100%] h-[100%] overflow-auto>
                  <view w-[100%] h-60rpx flex items-center justify-between>
                    <view 
                      w-auto h-60rpx px-16rpx py-16rpx box-border border-rd-60rpx 
                      flex items-center justify-center
                      class="bg-#2085FF/0.1"
                    >
                      <view w-28rpx h-28rpx border-rd-[50%] border-2rpx border-solid border-[#2085FF] mr-12rpx relative>
                        <view
                          w-12rpx h-12rpx border-rd-[50%] bg-[#2085FF] 
                          absolute left-[50%] top-[50%] translate-[-50%,-50%]
                        ></view>
                      </view>
                      <text text-[#2085FF] font-400 text-24rpx lh-34rpx>正在按摩中</text>
                    </view>
                    
                  </view>
                  <view w-[100%] h-[calc(100%-80rpx)] flex items-center justify-center >
                    <image w-508rpx h-208rpx 
                      src="@img/index/nursingBed.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
                </view>
              </view>

            </view>

          </view>
        </view>
      </nut-tab-pane>
      <nut-tab-pane title="护理车">
        <!--  -->
        <view w-[100%] h-[100%] overflow-hidden >
          <!-- 顶部标题 -->
          <view w-[100%] h-60rpx mb-24rpx flex items-center justify-between
            class="tabPaneHeader"
          >
            <view flex items-center>
              <image w-36rpx h-36rpx mr-12rpx
                src="@img/icons/icon_index_th3.png"
                mode="scaleToFill"
                lazy-load
              />
              <h3 text-[#111] font-500 text-32rpx lh-46rpx text-left>XIMEI护理车</h3>
            </view>
            <view class="headerOpt hOpt_t3">
              <nut-button plain type="info" @click="goCtrlCarPage">远程控制</nut-button>
            </view>
          </view>
          <!-- 内容 -->
          <view w-[100%] class="tabPaneCon">
            
            <view w-[100%] h-[100%] >
              <view w-[100%] h-[calc(100%-32rpx)] overflow-hidden>
                <!-- 小车状态 -->
                <view v-show="carTabShow" w-[100%] h-[100%] overflow-auto>
                  <view w-[100%] h-60rpx mb-56rpx flex items-center justify-between>
                    <view 
                      w-auto h-60rpx px-16rpx py-16rpx box-border border-rd-60rpx 
                      flex items-center justify-center
                      class="bg-#2085FF/0.1"
                    >
                      <view w-28rpx h-28rpx border-rd-[50%] border-2rpx border-solid border-[#2085FF] mr-12rpx relative>
                        <view
                          w-12rpx h-12rpx border-rd-[50%] bg-[#2085FF] 
                          absolute left-[50%] top-[50%] translate-[-50%,-50%]
                        ></view>
                      </view>
                      <text text-[#2085FF] font-400 text-24rpx lh-34rpx>小车正在排污中</text>
                    </view>
                    <image w-48rpx h-48rpx  
                      src="@img/index/battery.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
                  <view w-[100%] h-380rpx mb-56rpx flex items-center justify-center >
                    <image w-380rpx h-380rpx 
                      src="@img/index/nursingCart.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
                </view>
                <!-- echarts 表格 -->
                <view v-show="!carTabShow" w-[100%] h-[100%] overflow-auto>echarts 表格</view>
              </view>
              <view w-[100%] h-32rpx flex items-center justify-center relative >
                <view
                  absolute left-[50%] top-[50%] translate-[-50%,-50%]
                >
                  <view 
                    w-30rpx h-12rpx bg-[#2085FF] border-rd-12rpx absolute top--2rpx transition="left duration-0.4s"  
                    :style="{left: carTabShow?'0rpx':'30rpx'}"
                  ></view>
                  <view w-60rpx h-8rpx border-rd-8rpx bg-[#000] op-10 ></view>
                </view>
                <view w-300rpx h-32rpx @click="tapShowCar"></view>
                <view w-300rpx h-32rpx @click="tapShowEcharts"></view>
              </view>
            </view>

          </view>
        </view>
      </nut-tab-pane>
      <nut-tab-pane title="录制设备">
        <view w-[100%] h-[100%] overflow-hidden class="tabPane4">
          <!-- 顶部标题 -->
          <view w-[100%] h-60rpx mb-24rpx flex items-center justify-between
            class="tabPaneHeader"
          >
            <view flex items-center>
              <image w-36rpx h-36rpx mr-12rpx
                src="@img/icons/icon_index_th4.png"
                mode="scaleToFill"
                lazy-load
              />
              <h3 text-[#111] font-500 text-32rpx lh-46rpx mr-12rpx >LUOJI录制设备</h3>
            </view>
            <view class="headerOpt hOpt_t3">
              <view flex items-center>
                <text text-[#999] font-400 text-24rpx lh-34rpx>查看记录</text>
                <image w-28rpx h-28rpx ml-4rpx
                  src="@img/icons/icon_tolb_arrow.png"
                  mode="scaleToFill"
                />
              </view>
            </view>
          </view>
          <!-- 内容 -->
          <view w-[100%] class="tabPaneCon">
            
            <view w-[100%] h-[100%] >
              <view w-[100%] h-[100%] overflow-auto>
                <view w-[100%] h-484rpx bg-[#F4F6F9] mb-40rpx relative >
                  <!-- 视频 -->
                  <!-- <video src=""></video> -->
                  <view px-16rpx py-16rpx box-border border-rd-120rpx flex items-center justify-between
                    absolute left-[50%] translate-x-[-50%] bottom-32rpx
                    class="bg-#000000/0.4"
                  >
                    <view w-28rpx h-28rpx border-rd-[50%] border-2rpx border-solid border-[#20ff2c] mr-10rpx relative>
                      <view
                        w-12rpx h-12rpx border-rd-[50%] bg-[#20ff2c] 
                        absolute left-[50%] top-[50%] translate-[-50%,-50%]
                      ></view>
                    </view>
                    <text text-[#fff] font-400 text-24rpx lh-34rpx whitespace-nowrap >正在录制：00:26:10</text>
                  </view>
                </view>

                <view w-[100%] mb-8rpx flex items-center justify-between >

                  <view w-80rpx flex flex-col items-center justify-center >
                    <view w-80rpx h-80rpx border-rd-[50%] flex items-center justify-center mb-12rpx 
                      class="bg-#617D9E/0.08"
                    >
                      <image w-40rpx h-40rpx
                        src="@img/icons/icon_voice_pause.png"
                        mode="scaleToFill"
                      />
                    </view>
                    <text w-[100%] inline-block text-center text-[#333] font-400 text-24rpx lh-34rpx whitespace-nowrap >停止</text>
                  </view>
                  <view w-80rpx flex flex-col items-center justify-center >
                    <view w-80rpx h-80rpx border-rd-[50%] flex items-center justify-center mb-12rpx 
                      class="bg-#617D9E/0.08"
                    >
                      <image w-40rpx h-40rpx
                        src="@img/icons/icon_camera.png"
                        mode="scaleToFill"
                      />
                    </view>
                    <text w-[100%] inline-block text-center text-[#333] font-400 text-24rpx lh-34rpx whitespace-nowrap >拍照</text>
                  </view>
                  <view w-80rpx flex flex-col items-center justify-center >
                    <view w-80rpx h-80rpx border-rd-[50%] flex items-center justify-center mb-12rpx 
                      class="bg-[#2085FF] shadow-[0rpx_0rpx_20rpx_0rpx_#2041ff50]"
                    >
                      <image w-40rpx h-40rpx
                        src="@img/icons/icon_speech.png"
                        mode="scaleToFill"
                      />
                    </view>
                    <text whitespace-nowrap text-center text-[#333] font-400 text-24rpx lh-34rpx >按住讲话</text>
                  </view>
                  <view w-80rpx flex flex-col items-center justify-center >
                    <view w-80rpx h-80rpx border-rd-[50%] flex items-center justify-center mb-12rpx 
                      class="bg-#617D9E/0.08"
                    >
                      <image w-40rpx h-40rpx
                        src="@img/icons/icon_voice.png"
                        mode="scaleToFill"
                      />
                    </view>
                    <text w-[100%] inline-block text-center text-[#333] font-400 text-24rpx lh-34rpx whitespace-nowrap >静音</text>
                  </view>
                  <view w-80rpx flex flex-col items-center justify-center >
                    <view w-80rpx h-80rpx border-rd-[50%] flex items-center justify-center mb-12rpx 
                      class="bg-#617D9E/0.08"
                    >
                      <image w-40rpx h-40rpx
                        src="@img/icons/icon_tob_b_arrow.png"
                        mode="scaleToFill"
                      />
                    </view>
                    <text w-[100%] inline-block text-center text-[#333] font-400 text-24rpx lh-34rpx whitespace-nowrap >更多</text>
                  </view>

                </view>
              </view>
            </view>

          </view>
        </view>
      </nut-tab-pane>
      <nut-tab-pane title="智能腕表">
        <view w-[100%] h-[100%] overflow-hidden >
          <!-- 顶部标题 -->
          <view w-[100%] h-60rpx mb-24rpx flex items-center justify-between
            class="tabPaneHeader"
          >
            <view flex items-center>
              <image w-36rpx h-36rpx mr-12rpx
                src="@img/icons/icon_index_th5.png"
                mode="scaleToFill"
                lazy-load
              />
              <h3 text-[#111] font-500 text-32rpx lh-46rpx text-left>HUAWEI智能腕表</h3>
            </view>
          </view>
          <!-- 内容 -->
          <view w-[100%] class="tabPaneCon">
            
            <view w-[100%] h-[100%] >
              <view w-[100%] h-[100%] overflow-hidden>
                <!-- 小车状态 -->
                <view w-[100%] h-[100%]  relative>
                  <view w-[100%] h-[100%] overflow-auto flex items-center justify-center >
                    <image w-380rpx h-348rpx 
                      src="@img/index/nursingWatch.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
                  <!-- 在线状态 -->
                  <view absolute left-[50%] translate-x-[-50%] bottom-72rpx >
                    <view flex items-center justify-center >
                      <view w-16rpx h-16rpx border-rd-[50%] bg-[#00D129] mr-12rpx relative>
                        <view w-8rpx h-8rpx border-rd-[50%] absolute left-[50%] top-[50%] translate-[-50%,-50%] ></view>
                      </view>
                      <text text-[#00D129] font-400 text-24rpx lh-34rpx >在线</text>
                    </view>
                  </view>
                </view>
              </view>

            </view>

          </view>
        </view>
      </nut-tab-pane>
    </nut-tabs>
  </view>
  
</template>
<script setup>
  const props = defineProps({
    checkTime: {
      type:String,
      default: ""
    }
  });
  let curTabIndex = ref('2')
  /* tab 1 身体检测 */
  let bodyDate = ref([
    {
      name:"心率",
      value: 90,
      status: 0, // 0 平  1 上升   2下降
      referValue: "90~120bmp"
    },
    {
      name:"体温",
      value: 38.5,
      status: 1, // 0 平  1 上升   2下降
      referValue: "90~120bmp"
    },
    {
      name:"血压",
      value: '90 / 60',
      status: 0, // 0 平  1 上升   2下降
      referValue: "90~120 / 60~80"
    },
    {
      name:"脉搏",
      value: 80,
      status: 2, // 0 平  1 上升   2下降
      referValue: "90~120bmp"
    },
    {
      name:"呼吸",
      value: 90,
      status: 0, // 0 平  1 上升   2下降
      referValue: "90~120bmp"
    },
    {
      name:"血氧饱和度",
      value: 95,
      status: 0, // 0 平  1 上升   2下降
      referValue: "90~100%"
    },
    {
      name:"血糖",
      value: 2.7,
      status: 0, // 0 平  1 上升   2下降
      referValue: "2.5~3.5mmol/L"
    },
    {
      name:"体重",
      value: 60,
      status: 0, // 0 平  1 上升   2下降
      referValue: "65~80kg"
    },
  ])
  /* tab 2 护理车*/
  let carTabShow = ref(true)
  const tapShowCar = ()=>{
    carTabShow.value = true
  }
  const tapShowEcharts = ()=>{
    carTabShow.value = false
  }
  const goCtrlCarPage = ()=>{
    uni.navigateTo({
      url: '/pages/index/controlCar'
    })
  }
</script>
<style scoped lang="scss">
.test{
  border: 2rpx solid #2085FF;
  transform: translateY(-50%);
  text-wrap: nowrap;
  white-space:nowrap;
}
</style>