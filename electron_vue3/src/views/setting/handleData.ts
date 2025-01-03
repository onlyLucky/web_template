/*
 * @Author: fg
 * @Date: 2023-01-12 16:30:40
 * @LastEditors: fg
 * @LastEditTime: 2023-06-07 19:17:04
 * @Description: 处理动态数据
 */

const fs = require("fs");
import { join } from 'path'
import type { ConfigType } from 'typing/config'
import { ipcRenderer } from 'electron'

class HandleData {
  private config: ConfigType;
  public app_url: any;
  public menu: any[] = [];
  public mList: any[] = [];

  constructor() {
    this.config = {} as ConfigType;
    this.app_url = localStorage.getItem('app_url') || ''
    this.init()
  }

  getConfigItem(key?: ConfigKey): any {
    if (key) {
      console.log(key, this.config, 'key')
      return this.config[key]
    } else {
      return this.config
    }

  }

  init() {
    this.readFile()
  }

  uploadGetConfigItem(key?: ConfigKey): any {
    this.readFile();
    this.getConfigItem()
  }

  readFile() {
    this.menu = []
    console.log(this.app_url, 'this.app_url')
    if (!this.app_url) return false;
    this.config = JSON.parse(fs.readFileSync(join(this.app_url, '/config.json'), { encoding: 'utf8' }))
    let key: keyof ConfigType
    for (key in this.config) {
      if (this.config.hasOwnProperty(key)) {
        if ((this.config[key] as any).show) {
          let temp = JSON.parse(JSON.stringify(this.config[key]))
          temp.select = false
          temp.hover = false

          this.menu.push(temp)
        }
      }
    }
    this.menu[0].select = true;
    this.mList = this.toLine(this.menu)
    console.log(this.config, 'menu', this.mList)
  }
  // 树状数据扁平化
  /* toLine(data: any[]): any[] {
    return data.reduce((arr, { name, description, children = [] }) => arr.concat([{ name, description }], this.toLine(children)), [])
  } */

  toLine(data: any[]): any[] {
    return data.reduce(
      (arr, { name, description, children = [], show = true }) => {
        let temp: any[] = show ? [{ name, description }] : [];
        return arr.concat(temp, this.toLine(children))
      },
      []
    )
  }


  // 保存文件
  saveFile(config: ConfigType) {
    console.log(config, 'config')
    // zh-CN en-US
    fs.writeFileSync(join(this.app_url, '/config.json'), JSON.stringify(config))
    // 更新数据
    this.readFile()
  }
}

export default new HandleData();
