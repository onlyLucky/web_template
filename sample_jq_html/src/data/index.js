var dataLogic = {
  plugin: [
    "./src/data/dmData.js",
    "./src/data/keyboardMenuData.js",
  ],
  async load(){
    var tempStr = CONFIG.isCache?`?rand=${Math.random()}`:''
    // 加载lib
    return await Promise.all(dataLogic.plugin.map(async item=>{
      await systemLogic.loadScript({src: `${item}${tempStr}`})
    }))
  },
}

dataLogic.load();