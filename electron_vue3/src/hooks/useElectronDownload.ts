/*
 * @Author: fg
 * @Date: 2023-02-08 15:07:47
 * @LastEditors: fg
 * @LastEditTime: 2023-06-06 13:24:50
 * @Description: electron 文件下载处理
 */
import hdObj from "_v/setting/handleData"
import { join } from 'path'
import { ipcRenderer } from "electron"
import _ from "lodash"
const fs = require('fs')
import { Blob, Buffer } from 'node:buffer';

// 文件存在
const downloadPath = hdObj.getConfigItem('download').downloadPath.value
// 需要下载的file
let needDownloadArr = reactive<any[]>([])
// 文件列表
let fileList = reactive<any[]>([])
// 储存文件夹
let directoryName = ref<string>('')

let downloadStatus = ref<0 | 1 | 2>(0); //下载状态 0 未下载 1下载中 2下载完成

// 总下载量
let downloadSize = 0;
// 下载进度
let progress = ref<number>(0)

/**
 * @description: 判断文件是否存在
 * @param {string} path
 * @return {*}
 */
const isHasFile = (path: string) => {
  return fs.existsSync(join(downloadPath, path))
}



/**
 * @description: 返回下载的 vue3 变量
 * @return {*}
 */
const useDownload = () => {
  return {
    downloadStatus,
    progress,
  }
}


// 监听
watchEffect(() => {
  // console.log(downloadStatus.value, 'val-downloadStatus', fileList, directoryName)
})

type optType = {
  list: any[],//下载列表信息
  directory: string,//下载存储文件夹
  onSuccess?: Function,
  onError?: Function
}

type successReturnType = {
  status: 0 | 1;
  progress: number;
}

/**
 * @description: 文件列表下载，文件下载监听（多个文件打包下载处理）
 * @param {optType} options
 * @return {*}
 */
const useDownloadOpt = (options: optType) => {
  const { list, directory, onSuccess, onError } = options;
  // 初始化数据
  initData()
  // 数据储存
  fileList = [...list]
  directoryName.value = directory



  // 处理需要下载文件
  list.map((item, index) => {
    // 检测文件是否存在
    if (!isHasFile(`/${directory}/${item.realName}`)) {
      downloadSize += item.fileSize
      needDownloadArr.push({
        fId: item.id,
        path: localStorage.getItem("staticPath") + item.fileUrl,
        directory,
        fileName: item.realName,
        fileSize: item.fileSize
      })
    }
  })
  if (needDownloadArr.length > 0) {
    // 多个下载（触发下载）
    ipcRenderer.send("download", needDownloadArr);
    downloadStatus.value = 1
    // 下载监听
    ipcRenderer.on("downloadUpload", (event, args) => {
      progress.value = Math.trunc((args.total / downloadSize) * 100)
      console.log(progress.value, args.total, downloadSize)
      if (onSuccess) {
        onSuccess({
          status: 1,
          progress: 100,
        } as successReturnType)
      }
    })
    ipcRenderer.on("downloadEnd", (event) => {
      console.log('downloadEnd')
      progress.value = 100
      downloadStatus.value = 2

    })
  } else {
    console.log('needDownloadArr', needDownloadArr.length)
    downloadStatus.value = 2
    if (onSuccess) {
      onSuccess({
        status: 0,
        progress: 0,
      } as successReturnType)
    }
  }

}

/**
 * @description: 初始化下载数据
 * @return {*}
 */
const initData = () => {
  // 初始化文件列表
  fileList = [];
  // 初始化需要下载列表
  needDownloadArr = [];
  // 初始化下载文件夹
  directoryName.value = ''
}
type NodeStreamOptType = {
  path: string;
  encoding?: string;
  streamContent: any;
}
const useNodeStreamDownload = (opt: NodeStreamOptType, finishCallback?: Function, errorCallback?: Function) => {
  let writeStream = fs.createWriteStream(opt.path, { encoding: 'utf8' });
  writeStream.write(opt.streamContent, "UTF8");
  // 标注结束
  writeStream.end();
  writeStream.on("finish", function () {
    if (finishCallback) finishCallback();
  });
  writeStream.on("error", function (err: any) {
    console.log(err, 'err--')
    if (errorCallback) errorCallback(err);
  });
}

export {
  downloadPath,
  isHasFile,
  useDownload,
  useDownloadOpt,
  useNodeStreamDownload
}