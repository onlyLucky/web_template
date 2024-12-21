var apisLogic = {
  plugin: [
    "./src/apis/mouse.js",
    "./src/apis/system.js",
  ],
  async load(){
    var tempStr = CONFIG.isCache?`?rand=${Math.random()}`:''
    // 加载lib
    return await Promise.all(apisLogic.plugin.map(async item=>{
      await systemLogic.loadScript({src: `${item}${tempStr}`})
    }))
  },
}

apisLogic.load();