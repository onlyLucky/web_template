import http from "@/libs/request"

const path = {
  meetChart: '/home/meetChart', // 查看会议图表
  deviceChart: '/home/deviceChart',// 查看设备图表
  getValueByItem: '/dictItem/getValueByItem',// 获取字典数据
  getMyNotice: '/noticeUser/getMyNotice',//获取我的消息
  readSignAll: '/noticeUser/readSignAll',// 我的消息全部已读
  deleteBatchNotice: '/noticeUser/deleteBatch',// 删除我的消息
}

type TypeChart = {
  type: 1 | 2 | 3;// 1 最近一周 2最近一月 3最近一年
}
export const getMeetChart = (params: TypeChart): Promise<ResultData<any>> => {
  return http.get(path.meetChart, params)
}
export const getDeviceChart = (params: TypeChart): Promise<ResultData<any>> => {
  return http.get(path.deviceChart, params)
}

// 获取字典数据
export const getDictItem = (params: any): Promise<ResultData<any>> => {
  return http.get(path.getValueByItem, params)
}

// 获取我的消息
export const getMyNotice = (params: any): Promise<ResultData<any>> => {
  return http.get(path.getMyNotice, params)
}

// 我的消息全部已读
export const setReadSignAll = (params?: any): Promise<ResultData<any>> => {
  return http.put(path.readSignAll, params)
}

export const deleteBatchNotice = (params: any): Promise<ResultData<any>> => {
  return http.delete(path.deleteBatchNotice, params)
}

