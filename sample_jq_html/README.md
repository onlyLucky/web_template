## html js sample cli

基础分包按顺序加载js css 结构代码，后续加入打包处理。

1. [代码入口](./src/main.js)
2. [配置入口](./public/config.js) 打包放置静态资源
3. 导入逻辑
```js
// 核心返回一个promise 创建一个script link 自定义加载的配置项
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
}

```
多个js可以设置数组 便利引入，只是需要Promise.all，具体代码结构可以参考各个部分分包的[index.js](./src/libs/index.js) 


### 鼠标协议

两个字节统一低位在前，高位在后
字节1：0 鼠标 
字节2：鼠标类型 鼠标无动作0 鼠标左键1  鼠标中键4   鼠标右键2  鼠标功能1  8  鼠标功能2  10
字节3、4：x像素偏移值
字节5、6：y像素偏移值

鼠标无动作 x偏移20 y偏移10  16进制的字符消息示例：000014000A00

### 键盘协议

字节1：1 键盘 
字节2：键位值

按键A 16进制的字符消息示例：0104

//主要按键功能
"A" -> 0x04
"B" -> 0x05
"C" -> 0x06
"D" -> 0x07
"E" -> 0x08
"F" -> 0x09
"G" -> 0x0a
"H" -> 0x0b
"I" -> 0x0c
"J" -> 0x0d
"K" -> 0x0e
"L" -> 0x0f
"M" -> 0x10
"N" -> 0x11
"O" -> 0x12
"P" -> 0x13
"Q" -> 0x14
"R" -> 0x15
"S" -> 0x16
"T" -> 0x17
"U" -> 0x18
"V" -> 0x19
"W" -> 0x1a
"X" -> 0x1b
"Y" -> 0x1c
"Z" -> 0x1d
"1" -> 0x1e
"2" -> 0x2f
"3" -> 0x20
"4" -> 0x21
"5" -> 0x22
"6" -> 0x23
"7" -> 0x24
"8" -> 0x25
"9" -> 0x26
"0" -> 0x27
"Enter" -> 0x28
"Esc" -> 0x29
"Back" -> 0x2a
"Tab" -> 0x2b
"Space" -> 0x2c
"-" -> 0x2d
"=" -> 0x2e
"{" -> 0x2f
"}" -> 0x30
"\\" -> 0x31
"K42" -> 0x32
";" -> 0x33
"'" -> 0x34
"~" -> 0x35 //
"," -> 0x36 //,<
"." -> 0x37
"?" -> 0x38
"CapsLock" -> 0x39
"F1" -> 0x3A
"F2" -> 0x3B
"F3" -> 0x3C
"F4" -> 0x3D
"F5" -> 0x3E
"F6" -> 0x3F
"F7" -> 0x40
"F8" -> 0x41
"F9" -> 0x42
"F10" -> 0x43
"F11" -> 0x44
"F12" -> 0x45
"PrintScreen" -> 0x46
"ScrollLock" -> 0x47
"PauseBreak" -> 0x48
"Insert" -> 0x49
"Home" -> 0x4a
"PageUp" -> 0x4b
"Delete" -> 0x4c
"End" -> 0x4d
"PageDown" -> 0x4e
"Right" -> 0x4f
"Left" -> 0x50
"Down" -> 0x51
"Up" -> 0x52

//小键盘
"NumLock" -> 0x53
"S_/" -> 0x54
"S_*" -> 0x55
"S_-" -> 0x56
"S_+" -> 0x57
"S_Enter" -> 0x58
"S_1" -> 0x59
"S_2" -> 0x5a
"S_3" -> 0x5b
"S_4" -> 0x5c
"S_5" -> 0x5d
"S_6" -> 0x5e
"S_7" -> 0x5f
"S_8" -> 0x60
"S_9" -> 0x61
"S_0" -> 0x62
"S_Del" -> 0x63 // "." "Del"

"LCtrl" -> 0xE0.toByte()
"LShift" -> 0xE1.toByte()
"LAlt" -> 0xE2.toByte()
"LWin" -> 0xE3.toByte()
"RCtrl" -> 0xE4.toByte()
"RShift" -> 0xE5.toByte()
"RAlt" -> 0xE6.toByte()
"RWin" -> 0xE7.toByte()

//system键值
"S_SLEEP" -> 0xa0.toByte()
"S_POWER" -> 0xa1.toByte()
"S_WAKEUP" -> 0xa2.toByte()

//consumer键值
"C_Search" -> 0xa3.toByte()
"C_Home" -> 0xa4.toByte()
"C_Back" -> 0xa5.toByte()
"C_Forward" -> 0xa6.toByte()


//这部分普通键盘没有的按键   可以忽略
"K45" -> 0x64
"APP" -> 0x65
"Power" -> 0x66
"Equal" -> 0x67
"F13" -> 0x68
"F14" -> 0x69
"F15" -> 0x6a
"F16" -> 0x6b
"F17" -> 0x6c
"F18" -> 0x6d
"F19" -> 0x6e
"F20" -> 0x6f
"F21" -> 0x70
"F22" -> 0x71
"F23" -> 0x72
"F24" -> 0x73
"K107" -> 0x85.toByte()
"K56" -> 0x87.toByte()
"K133" -> 0x88.toByte()
"K14" -> 0x89.toByte()
"K132" -> 0x8a.toByte()
"K131" -> 0x8b.toByte()
"K150" -> 0x90.toByte()
"K151" -> 0x91.toByte()


### 开发日志

#### 24/09/05

- 新增[ajax.js](./src/utils/ajax.js) 请求工具函数
- 调整入口函数文件，utils入口函数 调用。
- 调整srs播流数据功能页面响应式宽高。
- 新增部分腾讯内部应用登录逻辑。

#### 24/09/06

- 完善腾讯内部应用登录流程，获取会议人员信息。
- 新增获取会议内部物联网鼠标。
- 新增获取ws配置地址。
- 腾讯内部环境联调。
- 新增[websocket](./src/utils/websocket.js)连接功能函数函数。
- 优化srs播放，添加失败状态重试。

#### 24/09/12
- 新增[键盘值的枚举](./src/data/keyboardMenuData.js)文件。
- 调整srs依赖文件加载顺序，script添加defer。
- 新增srs播流操作功能，添加视频事件监听事件，播放点击功能。
- 新增基本工具函数`arrayBufferToHex`ArrayBuffer并转换为十六进制字符串。
- 新增安卓端交互通信调试。
- 新增鼠标移动事件，键盘事件逻辑处理，消息通讯调用。

#### 24/09/23
- 新增特殊字符按键点击功能。
- 新增多键位点击功能逻辑，调整键盘点击释放处理。
- 调整滚动逻辑，传递坐标滚动值信息。

#### 24/09/26
- 调整不同系统，鼠标滚动问题，去除滚轮滚动事件

#### 24/09/28
- 修复部分按键释放事件未释放问题。
- 完善新键位。

#### 24/10/24
- 新增设备授权页面展示
- 新增设备选择model样式布局功能

#### 24/10/29
- 联调完善投流控制功能
- 新增切换设备功能逻辑。
- 新增设备授权流程。
- 修复右键点击影响功能问题。
#### 24/10/30
- 调整数据展示，更改设备列表展示。