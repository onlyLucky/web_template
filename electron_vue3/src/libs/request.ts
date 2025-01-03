/*
 * @Author: fg
 * @Date: 2022-12-26 16:10:58
 * @LastEditors: fg
 * @LastEditTime: 2023-07-24 16:38:23
 * @Description: 请求接口封装
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios"
import { join } from 'path'
import { Message } from "view-ui-plus"
const fs = require('fs')
import ConfigData from "../../public/config/index.json"

let Config = ConfigData
let tempApp_url = localStorage.getItem('app_url') || ''
if (tempApp_url) {
  Config = JSON.parse(fs.readFileSync(join(tempApp_url, '/config.json'), { encoding: "utf8" }))
}


// 响应数据结构
interface Result {
  code: number;
  msg: string;
}

// 请求响应参数，包含data
interface ResultData<T> extends Result {
  data?: T;
}

enum RequestEnums {
  OVERDUE = 0,//登录失效
  SUCCESS = 200,//请求成功
  TIMEOUT = 20000,//超时时间
}
// const URL: string = '/api' Config.network.baseUrl.value
// console.log('Config.network.baseUrl.value:', Config.network.baseUrl.value)
const URL: string = Config.network.baseUrl.value
const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data"
  }
}

class Http {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     */
    this.service.interceptors.request.use(
      // (config: AxiosRequestConfig): AxiosRequestConfig => {
      (config) => {
        const token = localStorage.getItem('token') || '';
        if (token) {
          config.headers!['Authorization'] = token
        }
        return config
      },
      (err: AxiosError) => {
        console.log(err)
        Promise.reject(err)
      }
    )
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        if (data.code == RequestEnums.OVERDUE) {
          // TODO: 登录信息失效，重新获取token
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          Message.error(data.msg || '请求失败');
          return Promise.reject(data)
        }
        return data
      },
      (err: AxiosError) => {
        const { response } = err;
        if (response) {
          this.handleCode(response.status)
        }
        if (!window.navigator.onLine) {
          Message.error('网络连接失败')
        }
      }
    )
  }
  handleCode(code: number): void {
    let error: { message: string } = {
      message: ''
    }
    switch (code) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = '请求失败';
        break;
    }
    Message.destroy();
    Message.error({
      content: error.message || '请求失败',
      duration: 1
    });
  }

  // 常用方法封装
  get<T>(url: string, params?: object, config?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config });
  }
  post<T>(url: string, params?: object, config?: object): Promise<ResultData<T>> {
    let tempConfig: any = ''
    tempConfig = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    Object.assign(tempConfig, config)
    return this.service.post(url, params, tempConfig);
  }
  put<T>(url: string, params?: object, config?: object): Promise<ResultData<T>> {
    let tempConfig: any = ''
    tempConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    Object.assign(tempConfig, config)
    return this.service.put(url, params, tempConfig);
  }
  delete<T>(url: string, params?: object, config?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config });
  }

}

export default new Http(config)