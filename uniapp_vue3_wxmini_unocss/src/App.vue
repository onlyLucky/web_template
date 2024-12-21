
<!-- <script >
  import {useConfigStore} from "@/store/config"
  export default {
    name: 'App',
    setup() {
      let num = ref(0)
      const onLaunch = ()=> {
        console.log('App Launch')
        const {setBlackLineHeight,setTopStatusHeight} = useConfigStore()
        // 获取设备屏幕宽度
        let dInfo = uni.getSystemInfoSync()
        if(dInfo  && dInfo.screenHeight){
          let size = dInfo.screenHeight - dInfo.safeArea.bottom
          size = size<0?0:size
          if(dInfo.statusBarHeight){
            setTopStatusHeight(dInfo.statusBarHeight)
          }
          if(dInfo.osName.includes("ios")){
            if(dInfo.safeAreaInsets){
              size = dInfo.safeAreaInsets.bottom
            }
            setBlackLineHeight(size)
          }
        }
        console.log("uni.getSystemInfoSync:",dInfo)
        /*#ifdef H5*/
        uni.hideTabBar();
        /*#endif*/
        
        setInterval(()=>{
          num.value++
          console.log("简单定时器 ++++ ",num.value)
        },1000)
      }
      const onShow = () => {
        console.log('App Show')
      }
      const onHide = () => {
        console.log('App Hide')
      }
      provide('wsNum', num.value);
      return {};
    }
  }
  
</script> -->
<script >
  import {useConfigStore} from "@/store/config"
  // import RabbitMQClient from "@/utils/mqtt.js"
  import MqttClient from "./utils/mqtt";
  let num = ref(0)

  export default {
    
    onLaunch: function () {
      console.log('App Launch')
      const {setBlackLineHeight,setTopStatusHeight} = useConfigStore()
      // 获取设备屏幕宽度
      let dInfo = uni.getSystemInfoSync()
      if(dInfo  && dInfo.screenHeight){
        let size = dInfo.screenHeight - dInfo.safeArea.bottom
        size = size<0?0:size
        if(dInfo.statusBarHeight){
          setTopStatusHeight(dInfo.statusBarHeight)
        }
        if(dInfo.osName.includes("ios")){
          if(dInfo.safeAreaInsets){
            size = dInfo.safeAreaInsets.bottom
          }
          setBlackLineHeight(size)
        }
      }
      console.log("uni.getSystemInfoSync:",dInfo)
      /*#ifdef H5*/
      uni.hideTabBar();
      /*#endif*/
      
      /* setInterval(()=>{
        num.value++
        console.log("简单定时器 ++++ ",num.value)
      },1000) */
      //  mqtt
      /* let mt = new RabbitMQClient('ws://192.168.20.39:15674/ws', {
        login: 'deskmedia',
        passcode: 'dm123456',
        host: '/'
      })
      mt.connect() */
      let mt = new MqttClient()
      // mt.connect("ws://192.168.20.39:15675/ws")
      mt.connect("wxs://broker.emqx.io:8084/mqtt")
      // provide('wsNum', num);
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import 'nutui-uniapp/styles/index.scss';
  @import './static/style/common.scss';
  uni-page-body{
    height: 100%;
  }
  page{
    height: 100%;
  }
</style>
