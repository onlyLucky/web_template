var systemApi = {
  //获取终端许可
  getNodeToken(params) {
    return asyncPostData('/node/token', params)
  },
  //终端申请接入
  setNodeApply(params) {
    return asyncPostData('/node/apply', params)
  },
}