<!-- 主界面tabs 切换 -->
<template>
  <view w-[100%] h-[100%] class="TabsComps" >
    <nut-tabs v-model="curTabIndex" custom-color="#2085FF" swipeable title-scroll title-gutter="16" :ellipsis="false"
      @change="getData"
    >
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
      <nut-tab-pane title="护理床" >
        <view w-[100%] h-[100%] overflow-hidden class="tabPane2">
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
                      <text text-[#2085FF] font-400 text-24rpx lh-34rpx>{{staticBed[curBedStatus]?staticBed[curBedStatus]:staticBed['0']}}</text>
                    </view>
                    
                  </view>
                  <view w-[100%] h-[calc(100%-160rpx)] flex items-center justify-center >
                    <image w-508rpx h-208rpx 
                      src="@img/index/nursingBed.png"
                      mode="scaleToFill"
                      lazy-load
                    />
                  </view>
                  <view w-[100%] h-80rpx flex items-center justify-center >
                    <view flex items-center justify-center :class="[curMassageStatus=='1'?'massActive':'']">
                      <view w-20rpx h-20rpx border-rd-[50%] bg-[#c6c6c6] shrink-0 mr-12rpx relative class="mass_icon">
                        <view w-10rpx h-10rpx border-rd-[50%] bg-[#fff] absolute left-[50%] top-[50%] translate-[-50%,-50%] class="mass_icon_con"></view>
                      </view>
                      <text text-[#c6c6c6] font-400 text-24rpx lh-34rpx class="mass_text">
                        {{staticMass[curMassageStatus]}}
                      </text>
                    </view>
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
                      <text text-[#2085FF] font-400 text-24rpx lh-34rpx>{{staticCar[curCarStatus]?staticCar[curCarStatus]:staticCar['0']}}</text>
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
                <view v-show="!carTabShow" w-[100%] h-[100%] overflow-auto>
                  <text inline-block w-[100%] text-center text-[#666] font-400 text-28rpx lh-40rpx mb-40rpx >（{{nowDateStr}} 运行状态）</text>
				  <!--  -->
                  <view w-[100%] class="h-[calc(100%-90rpx)]" >
					  <l-echart ref="chartRef"></l-echart>
                  </view>
                </view>
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
  import {useRequest} from "@/api/index.js"
  import {formatDate} from "@/utils/common"
  
  // import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
  // #ifdef H5
  import * as echarts from "echarts"
  // #endif
  
  // #ifdef MP-WEIXIN
  // import * as echarts from "@/static/echarts.min.js"
  const echarts = require('../../../static/echarts.min.js');
  // #endif
  
  
  
  const { getCarStatus } = useRequest()
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
  /* 护理床 */
  let staticBed = ref({
    '0': '床端空闲',
    '1': '床端马桶清洗',
    '2': '床端身体清洗',
    '3': '床端烘干',
    '4': '床端马桶上翻',
    '5': '床端马桶下翻',
    '6': '床端左翻',
    '7': '床端右翻',
    '8': '床端上翻',
    '9': '床端坐姿',
  })
  let curBedStatus = ref('0')
  let staticMass = ref({
    '0': '按摩关闭',
    '1': '按摩开启',
  })
  let curMassageStatus = ref('0')
  /* tab 2 护理车*/
  let staticCar = ref({
    '-1': '运行结束',
    '0': '空闲',
    '1': '小车导航到床端',
    '2': '小车到达床端',
    '3': '小车加清水至床端',
    '4': '床端排污水至小车',
    '5': '小车导航到厕所端',
    '6': '小车到达厕所端',
    '7': '小车排污水至厕所',
    '8': '厕所端加水至小车'
  })
  let curCarStatus = ref('0')
  let carTabShow = ref(true)
  const tapShowCar = ()=>{
	console.log("tapShowCar")
    carTabShow.value = true
  }
  const tapShowEcharts = ()=>{
	console.log("tapShowEcharts")
    carTabShow.value = false
	initEcharts()
  }
  const goCtrlCarPage = ()=>{
    uni.navigateTo({
      url: '/pages/index/controlCar'
    })
  }
  const getData = ()=>{
    return getCarStatus().then(res=>{
      curBedStatus.value = String(res.bedStatus)
      curCarStatus.value = String(res.carStatus)
      curMassageStatus.value = res.massageStatus?'1':'0'
    })
  }

  let nowDateStr = ref(formatDate(new Date()))
  let chartRef = ref(null)
  const initEcharts = ()=>{
    const option = {
      grid: {
        left: '-8%',
        right: '0%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['09','10','11','12','13','14','15'],
          axisLine: {
            show: false,
          },
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: [
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 2,
            color: "#2085FF",
          },
          showSymbol: false,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            lineStyle:{
              color:"#000",
			  opacity:0.1,
			  type: "dashed"
            },
			animation: false,
            data: [{ xAxis: 0 },{ xAxis: 1 }, { xAxis: 2 }, { xAxis: 3 }, { xAxis: 4 },{ xAxis: 5 },{xAxis: 6}]
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(32,133,255,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(32,133,255,0)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        
      ]
    };
	// 组件能被调用必须是组件的节点已经被渲染到页面上
	setTimeout(()=>{
		console.log(echarts,'echarts')
		if(!chartRef.value) return
		chartRef.value.init(echarts, chart => {
			chart.setOption(option)
		})
	},300)
  }

  
  onMounted(async ()=>{
    await getData()
  })
  
  
</script>
<style scoped lang="scss">
.test{
  border: 2rpx solid #2085FF;
  transform: translateY(-50%);
  text-wrap: nowrap;
  white-space:nowrap;
}
</style>