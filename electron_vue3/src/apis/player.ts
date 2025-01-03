/*
 * @Author: fg
 * @Date: 2023-06-05 17:35:43
 * @LastEditors: fg
 * @LastEditTime: 2023-06-13 09:27:27
 * @Description: 播放器api接口
 */
import http from "@/libs/request"

const path = {
  meetList: '/meeting/v2/list',
  downloadSubtitleByPath: '/downloadSubtitleByPath',
  deleteMeet: "/meeting/v2/delByName",
  delAll: '/meeting/delAll',
  editName: '/meeting/v2/setName',
  detailMeet: '/meeting/v2/infoById'
}

// 获取会议列表
export const getMeetList = (params: object): Promise<ResultData<any>> => {
  return http.get(path.meetList, params)
}

// 会议纪要导出
export const getDocBlob = (params: object): Promise<ResultData<any>> => {
  return http.get(path.downloadSubtitleByPath, params)
}

// 会议删除
export const deleteMeet = (params: object): Promise<ResultData<any>> => {
  return http.get(path.deleteMeet, params)
}

// 会议删除
export const deleteAllMeet = (params: object): Promise<ResultData<any>> => {
  return http.get(path.delAll, params)
}

// 会议重命名
export const editMeetName = (params: object): Promise<ResultData<any>> => {
  return http.get(path.editName, params)
}
// detailMeet
// 会议详情
export const getDetailMeet = (params: object): Promise<ResultData<any>> => {
  return http.get(path.detailMeet, params)
}