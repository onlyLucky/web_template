let pianX = 0;
let pianY = 0;
let pianTotalX = 0;
let pianTotalY = 0;
let pianStartX = 0;
let pianStartY = 0;
var srsLogic = {
  offset:{ // srs播放器偏移值
    top: 0,
    left: 0
  },
  srsWidth: 0, // 原本宽高
  srsHeight: 0,// 原本宽高
  scale: 1, // 适配后缩放比例
  width: 0, // 适配后宽高
  height: 0,// 适配后宽高
  srsOptShow: false, // srs 播放是否显示操作
  preX: -1, // 上一步x
  preY: -1,// 上一步y
  offsetX: -1,// 当前x
  offsetY: -1,// 当前y
  mouseType: 0, // 鼠标移动类型
  isMoving: false,// 是否在移动
  moveTimer: null,
  keyBoardList: [], // 键位堆栈
  keyBoardLoad:[17,16,18], // 键位加载，立马释放处理 [17,16,18,91,92] [83, 82, 80, 67, 86, 77, 9]
  isPlay: false, // 是否在播放
  srsPath: '',
  screenWidth: "", // 屏幕宽度
  screenHeight: "", // 屏幕高度
  showSrsPage(){
    viewLogic.showMainPage("SRSCon")
    $("#fileLoading").show()
    // 默认打开播放按钮
    // srsLogic.handleShowOpt(true)
    // 事件绑定
    srsLogic.bindEvent();
    
    setTimeout(()=>{
      srs.startPlay(srsLogic.srsPath,
        ()=>{
          $(".videoCon").show()
          $(".srsLoadError").hide()
          // 成功播放回调
          setTimeout(()=>{
            if(dmData.mouseInfo.width == 0 ||dmData.mouseInfo.height==0){
              dmData.mouseInfo.width = $("#SRS_Video").width();
              dmData.mouseInfo.height = $("#SRS_Video").height();
            }
            srsLogic.handleVideoSRSDom()
          },800)
          // 窗口缩放
          $(window).resize(function() {
            srsLogic.handleVideoSRSDom()
          })
        },
        ()=>{
          // 失败
          $(".videoCon").hide()
          $(".srsLoadError").show()
  
        }
      )
    },5000)
  },
  bindEvent(){
    var debounceShowSrsPage = _.debounce(function() {
      srsLogic.showSrsPage()
    }, 300)
    $("#SRSCon .srsLoadError .iconErr").unbind().bind('click touch',debounceShowSrsPage)
    $("#SRSCon .srsLoadError p span").unbind().bind('click touch',debounceShowSrsPage)
    // 
    var video = document.getElementById('SRS_Video');
    // 监听暂停事件
    video.addEventListener('play', function() {
      console.log('视频开始播放');
    });
    // 监听暂停事件
    video.addEventListener('pause', function() {
      console.log('视频已暂停');
      srsLogic.handleShowOpt(true);
    });
    // 监听播放结束事件
    video.addEventListener('ended', function() {
      console.log('视频播放结束');
      srsLogic.handleShowOpt(true);
    });
    // 监听播放结束事件
    video.addEventListener('error', function(e) {
      console.log('视频播放错误',e);
      systemUi.promptWindow({ title: '播放错误！', time: 3000 });
      srsLogic.handleShowOpt(true);
    });
    // 监听播放点击操作
    $(".srs_opt_con .opt_item.play").unbind().bind('click touch', srsLogic.onSrsPlayClick)
    // 监听鼠标移动
    
    /* $('#SRS_Video').mousemove(function(event){
      srsLogic.onMouseMove(event)
    })
    $('#SRS_Video').unbind().bind('mousemove',srsLogic.onMouseMoveCalc)
    $('#SRS_Video').mousedown(function(event) {
      // console.log(event.offsetX,event.offsetY)
      srsLogic.onMouseTap(event)
    })
    $('#SRS_Video').mouseup(function(event) {
      // console.log(event.offsetX,event.offsetY)
      srsLogic.onMouseup(event)
    }) */
    $('#srs_screen_v').unbind().bind('mousemove',srsLogic.onMouseMoveCalc)
    $('#srs_screen_v').mousedown(function(event) {
      // console.log(event.offsetX,event.offsetY)
      srsLogic.onMouseTap(event)
    })
    $('#srs_screen_v').mouseup(function(event) {
      // console.log(event.offsetX,event.offsetY)
      srsLogic.onMouseup(event)
    })
    /* document.getElementById('SRS_Video').addEventListener('wheel',function(event) {
      // console.log(event.offsetX,event.offsetY)
      console.log(event)
      srsLogic.onMouseWheel(event)
    }) */
    // 监听键盘点击
    document.addEventListener('keydown', function(event) {
      srsLogic.onKeyboardDown(event)
    });
    document.addEventListener('keyup', function(event) {
      srsLogic.onKeyboardUp(event)
    });

    // 切换设备添加
    $("#SRSCon .floatSwitch").unbind().bind('click touch',function(){
      selectNodeModel.showModel();
    })

  },
  // 校准
  handleAligned(){
    // 超出屏幕位置 进行校验
    let wNum = 6
    let w = Math.round(dmData.mouseInfo.width/wNum)
    let h = Math.round(dmData.mouseInfo.height/wNum)
    let msg = ''
    for (let i = 0; i <wNum; i++){
      msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(0,w,h)
      console.log("w,h",w,h)
      websocket.send(msg,1)
    }
    let xNum = 4
    let x = Math.round((srsLogic.offsetX-dmData.mouseInfo.width)/xNum)
    let y = Math.round((srsLogic.offsetY-dmData.mouseInfo.height)/xNum)
    for (let i = 0; i <xNum; i++){
      msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(0,x,y)
      console.log("x,y",x,y)
      websocket.send(msg,1)
    }
    console.log("超出屏幕位置,进行校准")
    console.log(srsLogic.offsetX,srsLogic.offsetY,dmData.mouseInfo.width,dmData.mouseInfo.height)
  },
  // 鼠标移动
  onMouseMoveCalc: _.debounce(function(event) {
    srsLogic.offsetX = isNaN(Math.round(event.offsetX/srsLogic.scale))?0:Math.round(event.offsetX/srsLogic.scale)
    srsLogic.offsetY = isNaN(Math.round(event.offsetY/srsLogic.scale))?0:Math.round(event.offsetY/srsLogic.scale)
    if(srsLogic.offsetX == 0 && srsLogic.offsetY==0){
      srsLogic.offsetX = 1
    }
    
    let msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(srsLogic.mouseType,srsLogic.offsetX,srsLogic.offsetY)
    websocket.send(msg)
    console.log("onMouseMoveCalc:",srsLogic.offsetX,srsLogic.offsetY,msg);
  },0),
  onMouseMove: _.debounce(function(event) {
    srsLogic.offsetX = Math.round(event.offsetX/srsLogic.scale)
    srsLogic.offsetY = Math.round(event.offsetY/srsLogic.scale)
    if(srsLogic.moveTimer){
      clearTimeout(srsLogic.moveTimer)
    }
    if(!srsLogic.isMoving){
      pianStartX = event.offsetX
      pianStartY= event.offsetY
      console.log("开始移动： ",event.offsetX,event.offsetY)
    }
    let msg = '';
    srsLogic.isMoving = true;
    if(!(srsLogic.preX <0 && srsLogic.preY<0)){
      msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(srsLogic.mouseType,srsLogic.offsetX-srsLogic.preX,srsLogic.offsetY-srsLogic.preY)
      websocket.send(msg)

      pianTotalX = pianTotalX+(srsLogic.offsetX-srsLogic.preX)
      pianTotalY = pianTotalY+(srsLogic.offsetY-srsLogic.preY)

      console.log(srsLogic.offsetX,srsLogic.offsetY,srsLogic.preX,srsLogic.preY,srsLogic.offsetX-srsLogic.preX,srsLogic.offsetY-srsLogic.preY)
    }else{
      srsLogic.handleAligned()
    }
    srsLogic.preX = srsLogic.offsetX
    srsLogic.preY = srsLogic.offsetY
    srsLogic.moveTimer = setTimeout(function() {
      srsLogic.isMoving = false;
      // srsLogic.handleAligned()
      console.log('Mouse movement has stopped');
      console.log("结束移动： ",
        event.offsetX,event.offsetY,
        pianStartX,pianStartY,
        event.offsetX-pianStartX, event.offsetY-pianStartY,
        pianTotalX,pianTotalY
      )
      msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(srsLogic.mouseType,event.offsetX-pianStartX-pianTotalX,event.offsetY-pianStartY-pianTotalY)
      websocket.send(msg)
      pianX = 0;
      pianY = 0;
      pianTotalX = 0;
      pianTotalY = 0;
      pianStartX = 0;
      pianStartY = 0;
    }, 600);
  },0),
  // 鼠标点击
  onMouseTap(event){
    let type = 2 // 右键
    // 左键
    if(event.button==0){
			type = 1
		}
    if(event.button==1){ // 中键
			type = 4
		}
    srsLogic.mouseType = type
    
    
    // 按下
    let msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(type,srsLogic.offsetX,srsLogic.offsetY)
    websocket.send(msg)
    console.log('onMouseTap',type,srsLogic.offsetX,srsLogic.offsetY,msg);
		event.preventDefault();
  },
  // 鼠标释放
  onMouseup(event){
    // 释放
    srsLogic.mouseType = 0
    msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(0,srsLogic.offsetX,srsLogic.offsetY)
    websocket.send(msg)
    console.log("onMouseup",srsLogic.offsetX,srsLogic.offsetY,msg);
  },
  // 鼠标滚轮滚动
  onMouseWheel(event){
    srsLogic.offsetX = Math.round(event.offsetX/srsLogic.scale)
    srsLogic.offsetY = Math.round(event.offsetY/srsLogic.scale)
    console.log('onMouseWheel:',srsLogic.offsetX,srsLogic.offsetY)
    let msg = dmData.mouseInfo.pkid+';'+srsLogic.returnMouseMsg(4,srsLogic.offsetX,srsLogic.offsetY,event.deltaY)
    websocket.send(msg)
  },
  // 键盘按下
  onKeyboardDown(event){
    console.log('按键被按下:', event.key);
    srsLogic.keyBoardList = _.uniq(srsLogic.keyBoardList)
    if(srsLogic.keyBoardList.indexOf(event.keyCode)==-1){
      srsLogic.keyBoardList.push(event.keyCode);
    }
    console.log('按键的keyCode:', event.keyCode,srsLogic.keyBoardList.join('+')); // keyCode属性已不推荐使用，但仍然提供为了向后兼容
    // 检查特定按键
    if (event.key === 'Enter') {
      console.log('Enter键被按下');
    } else if (event.key === ' ') {
      console.log('空格键被按下');
    }
    let code = keyboardMenuData[event.keyCode].value
    if(typeof code === 'string'){
      if(srsLogic.keyBoardList.length>1){
        code = ''
        srsLogic.keyBoardList.map(item=>{
          code+=keyboardMenuData[item].value
        })
      }
      let msg = dmData.mouseInfo.pkid+';'+srsLogic.returnKeyboardMsg(code)
      // 键盘是否属于这几个键位，立马键盘释放
      // 判断当前键位池中是否存在ctrl alt shift
      let isExist = _.some(srsLogic.keyBoardLoad,function(value){
        return _.includes(srsLogic.keyBoardList, value);
      })
      if(!isExist){
        // srsLogic.keyBoardList = srsLogic.keyBoardList.filter(k => k != event.keyCode)
        srsLogic.keyBoardList = []
      }
      websocket.send(msg)
    }
    // 你可以添加更多的条件来检查不同的按键
  },
  // 键盘释放
  onKeyboardUp(event){
    if(event.key=="Control" || event.key=="Shift" || event.key=="Meta" || event.key=="Alt"){
      srsLogic.keyBoardList = []
    }else{
      srsLogic.keyBoardList = srsLogic.keyBoardList.filter(k => k != event.keyCode)
    }
    console.log('按键被释放:', event.key,srsLogic.keyBoardList, event.keyCode);
  },
  // 显示srs 播放操作
  handleShowOpt(flag){
    srsLogic.srsOptShow = flag;
    if(flag){
      $(".srs_opt_con").show();
    }else{
      $(".srs_opt_con").hide();
    }
  },

  // 播放点击
  onSrsPlayClick: _.debounce(function() {
    var video = document.getElementById('SRS_Video');
    console.log("onSrsPlayClick: ====")
    video.play().then(() => {
      srsLogic.handleShowOpt(false)
      // 刷新srs播流控制
      let msg = dmData.mouseInfo.pkid+';0200'
      websocket.send(msg)
      systemUi.promptWindow({ title: '播放成功', time: 3000 });
    }).catch(error => {
      console.error("播放视频时出错:", error);
      systemUi.promptWindow({ title: '播放失败', time: 3000 });
    });
  }, 300),
  // 适配srs video 播流
  handleVideoSRSDom(){
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var srsWidth = dmData.mouseInfo.width || $("#SRS_Video").width();
    var srsHeight = dmData.mouseInfo.height || $("#SRS_Video").height();
    var screenRatio = dmData.mouseInfo.screenWidth / dmData.mouseInfo.screenHeight
    var scale = 1
    // 宽高过长
    /* if(srsWidth>=viewportWidth || srsHeight>=viewportHeight){
      
    } */
    // 高为准
    if(srsWidth/srsHeight <= viewportWidth/viewportHeight){
      scale = viewportHeight / srsHeight
    }
    // 宽为准
    if(srsWidth/srsHeight > viewportWidth/viewportHeight){
      scale = viewportWidth / srsWidth
    }
    srsLogic.scale = scale
    var width = srsWidth*scale
    var height = srsHeight*scale
    $("#SRS_Video").width(width);
    $("#SRS_Video").height(height);
    srsLogic.srsWidth = srsWidth
    srsLogic.srsHeight = srsHeight
    srsLogic.width = width
    srsLogic.height = height
    srsLogic.offset = $("#SRS_Video").offset();
    // 屏幕宽高设置 以高为准，居中展示
    srsLogic.screenWidth = screenRatio*height
    srsLogic.screenHeight = height
    $("#srs_screen_v").width(srsLogic.screenWidth);
    $("#srs_screen_v").height(srsLogic.screenHeight);
    srsLogic.scale = srsLogic.screenWidth / dmData.mouseInfo.screenWidth
    console.log("viewportWidth,viewportHeight: ",viewportWidth,viewportHeight,srsWidth,srsHeight,scale)
  },
  // 鼠标返回ws body数据
  /* 
  两个字节统一低位在前，高位在后
  字节1：0 鼠标 
  字节2：鼠标类型 鼠标无动作0 鼠标左键1  鼠标中键4   鼠标右键2  鼠标功能1  8  鼠标功能2  10
  字节3、4：x像素偏移值
  字节5、6：y像素偏移值

  鼠标无动作 x偏移20 y偏移10  16进制的字符消息示例：000014000A00
  */
  returnMouseMsg(type, x, y, z){
    let buffer = new Uint8Array(6);
    if(z){
      buffer= new Uint8Array(7);
    }
    
    buffer[0] = 0
    buffer[1] = type
    buffer[2] = x & 0xFF
    buffer[3] = x >> 8 & 0xFF
    buffer[4] = y & 0xFF
    buffer[5] = y >> 8 & 0xFF
    if(z){
      buffer[6] = z
    }
    let res = uCommon.arrayBufferToHex(buffer)
    // console.log("returnMouseMsg: ",res,buffer,type, x, y)
    return res
  },


  /*  键盘返回ws body数据
  字节1：1 键盘 
  字节2：键位值

  按键A 16进制的字符消息示例：0104
  */
  returnKeyboardMsg(code){
    let res = '01';
    res = res+code
    console.log("returnKeyboardMsg: ",res,code)
    return res
  },
}

$(function() {
  
})