var mouseApi = {
  //获取腾讯内置应用配置信息
  getTencentInfo(params) {
    return asyncPostData('/system/getTencentInfo', params)
  },
  //腾讯视频会议内置应用登录
  getJSApiAuth(params) {
    //jsapi登录授权
    return asyncPostData('/tencentApi/login', params)
  },
  //获取系统枚举信息
  getEnum(params) {
    return asyncPostData('/system/enums', params)
  },
  // 获取当前绑定用户正在进行中的会议
  getMeetingsByUserCode(params) {
    return asyncPostData('/user/getMeetingsByUserCode', params)
  },
  // 获取用户信息
  getUserInfo(params) {
    return asyncPostData('/elevator/user/info', params)
  },
  // 获取ws
  getIotWebsocket(params){
    return asyncPostData('/system/iotWebsocket', params)
  },
  // 会议码获取会议详细信息
  getMeetingInfoByCode(params) {
    return asyncPostData("/meeting/getMeetingInfoByCode", params)
  },
  // 获取当前会议室下的物联网鼠标
  getIotMouse(params) {
    return asyncPostData("/node/getIotMouse", params)
  },

  // 根据mac获取当前会议室下的物联网鼠标
  getIotMouseByMac(params) {
    return asyncPostJsonData("/node/getIotMouseByMac", params)
  },

}