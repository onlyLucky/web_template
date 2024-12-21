var viewLogic = {
  routerName: "Auth",
  plugin: [
    "./src/view/login.js",
    "./src/view/srsPlay.js",
    "./src/view/auth.js",
    "./src/view/model/index.js",
  ],
  async load(){
    var tempStr = CONFIG.isCache?`?rand=${Math.random()}`:''
    // 加载lib
    return await Promise.all(viewLogic.plugin.map(async item=>{
      await systemLogic.loadScript({src: `${item}${tempStr}`})
    }))
  },
  // 显示主界面内容
  showMainPage(page){
    viewLogic.routerName = page
    $(".mainPage").hide();
    $(".mainPage#"+page).show();
  },
  // 系统枚举处理
  initEnums() {
    return mouseApi.getEnum().then((res) => {
      dmData.systemEnumList = [];
      dmData.systemEnumList = res.data;
      $.each(res.data, function (i, enumInfo) {
        //设置系统定义的枚举信息
        $.each(enumInfo.enums, function (key, value) {
          //判断枚举是否定义
          if (dmEnum[enumInfo.name]) {
            dmEnum[enumInfo.name][key] = value;
          } else {
            dmEnum[enumInfo.name] = {}
            dmEnum[enumInfo.name][key] = value;
          }
        });
      });
    }).catch(err=>{
      console.log(err)
    });
  },
  // 检查是否授权过
  InspectAuth(){
    return systemApi.getNodeToken({
      nodeMac: dmData.nodeInfo.mac
    }).then(res=>{
      if (dmEnum.statusCode.success == res.code) {
        //授权成功 
        selectNodeModel.showModel() // 获取设备列表
        // 获取ws地址
        loginLogic.getWsPath()
      }else if (dmEnum.statusCode.notPermissions == res.code) {
        //终端未授权
        authLogic.showAuthPage()
      }else {
        systemUi.promptWindow({
          title: res.msg,
          time: 3000
        })
      }
    })
  },
  
  async init(){
    dmData.nodeInfo.mac = uCommon.getUrlParam("mac")?uCommon.getUrlParam("mac"):'empty';
    await viewLogic.load();
    await viewLogic.initEnums()
    // 获取ws地址
    // await loginLogic.getWsPath()
    // await loginLogic.tencentLoginAuth()
    $("#fileLoading").show()
    await viewLogic.InspectAuth()
  },


}

window.onload=function(){
  viewLogic.init();
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);
}
