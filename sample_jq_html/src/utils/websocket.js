function createWebsocket(){
  var socket = null;
  // 心跳检测间隔（毫秒）
  const HeartbeatDelay = 30000;
  // 重连尝试间隔（毫秒）
  const ReconnectDelay = 5000;
  var reconnectCount = 10; // 重连次数

  var heartbeatTimer = null;// 心跳定时器
  var reconnectTimer = null;// 重连定时器

  var isConnected = false; // 是否连接成功

  
  function startHeartbeat() {
    heartbeatTimer = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('0;ping'); // 发送心跳消息
      }
    }, HeartbeatDelay); // 每30秒发送一次
  }
  
  function stopHeartbeat() {
    clearInterval(heartbeatTimer);
  }
  
  function init(){
    if(!socket) return;
    // 监听WebSocket连接打开事件
    socket.onopen = function(event) {
      isConnected = true;
      console.log('WebSocket连接已打开');
      startHeartbeat(); // 启动心跳检测
    };

    // 监听WebSocket接收到消息事件
    socket.onmessage = function(event) {
      console.log('收到消息:', event.data);
    };

    // 监听WebSocket错误事件
    socket.onerror = function(event) {
      isConnected = false;
      console.error('WebSocket发生错误:', event);
    };

    // 监听WebSocket连接关闭事件
    socket.onclose = function(event) {
      isConnected = false;
      console.log('WebSocket连接已关闭，准备重连...');
      stopHeartbeat()
      if(reconnectCount>=0){
        reconnect()
      }else{
        console.log('WebSocket连接已关闭，达到重连最高次数...');
      }
      
    };
  }

  // 重连
  function reconnect(){
    if(!isConnected){
      reconnectTimer = setTimeout(()=>{
        reconnectCount--;
        webkitLoad()
      },ReconnectDelay)// 5秒后重连
    }
  }

  function webkitLoad (){
    let rand = String(Math.floor(Math.random() * 100000000) + 10000000);
    if(dmData.nodeInfo.mac != "empty") rand=dmData.nodeInfo.mac
    socket = new WebSocket(CONFIG.websocketPath+rand)
    init()
  }

  function close(){
    socket.close()
  }

  var msgList = [];
  var preTimer = null
  var limitTime = 10
  function send(message,type){
    if(isConnected){
      msgList.push(message)
      if(preTimer == null){
        preTimer = setInterval(()=>{
          if(msgList.length>0){
            let msg = msgList.shift()
            if(type){
              console.log(msg, new Date().getTime())
            }
            socket.send(msg)
            console.log('堆栈执行中',msgList.length)
          }else{
            clearInterval(preTimer)
            // console.log('堆栈执行完成')
            preTimer = null
          }
        },limitTime)
      }
      
    }else{
      console.log("send msg is not connected")
    }
  }


  return {
    webkitLoad,
    close,
    send
  }
}

var websocket = createWebsocket();