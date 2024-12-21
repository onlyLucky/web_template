var utilsLogic = {
  plugin: [
    // {src: "./src/libs/jquery.ui.touch-punch.min.js", async: true},
    {src: "./src/utils/ajax.js"},
    {src: "./src/utils/util.js"},
    {src: "./src/utils/time.js"},
    {src: "./src/utils/uCommon.js"},
    {src: "./src/utils/waterMark.js"},
    {src: "./src/utils/websocket.js"},
  ],
  async load(){
    var tempStr = CONFIG.isCache?`?rand=${Math.random()}`:''
    // 加载lib
    return await Promise.all(utilsLogic.plugin.map(async item=>{
      item.src = item.src + tempStr
      await systemLogic.loadScript(item)
    }))
  },
}


utilsLogic.load()