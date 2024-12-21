var loginLogic ={
  tencentLogin:{
    permission: null,
    meeting: null,
    authCodeFromUrl: '',
    CORP_ID: "", // 腾讯参数
    SDK_ID: "", // 腾讯参数
  },
  mouseData: [],// 鼠标数据
  
  /* 腾讯内部登录流程 start */
  initTAppApi() {
    let { permission, meeting } = wemeet;
    loginLogic.tencentLogin.permission = permission;
    loginLogic.tencentLogin.meeting = meeting;
    // 获取重定向传参 如果是授权页面重定向回来的会带上auth_code 
    let searchData = new URLSearchParams(location.search);
    loginLogic.tencentLogin.authCodeFromUrl = searchData.get('auth_code');
  },
  // 系统配置
  initTencentInfo() {
    return mouseApi.getTencentInfo().then((res) => {
      if (res.code == 0) {
        loginLogic.tencentLogin.CORP_ID = res.data.appId;
        loginLogic.tencentLogin.SDK_ID = res.data.sdkId;
        // 检测是否有授权
        loginLogic.initTencentHasAuth()
      } else {
        systemUi.promptWindow("获取腾讯信息失败", 3000);
      }
    })
    
  },
  async tencentLoginAuth(){
    loginLogic.initTAppApi();
    await loginLogic.initTencentInfo();
  },
  // 初始化终端授权判断
  async initTencentHasAuth() {
    // 如果用户曾授权过该应用，可以走静默授权的方式
    const getAuthCodePromise = loginLogic.tencentLogin.authCodeFromUrl ? Promise.resolve(loginLogic.tencentLogin.authCodeFromUrl)
      : loginLogic.tencentLogin.permission.requestAuthCode({ sdkId: loginLogic.tencentLogin.SDK_ID }).then(resp => resp.authCode);
    const authCode = await getAuthCodePromise.catch((err) => {
      console.error(err);
      return '';
    });

    if (!authCode) {
      // 去授权页获取auth_code
      loginLogic.tencentLogin.permission.authorize({
        corpId: loginLogic.tencentLogin.CORP_ID,
        sdkId: loginLogic.tencentLogin.SDK_ID,
        redirectURI: location.href,
        state: Math.floor(Math.random() * 1e5).toString(),
      });
      return;
    }

    return mouseApi.getJSApiAuth({
      authcode: authCode
    }).then(res => {
      //授权成功
      if (dmEnum.statusCode.success == res.code) {
        //设置终端已授权
        dmData.nodeInfo.isAuthorize = true;
        // 设置uuid
        dmData.nodeInfo.uuid = uCommon.generateShortUUID();
        if (res.data) {
          /**
           * 调用permission.agentConfig进行jsapi鉴权
           */
          var data = res.data;
          loginLogic.tencentLogin.permission.config({
            corpId: data.CORP_ID,
            sdkId: data.SDK_ID,
            timestamp: data.timestamp,
            nonceStr: data.nonce,
            signature: data.signature,
          })
            .then(() => {
              console.log('jsapi 鉴权成功');
              //设置终端所授权的会议室编号列表
              dmData.nodeInfo.roomNos = res.data.roomNos;

              //连接websocket
              // webkitLoad();
              // 当前设备是否绑定
              if (data.user) {
                /*获取当前的会议*/
                loginLogic.tencentLogin.meeting.getCurrMeetingInfo()
                  .then((resp) => {
                    // alert(JSON.stringify(resp))
                    console.log(JSON.stringify(resp));
                    dmData.meetingInfo.meetingCode = resp.meetingCode;
                    mouseApi.getMeetingsByUserCode({
                      userCode: data.user.userCode
                    }).then(res => {
                      if (dmEnum.statusCode.success == res.code) {
                        dmData.userInfo.id = res.data.userId
                        mouseApi.getUserInfo({
                          userId: res.data.userId
                        }).then(async resInfo => {
                          if (dmEnum.statusCode.success == resInfo.code) {

                            dmData.userInfo = $.extend(dmData.userInfo, resInfo.data)
                            dmData.userInfo.userRank = resInfo.data.rank
                            
                            await loginLogic.intoMeetingByCode()
                            // 获取ws地址
                            loginLogic.getWsPath()
                            loginLogic.getIotMouseData()
                            
                          }
                        })
                      }
                    })

                  }).catch(console.error);


              } else {
                // 绑定
                // TODO 加一个成功回调
                Utils.pageAppLoad("./views/main/login.html", function () {

                });
              }

            })
            .catch((err) => {
              systemUi.promptWindow({
                title: 'jsapi 鉴权失败,请联系管理员',
                time: 3000
              })
              console.error('jsapi 鉴权失败', err);
            });
        }

      }
    })
  },
  intoMeetingByCode() {
    return mouseApi.getMeetingInfoByCode({
      meetingCode: dmData.meetingInfo.meetingCode
    }).then((res) => {
      if (res.code == 0) {
        dmData.meetingInfo = res.data
      } else {
        systemUi.promptWindow({
          title: res.msg,
          time: 3000
        })
      }
    })
  },
  // 获取ws 
  getWsPath(){
    mouseApi.getIotWebsocket().then(res=>{
      if(res.code == dmEnum.statusCode.success){
        // 设置ws地址，然后连接ws
        if(res.data){
          CONFIG.websocketPath = res.data
          websocket.webkitLoad();
        }
      }else{
        systemUi.promptWindow({
          title: "获取物联网鼠标通讯ws地址失败",
          time: 3000
        })
      }
    }).catch(err=>{
      systemUi.promptWindow({
        title: "获取物联网鼠标通讯ws地址失败",
        time: 3000
      })
    })
  },
  getIotMouseData(){
    mouseApi.getIotMouse({
      roomNo: dmData.meetingInfo.roomNo
    }).then(res=>{
      if(res.code == dmEnum.statusCode.success){
        if(res.data && res.data.length>0){
          loginLogic.mouseData = res.data 
          dmData.mouseInfo = res.data[0]
          // srs 播流宽高设置
          if(res.data[0].screenSize){
            let [width, height] = res.data[0].screenSize.split(',').map(Number);
            width = isNaN(width) ? 0 : width;
            height = isNaN(height) ? 0 : height;
            dmData.mouseInfo.width = width||0
            dmData.mouseInfo.height = height||0
          }
          srsLogic.srsPath = CONFIG.srsUrl+dmData.mouseInfo.nodeNo
          // 进入srs 页面
          srsLogic.showSrsPage()
        }else{
          systemUi.promptWindow({
            title: "当前会议室下未绑定物联网鼠标",
            time: 3000
          })
        }
      }else{
        systemUi.promptWindow({
          title: "获取当前会议室下的物联网鼠标失败",
          time: 3000
        })
      }
    }).catch(err=>{
      systemUi.promptWindow({
        title: "获取当前会议室下的物联网鼠标失败",
        time: 3000
      })
    })
  },
  /* 腾讯内部登录流程 end */
  

  showLoginPage(){
    $(".mainPage").hide();
    $(".mainPage#Login").show();
    loginLogic.eventBind();
  },
  eventBind(){
    $(".mainPage#Login .loginBtn").unbind().bind('click',()=>{
      srsLogic.showSrsPage();
    })
  },
}

$(function() {
  console.log("login")
})