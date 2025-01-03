/*
 * @Author: fg
 * @Date: 2022-12-28 13:44:32
 * @LastEditors: fg
 * @LastEditTime: 2023-05-12 17:01:19
 * @Description: 会议api
 */


/* 
后缀缩写说明：
PT paramsType 接口请求参数类型 
RD res.data 返回res.data类型
*/
import http from "@/libs/request"

const path = {
  deviceList: '/device/deviceList',
  getMeetingById: '/meet/getMeetingById',
  deleteByIds: '/meet/deleteByIds',
  putMeet: '/meet',
  getMTListByMeetId: '/meetText/getListByMeetId',
  getMeetingUserBymeetId: '/meet/getMeetingUserBymeetIdAndNickname',
  deleteMeetConf: '/meet/deleteMeetConf',
  getAllFileByMeetId: "/meetFile/getAllFileByMeetId",
  getAudioByMeetId: "/meetText/getAudioByMeetId",// 会议纪要根据会议id获取音频信息
  getMeetSummary: '/meetText/getMeetSummary',// 获取会议纪要doc
  getMeetShareByMeetId: '/meetShare/getMeetShareByMeetId',//获取会议分享列表
  getPlayHistoryByUserId: '/playHistory/getPlayHistoryByUserId',// 获取视频的播放记录
  updatePlayHistory: "/playHistory/updatePlayHistory",// 更新播放视频时长
}

// 获取设备列表
export const getDeviceList = (params?: object): Promise<ResultData<any>> => {
  return http.get<any[]>(path.deviceList, params)
}

type listRD = {
  records: any[];
  total: number;
  [propsName: string]: any
}

// 根据会议id获取会议详情
export const getMeetingById = (params?: object): Promise<ResultData<listRD>> => {
  return http.get<listRD>(path.getMeetingById, params)
}

// 根据会议id获取用户列表
type meetUserPT = {
  meetId: number,
  nickname?: string,
  pageSize: number,
  pageNum: number
}
export const getMeetingUserBymeetId = (params: meetUserPT): Promise<ResultData<listRD>> => {
  return http.get<listRD>(path.getMeetingUserBymeetId, params)
}
// 根据会议id批量删除会议
export const deleteByIds = (params?: { ids: string }): Promise<ResultData<any>> => {
  return http.delete<any>(path.deleteByIds, params)
}
type putMeetPT = {
  id: number,
  secrecy?: number,//会议保密
  meetShare?: number,//会议分享
}
// 修改切换会议保密会议分享
export const reviseMeetDetail = (params: putMeetPT): Promise<ResultData<any>> => {
  return http.put(path.putMeet, params)
}
// 根据会议id获取会议详情
export const getMeetDetailById = (id: number): Promise<ResultData<any>> => {
  return http.get(`${path.putMeet}/${id}`)
}

// 通过会议id查询会议纪要列表
export const getMTListByMeetId = (params: any): Promise<ResultData<any>> => {
  return http.get(path.getMTListByMeetId, params)
}

type MeetIdPT = {
  meetId: number
}
// 退出会议
export const deleteMeetConf = (params: MeetIdPT): Promise<ResultData<any>> => {
  return http.delete(path.deleteMeetConf, params)
}

// 根据会议id获取会议文件
export const getAllFileByMeetId = (params: MeetIdPT): Promise<ResultData<any>> => {
  return http.get<{ data: any[] }>(path.getAllFileByMeetId, params)
}

// 会议纪要根据会议id获取音频信息
export const getAudioByMeetId = (params: MeetIdPT): Promise<ResultData<any>> => {
  return http.get<{ data: any[] }>(path.getAudioByMeetId, params)
}

// 获取会议纪要doc
export const getMeetSummary = (params: MeetIdPT): Promise<ResultData<any>> => {
  return http.get<{ data: any[] }>(path.getMeetSummary, params)
}

// 获取会议分享列表
export const getMeetShareByMeetId = (params?: object): Promise<ResultData<any>> => {
  return http.get<any>(path.getMeetShareByMeetId, params)
}

// 获取视频的播放记录
export const getPlayHistoryByUserId = (params?: object): Promise<ResultData<any>> => {
  return http.get<any>(path.getPlayHistoryByUserId, params)
}

// 更新视频播放记录
export const updatePlayHistory = (params?: object): Promise<ResultData<any>> => {
  return http.get<any>(path.updatePlayHistory, params)
} 