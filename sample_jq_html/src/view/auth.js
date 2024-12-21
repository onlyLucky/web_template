var authLogic = {
  showAuthPage(){
    viewLogic.showMainPage("Auth")
    /* $(".mainPage#Auth .authTxt").show()
    $(".mainPage#Auth .authTxt p span").text(dmData.nodeInfo.mac) */
    $("#authConform_Model .m_bodyCon p span").text(dmData.nodeInfo.mac)
    authConformModel.showModel();
    // 进行授权
    this.goAuth()
  },
  goAuth(){
    var nodeType = uCommon.getUrlParam("type") || uCommon.getUrlParam("nodeType");
    nodeType = nodeType ? nodeType : dmEnum.nodeType.iotMousePC
    if(!nodeType) nodeType = 21
    dmData.nodeInfo.nodeType = nodeType
    systemApi.setNodeApply({
      nodeMac: dmData.nodeInfo.mac,
      nodeType: dmData.nodeInfo.nodeType
    }).then(res=>{
      if(dmEnum.statusCode.success == res.code) {
        dmData.nodeInfo.id = res.data;
      }
    })
  },

}