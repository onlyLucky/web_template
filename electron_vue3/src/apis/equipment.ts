/*
 * @Author: fg
 * @Date: 2023-02-14 14:41:51
 * @LastEditors: fg
 * @LastEditTime: 2023-03-29 14:45:43
 * @Description: 设备功能api
 */

/* 
后缀缩写说明：
PT paramsType 接口请求参数类型 
RD res.data 返回res.data类型
*/
import http from "@/libs/request"

const path = {
  device: '/device',//获取设备列表表格
  downloadTemplate: '/device/downloadTemplate',//获取导入设备模板
  deleteBatch: '/device/deleteBatch',// 删除多个设备
  uploadDeviceFile: '/device/validationImportDevice',//上传设备
  importDevice: "/device/importDevice",//表格文件导入返回数据提交新增设备
  getMouseByDevice: '/device/getMouseByDevice',//获取设备鼠标信息
  updateMouse: '/device/updateMouse',//更新鼠标信息
  addUser: '/deviceUser/addUser',// 添加多个设备管理员
  delUser: '/deviceUser/deleteBatchBycurUserId', // 删除多个用户设备管理员
  getUserListByDeviceId: '/deviceUser/getUserListByDeviceId',//获取当前设备管理员
}

// 获取设备列表表格
type GetDevicePagePT = {
  pageSize: number;
  pageNum: number;
  name?: string;
};
export const getDevicePage = (params: GetDevicePagePT): Promise<ResultData<any>> => {
  return http.get<any[]>(path.device, params)
}

// 新增设备
export const postDevice = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.device, params, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
// 上传导入设备文件
export const postUploadDeviceFile = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.uploadDeviceFile, params)
}
// 表格文件导入返回数据提交新增设备
export const postImportDevice = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.importDevice, params)
}
//获取导入设备模板
export const getDownloadTemplate = (params?: any): Promise<any> => {
  // { responseType: 'arraybuffer' }
  return http.get(path.downloadTemplate, params, { responseType: 'arraybuffer', headers: { "Content-Type": "application/octet-stream" } })
}

// 根据id批量删除设备
export const deleteEquipByIds = (params?: { ids: string }): Promise<ResultData<any>> => {
  return http.delete<any>(path.deleteBatch, params)
}

// 获取设备详情
export const getDeviceDetail = (id: any): Promise<ResultData<any>> => {
  return http.get<any>(`${path.device}/${id}`, {})
}

// 获取设备鼠标详情
export const getMouseByDevice = (params: any): Promise<ResultData<any>> => {
  return http.get<any[]>(path.getMouseByDevice, params)
}

// 编辑设备信息
export const putDevice = (params: any): Promise<ResultData<any>> => {
  return http.put<any>(path.device, params)
}

// 更新设备鼠标信息
export const updateMouse = (params: any): Promise<ResultData<any>> => {
  return http.put<any>(path.updateMouse, params)
}

// 获取当前设备管理员
export const getUserListByDeviceId = (params: any): Promise<ResultData<any>> => {
  return http.get<any[]>(path.getUserListByDeviceId, params)
}

// 添加多个设备管理员
export const setDeviceUser = (params: any): Promise<ResultData<any>> => {
  return http.get<any[]>(path.addUser, params)
}

// 删除多个用户设备管理员
export const deleteDeviceUser = (params: any): Promise<ResultData<any>> => {
  return http.delete<any[]>(path.delUser, params)
}