// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')

import { app, BrowserWindow, shell, ipcMain, Tray, Menu, nativeImage, dialog } from 'electron'
import { release } from 'os'
import { join } from 'path'
import _ from 'lodash';
const fs = require('fs')
const { setTimeout, setInterval, clearTimeout, clearInterval } = require('timers');
/* 调用外部exe文件 */
const exec = require('child_process').exec;

let Config = require(join(process.env.PUBLIC, 'config/index.json'))
const STORE_PATH = app.getPath('userData') // 获取应用的用户目录 C:\Users\XXX\AppData\Roaming\basic-app
if (!fs.existsSync(join(STORE_PATH, '/config.json'))) {
  // 配置默认缓存地址  C:\Users\feynman\Downloads\kelipi downloads
  Config.download.downloadPath.value = join(app.getPath('downloads'), '/kelipi')
  Config.download.children.map(item => {
    if (item.name == "downloadPath") {
      item.value = join(app.getPath('downloads'), '/kelipi')
    }
  })
  fs.writeFileSync(join(STORE_PATH, '/config.json'), JSON.stringify(Config))
} else {
  const data = JSON.parse(fs.readFileSync(join(STORE_PATH, '/config.json'), { encoding: "utf8" }))
  // 检测当前版本是否为最新的
  if (data.version && Config.version == data.version) {
    Config = data
  } else {
    Config.download.downloadPath.value = join(app.getPath('downloads'), '/kelipi')
    Config.download.children.map(item => {
      if (item.name == "downloadPath") {
        item.value = join(app.getPath('downloads'), '/kelipi')
      }
    })
    fs.writeFileSync(join(STORE_PATH, '/config.json'), JSON.stringify(Config))
  }
}
const url = require("url")

// 引入国际化
const lang = require(join(process.env.PUBLIC, 'lang/' + Config.language.lang.value + '.json'))

// Disable GPU Acceleration for Window 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// 主窗口
let win: BrowserWindow | null = null
// 登录窗口
let loginWin: BrowserWindow | null = null
// 视频播放
let playerWin: BrowserWindow | null = null
// 弹出层窗口
type ModelItemType = {
  type: 0 | 1 | 2 | 3,// 窗口类型 
  path: string,
  win: BrowserWindow,
  id: number
}
let modelWins: Array<ModelItemType> = [];
// 当前聚焦的窗口
let focusWin: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const urlPath = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
let loadPath = process.env.VITE_DEV_SERVER_URL ? urlPath : indexHtml

// 下载map堆栈
let DownloadListMap = new Map
let DownloadDataMap = new Map();
let downloadState = []//已下载总量 多个同时下载
let downloadTotal = 0

// 播放下载器 (多个下载管道，最新版本下载)
let DownloaderPlayMap = new Map();


function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    // @ts-ignore i18n.global.t('appName')
    title: lang.appName,
    icon: join(process.env.PUBLIC, 'logo.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    // 去掉最顶部的导航，以及最大化、最小化、关闭按钮
    frame: false
  })
  win.setMenu(null)
  // 替换聚焦窗口
  focusWin = win;
  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(urlPath + '#/home')
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  } else {
    win.loadURL(url.format({
      pathname: indexHtml,
      protocol: 'file:',
      slashes: true,
      hash: "home"
    }))
    if(Config.windows.isOpenDebug.value){
      win.webContents.openDevTools()
    }
  }
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  win.on('close', (e) => {
    e.preventDefault();  //阻止窗口的关闭事件
    focusWin = win
    win.hide();
  })
  // win 主场口downloadItem 下载任务监听
  /* win.webContents.session.on('will-download', (event, item, webContents) => {
    downloadTotal += item.getTotalBytes()
    console.log('downloadTotal:', downloadTotal, item.getTotalBytes())
    // new URL(item.getURL()).searchParams.get('id') 获取id
    let temp = DownloadDataMap.get(`${item.getFilename()}_${new URL(item.getURL()).searchParams.get('id')}`)
    // TODO: 静态资源服务器不支持文件断点续传 暂时储存downloadItem 方便后面的操作
    DownloadDataMap.set(`${item.getFilename()}_${new URL(item.getURL()).searchParams.get('id')}`, {
      ...temp,
      downloadItem: item
    })
    item.setSavePath(join(Config.download.downloadPath.value, `/${temp.directory}/${temp.fileName}`))
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
        item.resume()
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          downloadState[temp.id] = item.getReceivedBytes()
          const progress = _.sum(downloadState) / downloadTotal
          // 想渲染端传递更新数据
          win.webContents.send('downloadUpload', {
            total: _.sum(downloadState),//多个会议文件的下载size
            needTotal: downloadTotal,//需要下载的总量。
            progress: item.getReceivedBytes(),// 当前文件的下载size
            fileName: temp.fileName//当前正在下载的文件名称，用于后续文件列表下载识别
          })
          win.setProgressBar(progress)
          // console.log(`Received bytes: ${item.getReceivedBytes()}`,)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        // console.log('Download successfully', temp.fileName)
        //如果窗口还在的话，去掉进度条
        if (!win.isDestroyed()) {
          win.setProgressBar(-1);
        }
        DownloadDataMap.delete(`${item.getFilename()}_${new URL(item.getURL()).searchParams.get('id')}`)
        if (DownloadDataMap.size <= 0) {
          // 初始化
          downloadState = []
          downloadTotal = 0
          win.webContents.send('downloadEnd')
        }
      } else {
        win.webContents.send('downloadError')
        dialog.showErrorBox('下载失败', `文件因为某些原因被中断下载`);
        console.log(`Download failed: ${state}`)
      }
    })
  }) */
}
function createLoginWin() {
  loginWin = new BrowserWindow({
    width: 710,
    height: 426,
    resizable: false,
    transparent: true,
    backgroundColor: '#00000000',
    // @ts-ignore i18n.global.t('login.name')
    title: lang.login,
    // 去掉最顶部的导航，以及最大化、最小化、关闭按钮
    frame: false,
    icon: join(process.env.PUBLIC, 'logo.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },

  })
  loginWin.setMenu(null)
  // 设置聚焦窗口
  focusWin = loginWin
  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    loginWin.loadURL(urlPath)
    // Open devTool if the app is not packaged
    loginWin.webContents.openDevTools()
  } else {
    loginWin.loadFile(indexHtml)
    if(Config.windows.isOpenDebug.value){
      loginWin.webContents.openDevTools()
    }
  }

  loginWin.webContents.focus()
  // loginWin.focus()
  loginWin.on('close', (e) => {
    e.preventDefault();  //阻止窗口的关闭事件
    focusWin = loginWin
    loginWin.hide();
  })
  loginWin.once('ready-to-show', () => {
    loginWin.show();
  });
}

// 创建视频窗口
function createPlayerWin() {
  // playerWin

  playerWin = new BrowserWindow({
    width: 1000,
    height: 650,
    minWidth: 1000,
    minHeight: 650,
    resizable: true,
    // @ts-ignore i18n.global.t('login.name')
    title: "electron vue3", // 视频播放器
    // 去掉最顶部的导航，以及最大化、最小化、关闭按钮
    frame: false,
    icon: join(process.env.PUBLIC, 'logo.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    show: false,// 设置窗口初始不显示

  })
  playerWin.setMenu(null)
  // 设置聚焦窗口
  focusWin = playerWin
  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    playerWin.loadURL(urlPath)
    // Open devTool if the app is not packaged
    playerWin.webContents.openDevTools()
  } else {
    playerWin.loadFile(indexHtml)
    if(Config.windows.isOpenDebug.value){
      playerWin.webContents.openDevTools()
    }
  }
  playerWin.webContents.focus()
  // loginWin.focus()
  playerWin.on('close', (e) => {
    e.preventDefault();  //阻止窗口的关闭事件
    focusWin = playerWin
    playerWin.hide();
  })
  // 监听新窗口完成加载事件
  playerWin.webContents.once('did-finish-load', () => {
    // 加载完成后显示窗口
    setTimeout(() => {
      playerWin.show();
    }, 300)
  });
  /* playerWin.once('ready-to-show', () => {
    playerWin.show();
  }); */
}

// 托盘对象
let tray;
let timeCount = 0;
app.whenReady().then(() => {
  // createLoginWin()
  createPlayerWin();
  // 创建托盘
  const icon = nativeImage.createFromPath(join(process.env.PUBLIC, 'resources/logo.png'))
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开应用',
      icon: join(process.env.PUBLIC, 'resources/icons/icon_open.png'),
      click: () => {
        winActive()
      }
    },
    {
      label: '应用重启',
      icon: join(process.env.PUBLIC, 'resources/icons/icon_replay.png'),
      click: () => {
        app.relaunch()
        app.exit()
      }
    },
    {
      label: '退出应用',
      icon: join(process.env.PUBLIC, 'resources/icons/icon_close.png'),
      click: () => {
        if (process.platform !== 'darwin') {
          loginWin = null;
          win = null
          playerWin = null
          app.exit(0);
        }
      }
    },
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip(Config.appName)
  tray.setTitle('This is my title')
  // 任务栏点击事件

  tray.on('click', function (Event) {
    winActive()
  })
  // 任务栏双击点击事件
  tray.on('double-click', function () {
    timeCount = 1
    setTimeout(() => {
      timeCount = 0
    }, 300)
  })

  // 注册全局快捷键

})

// 激活窗口
function winActive() {
  setTimeout(() => {
    if (timeCount === 0) {
      focusWin.show();
      timeCount = 0
    }
  }, 300)
}

// 应用加载后
app.on('ready', function () {
})

// 在应用程序退出时发出
app.on('quit', (e) => {
  if (global.system.config.isNeedUpload) {
    fs.writeFileSync(join(STORE_PATH, '/config.json'), JSON.stringify(global.system.config.data))
  }
  console.log('quit')
})

// 当所有的窗口都被关闭时触发
app.on('window-all-closed', (e) => {
  console.log('window-all-closed')
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})
// 当应用被激活时发出。
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// 全局对象
global.system = {
  config: {
    isNeedUpload: false,
    data: Config
  }
}

// 获取全局对象
ipcMain.handle('get_global', (e, keys) => {
  let temp = global
  keys.map(item => {
    temp = temp[item]
  })
  return temp
})
// 设置全局对象
ipcMain.on('set_global', (e, keys, value) => {
  let temp = 'global'
  // let tempValue = JSON.parse(value)
  keys.map(item => {
    temp = `${temp}["${item}"]`
  })
  eval(`${temp}=${value}`)
  console.log(global.system.config.isNeedUpload, 'isNeedUpload', global.system.config.data.version)
})
// 更新系统配置文件
ipcMain.on('upload_config', (e, value) => {
  Config = value
})

let tokenTimer = null;
let tokenTime = 0;
// 接收num change改变的通信
ipcMain.on('num_change', (event, arg) => {
  console.log(arg, 'num_change')
  /* BrowserWindow.getAllWindows().forEach(v => {
    v.send('num_change', arg)
  }) */
})

// 窗口最小化
ipcMain.on('window_min', (event, arg) => {
  BrowserWindow.getFocusedWindow().minimize();
})
// 窗口 最大化、恢复
ipcMain.on('window_max', function () {
  if (BrowserWindow.getFocusedWindow().isMaximized()) { // 为true表示窗口已最大化
    BrowserWindow.getFocusedWindow().restore();// 将窗口恢复为之前的状态.
  } else {
    BrowserWindow.getFocusedWindow().maximize();
  }
  BrowserWindow.getFocusedWindow().webContents.send('window_max_status', BrowserWindow.getFocusedWindow().isMaximized())
})

ipcMain.on('win_full', (event, flag) => {
  BrowserWindow.getFocusedWindow().setFullScreen(flag);
})

// 应用重启
ipcMain.on('win_reset', function () {
  app.relaunch()
  app.exit()
})

ipcMain.on('on_login_out', (event, arg) => {
  createLoginWin()
  tokenTime = 0
  clearInterval(tokenTimer)
  BrowserWindow.getAllWindows().forEach(v => {
    if (v.id != loginWin.id) {
      v.webContents.close()
    }
  })
  win = null;
})

ipcMain.on('quit_app', (event, arg) => {
  if (process.platform !== 'darwin') {
    playerWin.setProgressBar(-1);
    loginWin = null;
    win = null
    playerWin = null
    app.exit(0);
  }
})
ipcMain.on('on_login', (event, arg) => {
  BrowserWindow.getFocusedWindow().close();
  loginWin = null;
  /* tokenTimer = setInterval(() => {
    tokenTime = tokenTime + 10;
    if (tokenTime >= Config.network.timeOut.value - 60 * 10) {
      BrowserWindow.getFocusedWindow().webContents.send('timeout')
    }
  }, 10000) */
  createWindow()
})
//  关闭定时器
ipcMain.on('clear_timeout', (event, arg) => {
  // Config.network.timeOut.value - 60*10
  tokenTime = 0
  clearInterval(tokenTimer)
  tokenTimer = setInterval(() => {
    tokenTime = tokenTime + 10;
    if (tokenTime >= Config.network.timeOut.value - 60 * 10) {
      BrowserWindow.getFocusedWindow().webContents.send('timeout')
    }
  }, 10000)
})
// 关闭窗口
ipcMain.on('window_close', function (e) {
  let temp = BrowserWindow.getFocusedWindow()
  if (loginWin) {
    focusWin = loginWin
    e.preventDefault();  //阻止窗口的关闭事件
    focusWin.hide();
  } else if (win && win.id == temp.id) {
    focusWin = win
    e.preventDefault();  //阻止窗口的关闭事件
    focusWin.hide();
  } else {
    temp.close()
  }
  /* focusWin = BrowserWindow.getFocusedWindow()
  if (!focusWin.isFocused()) {
    focusWin = null;
  } else {
    e.preventDefault();  //阻止窗口的关闭事件
    focusWin.hide();
  } */
  // BrowserWindow.getFocusedWindow().close();
})

// 初始化传递app_url 语言
ipcMain.on('get_app', function (event) {
  playerWin.webContents.send('set_url', STORE_PATH, Config.language.lang.value)
  /*  setTimeout(() => {
     BrowserWindow.getFocusedWindow().webContents.send('set_url', STORE_PATH, Config.language.lang.value)
   }, 1000) */
})
ipcMain.on('set_config', function (event, key, value) {
  // console.log(url, arg)
  BrowserWindow.getAllWindows().forEach(v => {
    v.webContents.send("config_change", key, value)
  })
})
// 下载触发
ipcMain.on('download', function (event, list) {
  if (DownloadDataMap.size <= 0) {
    downloadState = new Array(list.length).fill(0);
    list.map((item, index) => {
      item.id = index;
      // downloadTotal += item.fileSize
      // _.last(item.path.split('/'))
      DownloadDataMap.set(`${_.last(item.path.split('/'))}_${item.fId}`, item)
      BrowserWindow.getFocusedWindow().webContents.downloadURL(`${item.path}?id=${item.fId}`)
    })
  } else {
    // TODO: 当前下载中未结束，有进行点击创建下载任务，处理堆栈信息
    dialog.showMessageBox({
      message: '当前已有下载任务执行中，请等待下载任务结束'
    })
  }
  /* DownloadDataMap.set(_.last(args.path.split('/')), args)
  BrowserWindow.getFocusedWindow().webContents.downloadURL(args.path) */
})



// 保存文件触发文件储存地址选择
ipcMain.on('showSaveFile', function (event, data) {
  // console.log(data, 'data')
  dialog.showSaveDialog({
    title: '另存为',
    defaultPath: join(Config.download.downloadPath.value, data.name),
    buttonLabel: "保存",
    filters: data.filters || [],
    properties: ['showHiddenFiles']
  }).then(res => {
    if (!res.canceled) {
      BrowserWindow.getFocusedWindow().webContents.send('sendSaveFileResult', {
        filePath: res.filePath
      })
    }
  }).catch(err => {
    console.log(err, 'err')
  });
})
// 选择文件触发文件储存地址选择
ipcMain.on('showSelectFile', function (event, data) {
  // console.log(data, 'data')
  dialog.showOpenDialog({
    title: '请选择',
    buttonLabel: "选择",
    filters: data.filters || [],
    properties: data.properties || ['openFile']//, 'openDirectory'
  }).then(res => {
    if (!res.canceled) {
      BrowserWindow.getFocusedWindow().webContents.send('sendSelectFileResult', {
        filePath: res.filePaths[0]
      })
    }
  }).catch(err => {
    console.log(err, 'err')
  });
})


// 监听图标闪动事件
let iconShakeTimer = null;
ipcMain.on('icon_shake', (event, arg: boolean) => {
  console.log(arg, 'icon_shake')
  if (arg) {
    let icon_space = nativeImage.createFromPath(join(process.env.PUBLIC, 'resources/logo_space.png'))
    let icon_active = nativeImage.createFromPath(join(process.env.PUBLIC, 'resources/logo_active.png'))
    let flag = true;
    iconShakeTimer = setInterval(() => {
      if (flag) {
        tray.setImage(icon_active);
        flag = false;
      } else {
        tray.setImage(icon_space);
        flag = true;
      }
    }, 500)
  } else {
    let icon_logo = nativeImage.createFromPath(join(process.env.PUBLIC, 'resources/logo.png'))
    clearInterval(iconShakeTimer)
    tray.setImage(icon_logo)
  }
  // event.sender.send('icon_shake_suc')
})

// New window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  console.log('new win ++', arg)
  createModelWin(arg)
})

// 创建model窗口
type OptType = {
  type?: 0 | 1 | 2 | 3,// 窗口类型
  urlName: string,
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
  title?: string,
  resizable?: boolean, //是否允许改变主窗口尺寸
  skipTaskbar?: boolean,//是否在任务栏中显示窗口
}
function createModelWin(
  { width = 1024, height = 700, minWidth = 1024, minHeight = 700, title = "Main window", resizable = true, skipTaskbar = false, urlName, type }: OptType
) {
  // 判断是否为同一个窗口
  let tempItem: any = null
  modelWins.map(item => {
    if (urlName == item.path) {
      tempItem = item
    }
  })
  if (tempItem) {
    tempItem.win.show();
    return tempItem.win
  }
  // 判断当前窗口配置
  let closeWinArr = []
  let tempModelWins = []
  if (modelWins.length >= Config.windows.winsNum.value) {
    modelWins.map((item, indexs) => {
      if (indexs >= Config.windows.winsNum.value - 1) {
        closeWinArr.push(indexs)
      } else {
        tempModelWins.push(item)
      }
    })
    closeWinArr.map(item => {
      modelWins[item].win.close()
    })
    modelWins = tempModelWins
  }
  let modelWin = new BrowserWindow({
    width,
    height,
    minWidth,
    minHeight,
    title,
    resizable,
    skipTaskbar,
    icon: join(process.env.PUBLIC, 'logo.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    show: false,// 设置窗口初始不显示
    // 去掉最顶部的导航，以及最大化、最小化、关闭按钮
    frame: false
  });
  modelWin.setMenu(null)

  if (process.env.VITE_DEV_SERVER_URL) {

    modelWin.loadURL(`${urlPath}#/${urlName}`)
    modelWin.webContents.openDevTools()
  } else {
    modelWin.loadURL(url.format({
      pathname: indexHtml,
      protocol: 'file:',
      slashes: true,
      hash: urlName
    }))
    if(Config.windows.isOpenDebug.value){
      modelWin.webContents.openDevTools()
    }
  }

  /* modelWin.once('ready-to-show', () => {
    modelWin.show();
  }); */
  // 监听新窗口完成加载事件
  modelWin.webContents.once('did-finish-load', () => {
    // 加载完成后显示窗口
    setTimeout(() => {
      modelWin.show();
    }, 300)
  });

  modelWin.on('close', () => {
    modelWins.map((item: ModelItemType, index: number) => {
      if (item.id == modelWin.id) {
        modelWins.splice(index, 1)
      }
    })
    // modelWins.delete(modelWin);
    console.log(modelWins.length, 'len modelWins-closed id', modelWin.id)
    modelWin = null;
  });
  // 视频下载监听
  modelWin.webContents.session.on('will-download', (event, item, webContents) => {
    let parent = new URL(item.getURL()).searchParams.get('parent').split(',')
    let tempItemData = DownloaderPlayMap.get(Number(parent[0]))
    // 文件保存路径
    let saveLocalPath = ''
    // 判断当前是否自定义保存路径
    /* if (tempItemData && tempItemData.isCustomPath) {
      if (_.isEmpty(tempItemData.directory)) {
        saveLocalPath = join(tempItemData.savePath, `/${tempItemData.files[Number(parent[1])].name}`)
      } else {
        saveLocalPath = join(tempItemData.savePath, `/${tempItemData.directory}/${tempItemData.files[Number(parent[1])].name}`)
      }
    } else {
      // 走系统默认路径
      if (_.isEmpty(tempItemData.directory)) {
        saveLocalPath = join(Config.download.downloadPath.value, `/${tempItemData.files[Number(parent[1])].name}`)
      } else {
        saveLocalPath = join(Config.download.downloadPath.value, `/${tempItemData.directory}/${tempItemData.files[Number(parent[1])].name}`)
      }
    } */
    // 走系统默认路径
    if (_.isEmpty(tempItemData.directory)) {
      saveLocalPath = join(Config.download.downloadPath.value, `/${tempItemData.files[Number(parent[1])].name}`)
    } else {
      saveLocalPath = join(Config.download.downloadPath.value, `/${tempItemData.directory}/${tempItemData.files[Number(parent[1])].name}`)
    }
    item.setSavePath(saveLocalPath)

    // 添加 'updated' 事件监听器
    item.addListener('updated', onUpdated)
    item.once('done', (event, state) => {
      if (state === 'completed') {
        // 移除 'updated' 事件监听器
        item.removeListener('updated', onUpdated)
        // 监听所有文件下载完成
        if (tempItemData.progress >= 100) {
          //如果窗口还在的话，去掉进度条
          if (!playerWin.isDestroyed()) {
            playerWin.setProgressBar(-1);
          }
          // 通知渲染端完成下载、
          webContents.send('downloadEnd', tempItemData)
          // 移除下载进程Map
          DownloaderPlayMap.delete(Number(parent[0]))
          // 移除所有的更新事件
          item.removeAllListeners('updated')

        }
      } else {
        webContents.send('downloadError', state)
        dialog.showErrorBox('下载失败', `文件因为某些原因被中断下载`);
        console.log(`Download failed: ${state}`)
      }
    })

    function onUpdated(event, state) {

      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
        setTimeout(() => {
          // item.resume()
          item.pause()
          let errorTxt = '下载中断'
          if (item.getTotalBytes() == 0) {
            errorTxt = `下载中断，下载文件大小为空`;
          }
          webContents.send('downloadError', errorTxt)
          if (!playerWin.isDestroyed()) {
            playerWin.setProgressBar(-1);
          }
        }, 200)
        return;
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          let tempTotal = 0; // 文件总量
          let tempReceived = 0// 下载总量
          // 更新文件的大小
          tempItemData.files.map((fileItem, index) => {
            if (index == Number(parent[1])) {
              fileItem.fileSize = item.getTotalBytes();
              fileItem.downloadSize = item.getReceivedBytes();
              fileItem.progress = parseFloat((item.getReceivedBytes() / item.getTotalBytes() * 100).toFixed(2));
            }
            tempTotal += fileItem.fileSize
            tempReceived += fileItem.downloadSize
          })
          tempItemData.totalSize = tempTotal
          tempItemData.dSize = tempReceived
          tempItemData.progress = parseFloat((tempItemData.dSize / tempItemData.totalSize * 100).toFixed(2));
          // TODO: 暂时不确定要更新下载进程下载数据

          // console.log('downloading...', tempItemData.files[Number(parent[1])].name, '---', tempItemData.files[Number(parent[1])].fileSize, '---', tempItemData.files[Number(parent[1])].downloadSize)
          // console.log('tempItemData.progress:', tempItemData.progress)
          playerWin.setProgressBar(tempItemData.progress)
          // 向渲染端传递更新数据
          webContents.send('dPlayerUpload', tempItemData)
          // console.log(`Received bytes: ${item.getReceivedBytes()}`,)
        }
      }
    }
  })

  modelWins.push({
    type,
    path: urlName,
    win: modelWin,
    id: modelWin.id
  }); //将窗口添加到已打开时设置的窗口
  console.log(modelWins.length, 'len modelWins-add id', modelWin.id)
  return modelWin;
}


// 处理url拼接添加参数
function handleUrlSplicing(url) {
  return {
    addParam(key, value) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      return this;
    },
    toString() {
      return url;
    }
  };
}

// 播放器下载
ipcMain.on('download_player', function (event, process) {
  // DownloaderPlayMap.size 做下载数限制
  /* 
  dialog.showMessageBox({
      message: '当前已有下载任务执行中，请等待下载任务结束'
    })
  */
  // 数据处理
  let temp = []
  let tempKey = DownloaderPlayMap.size;
  process.files.map((item: any, index: number) => {
    item.fileSize = 0;
    item.downloadSize = 0;
    item.parent = [tempKey, index];
    item.progress = 0;
    temp.push(item)
  })
  // 创建下载数据 （Map  key=>Map.size   value：当前下载进程的信息）（功能更新说明，减少文件大小数据的依赖，添加文件下载自定义文件目录，整理总体数据）
  DownloaderPlayMap.set(tempKey, {
    files: temp,// 文件列表，其中必须包含name 文件名,path 访问下载路径,（fileSize: 文件大小，downloadSize 已下载大小）
    savePath: process.savePath || '',//保存路径
    totalSize: 0,//下载总量
    dSize: 0,//已下载大小
    progress: 0,//下载总进度
    directory: process.directory ? process.directory : '',// 保存文件夹名称
    isSingFile: process.isSingFile ? true : false,//判断是否为单独的一个文件
    isCustomPath: process.isCustomPath ? true : false,//是否自定义保存路径
    index: process.index ? process.index : 0,//外部下载列表的下标，方便返回下载进度数据更新。
  })
  temp.map(item => {
    let tempUrl = handleUrlSplicing(item.path).addParam('parent', item.parent.toString()).toString();
    BrowserWindow.getFocusedWindow().webContents.downloadURL(tempUrl)
  })
})
