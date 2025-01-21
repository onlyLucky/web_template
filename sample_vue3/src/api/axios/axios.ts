import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import {getCookie,setCookie} from '../../utils/cookie'
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    },
});

interface requestConfig extends AxiosRequestConfig {
    headers: any
}
// axios实例拦截请求
service.interceptors.request.use(
    (config: requestConfig) => {
        const token = getCookie('token');
        if (token) {
            config.headers.token = token
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);
// axios实例拦截响应
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        }
        return response;
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            return Promise.reject(response.data);
        }
    },
);

/***
 * post 方法封装
 */
export function postMethod<T>(url:string,params?:any):Promise<T> {
    return new Promise((resolve, reject) => {
        service.post(url,params).then((res:any) => {
            if(res.data.code === 200  && res.headers['token'])  {
                setCookie('token',res.headers['token'],21600)
            }
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
/***
 * get 方法封装
 */
export function getMethod<T>(url:string,params?:any):Promise<T> {
    return new Promise((resolve, reject) => {
        service.get(url,params).then((res:any) => {
            if(res.data.code === 200  && res.headers['token'])  {
                setCookie('token',res.headers['token'],21600)
            }
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * 文件上传 方法封装
 */
export function uploadFile<T>(url:string,uploadForm:any):Promise<T>{
    const fd = new FormData()
    fd.append('projectId', uploadForm.projectId)
    fd.append('file', uploadForm.file)
    fd.append('pathId', uploadForm.pathId)
    fd.append('subPath', uploadForm.subPath)
    fd.append('otherInfo', uploadForm.otherInfo)
    return new Promise((resolve, reject) => {
        service.post(url,fd,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res:any) => {
            if(res.data.code === 200  && res.headers['token'])  {
                setCookie('token',res.headers['token'],21600)
            }
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}