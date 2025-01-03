/*
 * @Author: fg
 * @Date: 2023-03-30 11:16:36
 * @LastEditors: fg
 * @LastEditTime: 2023-03-30 11:24:58
 * @Description: config
 */
const fs = require("fs");
import { join } from 'path'
import hdObj from "_v/setting/handleData"
export const useConfig = () => {
  let Config = hdObj.getConfigItem()
  return {
    Config
  }
}