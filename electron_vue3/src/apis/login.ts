/*
 * @Author: fg
 * @Date: 2022-12-27 10:19:32
 * @LastEditors: fg
 * @LastEditTime: 2023-03-30 15:41:21
 * @Description: 登录api 
 */
import http from "@/libs/request"

const path = {
  login: '/auth/client/login',
  getFileIp: '/enum/getFileIp',
  refresh: '/auth/refresh',//token 刷新
}

type loginType = {
  token: string,
  nickname: string,
  phone: string,
  id: number,
  deptId: number,
  deptName: string,
  userName: string,
  mobileType: number,
  userSex: number,
  avatarPath: string,
}
// : Promise<ResultData<loginType>>
export const goLogin = (params: object): Promise<ResultData<loginType>> => {
  return http.post<loginType>(path.login, params)
}

export const getFileIp = (params: object): Promise<ResultData<any>> => {
  return http.get(path.getFileIp, params)
}

// 刷新token
export const goRefresh = (params: object): Promise<ResultData<any>> => {
  return http.post<any>(path.refresh, params)
}