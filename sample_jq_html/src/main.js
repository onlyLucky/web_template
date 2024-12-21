// 主入口


var systemLogic = {
  plugin: [
    {src: "./src/libs/index.js"}, // 加载lib
    {src: "./src/static/styles/index.js"}, // 加载样式
    {src: "./src/utils/index.js"}, // 加载 工具文件
    {src: "./src/apis/index.js"}, // 加载api
    {src: "./src/data/index.js"}, // 加载data
    {src: "./src/view/index.js"}, // 加载view 视图层
  ],
  // 加载js 文件
  loadScript(configObj){
    return new Promise((resolve, reject) => {
      var script = document.createElement('script');
      if(configObj.hasOwnProperty("src")){
        script.src = configObj.src;
      }
      if(configObj.hasOwnProperty("async")){
        script.async = configObj.async;
      }
      script.type = "text/javascript";
      // 监听加载完成
      script.onload = () => {
        resolve();
      };
      // 监听加载错误
      script.onerror = () => {
        reject(new Error(`Script load error for ${url}`));
      };
      document.head.appendChild(script);
    });
  },
  // 初始化加载
  async load(){
    // 加载config
    await systemLogic.loadScript({src: `./public/config.js?rand=${Math.random()}`})

    var tempStr = CONFIG.isCache?`?rand=${Math.random()}`:''

    await Promise.all(systemLogic.plugin.map(async item=>{
      item.src = item.src + tempStr
      await systemLogic.loadScript(item)
    }))
  },
  init(){
    // 重载
    systemLogic.load()
  }
}


var systemUi = {
  /**
   * @description:消息提示
   * @useMethods systemUi.promptWindow({title:'登录成功',time:3000})
   * @return {*}
   */
  promptWindow: function (title, time) {
    if (!title) { return false; }
    let config = {}
    if (Object.prototype.toString.call(title) == '[object String]') {
      config = { title }
    } else if (Object.prototype.toString.call(title) == '[object Object]') {
      config = title
    }
    config.time ? config.time : (config.time = time ? time : 2000)
    let html = ''
    html += '<div class="promptWindow">' + config.title + '</div>'
    $('#prompt .promptBox').append(html)
    promptTimer = setTimeout(function () {
      $('.promptWindow').eq(0).fadeOut('fast', 0)
      $('.promptWindow').eq(0).remove()
    }, config.time)
  },
}

systemLogic.init()

