/*
 * @Author: fg
 * @Date: 2023-03-16 17:14:52
 * @LastEditors: fg
 * @LastEditTime: 2023-04-03 15:07:54
 * @Description: user api
 */

import http from "@/libs/request"

const path = {
  dept: '/dept',//获取部门结构
  downloadTemplate: '/user/downloadTemplate',//下载人员模板文件
  user: '/user',// 获取用户 新增用户
  getUserByDeptIdPage: '/user/getUserByDeptIdPage',// 根据用户组织结构获取用户
  getUserCareer: '/userCareer/getAllNoPageList',// 获取职位列表
  deleteUser: '/user/deleteBatch',// 删除用户
  quitJobUser: '/user/quitJobUser', // 离职
  updatePassward: '/user/updatePassward', // 重置用户密码
  upload: '/user/upload',// 用户上传头像
  validateUserName: '/user/validateUserName',// 校验登录账号唯一性
  userUpdateRole: '/role/userUpdateRole',// 更新用户角色
  updateDept: '/user/updateDept',// 更新部门数据
  getDeptByUserId: '/dept/getDeptByUserId',// 根据用户id获取部门数据
  userCareer: '/userCareer',//职位
  deleteUserCareer: '/userCareer/deleteBatch',//删除多个职位
  getParUserByDeptId: '/user/getParUserByDeptId',//根据部门id 获取上下级用户
  validationImportUser: '/user/validationImportUser', //解析xlsx用户数据
  importUser: '/user/importUser',// 解析xlsx数据，添加人员
  getOrgDept: '/user/getOrgDept',// 获取部门数据
  userInfo: '/home/user', //获取用户信息
}

// 获取部门信息
export const getDept = (): Promise<ResultData<any>> => {
  return http.get(path.dept, {})
}

// 新增部门
export const addDept = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.dept, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 更新部门
export const uploadDept = (params: any): Promise<ResultData<any>> => {
  return http.put<any>(path.dept, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 删除部门
export const deletedDept = (params: { id: any }): Promise<ResultData<any>> => {
  return http.delete<any>(path.dept, params)
}

//获取导入设备模板
export const getDownloadTemplate = (params?: any): Promise<any> => {
  return http.get(path.downloadTemplate, params, { responseType: 'arraybuffer', headers: { "Content-Type": "application/octet-stream" } })
}
// 获取用户
export const getUserList = (params: any): Promise<ResultData<any>> => {
  return http.get(path.user, params)
}

// 根据用户组织结构获取用户
export const getUserByDeptIdPage = (params: any): Promise<ResultData<any>> => {
  return http.get(path.getUserByDeptIdPage, params)
}

// 获取职位列表
export const getUserCareer = (params: any): Promise<ResultData<any>> => {
  return http.get(path.getUserCareer, params)
}

// 删除用户
export const deleteUser = (params?: { ids: string }): Promise<ResultData<any>> => {
  return http.delete<any>(path.deleteUser, params)
}

// 离职
export const quitJobUser = (params?: { userId: number }): Promise<ResultData<any>> => {
  return http.get(path.quitJobUser, params)
}

// 更新用户密码
export const uploadPassword = (params?: { id: number, password: string }): Promise<ResultData<any>> => {
  return http.put(path.updatePassward, params)
}

// 用户上传头像文件
export const postUploadAvatar = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.upload, params, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryxsyBo4G6FcXHp1RF'
    }
  })
}

// 校验登录账号
export const validateUserName = (params?: { username: string }): Promise<ResultData<any>> => {
  return http.get(path.validateUserName, params)
}

// 新增用户
export const addUser = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.user, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 更新用户
export const uploadUser = (params: any): Promise<ResultData<any>> => {
  return http.put<any>(path.user, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 更新用户角色
export const updateRole = (params: { userId: number, ids: string }): Promise<ResultData<any>> => {
  return http.post<any>(path.userUpdateRole, params)
}

// 更新用户部门
export const updateDept = (params: { userId: number, newDept: number, oldDept?: any }): Promise<ResultData<any>> => {
  return http.post<any>(path.updateDept, params)
}

// 根据用户id获取部门数据
export const getDeptByUserId = (params?: { userId: string }): Promise<ResultData<any>> => {
  return http.get(path.getDeptByUserId, params)
}

// 新增职位
export const addCareer = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.userCareer, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 删除职位
export const deleteCareer = (params?: { id: any }): Promise<ResultData<any>> => {
  return http.delete(path.userCareer, params)
}
// 删除多个职位
export const deleteUserCareer = (params?: { ids: string }): Promise<ResultData<any>> => {
  return http.delete(path.deleteUserCareer, params)
}

//更改职位
export const uploadCareer = (params: any): Promise<ResultData<any>> => {
  return http.put<any>(path.userCareer, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据部门id 获取上下级用户
export const getParUserByDeptId = (params?: { deptId: any }): Promise<ResultData<any>> => {
  return http.get(path.getParUserByDeptId, params)
}

// 解析xlsx用户数据
export const parseXlsxUser = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.validationImportUser, params)
}

// 解析xlsx数据，添加人员
export const postImportUser = (params: any): Promise<ResultData<any>> => {
  return http.post<any>(path.importUser, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取部门人员数据
export const getOrgDept = (params?: any): Promise<ResultData<any>> => {
  return http.get(path.getOrgDept, params)
}

//获取用户信息
export const getUserInfo = (params?: any): Promise<ResultData<any>> => {
  return http.get(path.userInfo, params)
}