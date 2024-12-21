var libsLogic = {
  plugin: [
    {src: "./src/libs/less-1.7.0.js"}, //less

    {src: "./src/libs/jquery-3.2.1.min.js"}, // jquery
    {src: "./src/libs/jquery-ui.min.js" ,defer: true},
    
    {src: "./src/libs/rem.js"}, // rem
    
    {src: "./src/libs/lodash_4.17.21.min.js"},

    {src: "./src/libs/srs/adapter-7.4.0.js"}, // SRS推流
    {src: "./src/libs/srs/srs.sdk.js"},
    {src: "./src/libs/srs/winlin.utility.js"},
    {src: "./src/libs/srs/srs.page.js"},
    {src: "./src/libs/srs/srs.js"},

    {src: "./src/libs/jquery.ui.touch-punch.min.js",defer: true}, // async 指示浏览器应该尽快异步地加载脚本，不阻塞页面的解析  defer 不立即执行脚本，而是等到整个页面解析完成后再执行
    
    // {src: "https://cdn.meeting.tencent.com/jssdk/wemeet-js-sdk-1.0.24.js"}, // 腾讯内部应用

    
  ],
  async load(){
    var tempStr = CONFIG.isCache?`?rand=${Math.random()}`:''
    // 加载lib
    return await Promise.all(libsLogic.plugin.map(async item=>{
      item.src = item.src + tempStr
      await systemLogic.loadScript(item)
    }))
  },
  async init(){
    await libsLogic.load();
    resizeRem(2200)
  }
}


libsLogic.init()