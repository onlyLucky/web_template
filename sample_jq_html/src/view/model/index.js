var selectNodeModel = {
  show: false,
  index: 0,
  nodeData: [], // 设备列表

  async showModel(flag=true){
    selectNodeModel.show = flag
    if(flag){
      await this.getNodeDataByMac()
      $("#selectNode_Model").show()
      this.eventBind()
    }else{
      $("#selectNode_Model").hide()
    }
  },
  eventBind(){
    // 选择设备列表
    $("#selectNode_Model .bodyItem").unbind().bind("click",function(){
      selectNodeModel.index = $(this).index()
      console.log("selectNodeModel.index: =",selectNodeModel.index)
      if(!$(this).hasClass("active")){
        $(".bodyItem").removeClass("active")
        $(this).addClass("active")
      }
    })
    // 取消点击
    $("#selectNode_Model .cancel").unbind().bind("click",function(){
      selectNodeModel.showModel(false)
    })
    // 确认点击
    $("#selectNode_Model .promise").unbind().bind("click",function(){
      selectNodeModel.onConform()
    })
  },
  onConform(){
    // 判断当前是否改变
    /* console.log(selectNodeModel.nodeData[selectNodeModel.index].pkid,selectNodeModel.index)
    if(dmData.mouseInfo.pkid == selectNodeModel.nodeData[selectNodeModel.index].pkid){
      selectNodeModel.showModel(false)
      return;
    } */
    if(dmData.mouseInfo.pkid != 0){
      // 推送关闭
      let msg = dmData.mouseInfo.pkid+';'+'0300'
      websocket.send(msg)
    }
    // 关闭视频
    srs.colse();
    console.log(dmData.mouseInfo,'dmData.mouseInfo')
    dmData.mouseInfo = $.extend({}, dmData.mouseInfo, selectNodeModel.nodeData[selectNodeModel.index])
    // srs 播流宽高设置
    dmData.mouseInfo.width = 1920
    dmData.mouseInfo.height = 1080
    if(dmData.mouseInfo.screenSize){
      let [width, height] = dmData.mouseInfo.screenSize.split(',').map(Number);
      width = isNaN(width) ? 0 : width;
      height = isNaN(height) ? 0 : height;
      dmData.mouseInfo.screenWidth = width||0
      dmData.mouseInfo.screenHeight = height||0
    }
    // 通知推送
    let msg = dmData.mouseInfo.pkid+';'+'0301'
    websocket.send(msg)
    srsLogic.srsPath = CONFIG.srsUrl+dmData.mouseInfo.nodeNo
    // 进入srs 页面
    srsLogic.showSrsPage()
    selectNodeModel.showModel(false)
  },
  setNodeSelect(num){
    selectNodeModel.index = num
    $("#selectNode_Model .bodyItem").removeClass("active")
    if(num>=0){
      $("#selectNode_Model .bodyItem").eq(num).addClass("active")
    }
  },
  // 根据mac 地址获取设备列表
  getNodeDataByMac(){
    return mouseApi.getIotMouseByMac({
      mac: dmData.nodeInfo.mac
    }).then(res=>{
      if(res.code == dmEnum.statusCode.success){
        selectNodeModel.nodeData = res.data
      }else {
        systemUi.promptWindow({
          title: res.msg,
          time: 3000
        })
      }
    })
  },
  uploadNodeListDom(val){
    var html = ''
    selectNodeModel.nodeData.map(item=>{
      html += `
        <div class="bodyItem">
          <p>${item.eqNo}</p>
        </div>
      `
    })
    $("#selectNode_Model .m_body .m_bodyCon").html(html)
    selectNodeModel.setNodeSelect(0)
  },
}
// 数据监听
uCommon.watchPropertyChange(selectNodeModel,'nodeData',selectNodeModel.uploadNodeListDom)


// auth 确定 model
var authConformModel = {
  show: false,
  showModel(flag=true){
    authConformModel.show = flag
    if(flag){
      $("#authConform_Model").show()
      this.eventBind()
    }else{
      $("#authConform_Model").hide()
    }
  },
  eventBind(){
    // 取消点击
    $("#authConform_Model .cancel").unbind().bind("click",function(){
      location.reload();
    })
    // 完成
    $("#authConform_Model .promise").unbind().bind("click",function(){
      location.reload();
    })
  }
}