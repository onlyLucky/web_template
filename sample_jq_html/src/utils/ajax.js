/*
 * @Author: fg
 * @Date: 2022-08-04 19:55:41
 * @LastEditors: 蓝山
 * @LastEditTime: 2023-11-02 14:15:04
 * @Description: ajax request
 */
var ajaxLoadingTimer = null
var ajaxWhitelist = [
  '/cascadeMeetingApi/getCascadeParticipants',
  '/user/getRealTimeMeetingUser'
]
var asyncPostData = function (sourcePath, paraData) {
  // 添加loading 加载展示白名单
  if (ajaxWhitelist.indexOf(sourcePath) == -1) {
    clearTimeout(ajaxLoadingTimer)
    ajaxLoadingTimer = setTimeout(function () {
      $("#fileLoading").show();
    }, 3000)
  }
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      headers: {
        auth_code: localStorage.getItem("authCode")
          ? localStorage.getItem("authCode")
          : dmData.authCode,
      },
      url: CONFIG.dataSourceRoot + sourcePath + "?rand=" + Math.random(),
      data: paraData,
      dataType: "JSON",
      traditional: true,
      success: function (result) {
        //更新授权码
        //离线情况下不更新授权码
        clearTimeout(ajaxLoadingTimer)
        $("#fileLoading").hide();
        if (result.authCode) {
          localStorage.setItem("authCode", result.authCode);
          dmData.authCode = result.authCode
          if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            saveAuthCode(result.authCode)
          }
        }
        resolve(result);
      },
      //报错时调用
      error: function (__xmlRequest, __textStatus) {
        //请求完成
        clearTimeout(ajaxLoadingTimer)
        $("#fileLoading").hide();
        if(sourcePath == '/datum/info') {
          systemUi.promptWindow({ title: '网络异常，查看本地文件', time: 3000 })
        } else {
          systemUi.promptWindow({ title: '获取数据失败', time: 3000 })
        }
        reject(__xmlRequest, __textStatus);
        console.log(__xmlRequest, __textStatus, '__xmlRequest---');
      },
    });
  });
};

var asyncPostJsonData = function (sourcePath, paraData) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      headers: {
        auth_code: localStorage.getItem("authCode")
          ? localStorage.getItem("authCode")
          : dmData.authCode,
      },
      contentType: "application/json",
      processData: false,
      url: CONFIG.dataSourceRoot + sourcePath + "?rand=" + Math.random(),
      data: JSON.stringify(paraData),
      dataType: "json",
      traditional: true,
      success: function (result) {
        //更新授权码
        //离线情况下不更新授权码
        if (result.authCode) {
          localStorage.setItem("authCode", result.authCode);
          dmData.authCode = result.authCode
        }
        resolve(result);
      },
      //报错时调用
      error: function (__xmlRequest, __textStatus) {
        //请求完成
        reject(__xmlRequest, __textStatus);
        console.log(__xmlRequest, __textStatus);
      },
    });
  });
};

var asyncUploadPostData = function (sourcePath, paraData) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      headers: {
        auth_code: localStorage.getItem("authCode")
          ? localStorage.getItem("authCode")
          : dmData.authCode,
      },
      contentType: false,
      processData: false,
      url: CONFIG.dataSourceRoot + sourcePath + "?rand=" + Math.random(),
      data: paraData,
      dataType: "JSON",
      traditional: true,
      success: function (result) {
        //更新授权码
        //离线情况下不更新授权码
        if (result.authCode) {
          localStorage.setItem("authCode", result.authCode);
          dmData.authCode = result.authCode
        }
        resolve(result);
      },
      //报错时调用
      error: function (__xmlRequest, __textStatus) {
        //请求完成
        reject(__xmlRequest, __textStatus);
        console.log(__xmlRequest, __textStatus);
      },
    });
  });
};

var asyncArrayPostData = function (sourcePath, paraData) {
  // 添加loading 加载展示白名单
  if (ajaxWhitelist.indexOf(sourcePath) == -1) {
    clearTimeout(ajaxLoadingTimer)
    ajaxLoadingTimer = setTimeout(function () {
      $("#fileLoading").show();
    }, 3000)
  }
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      headers: {
        auth_code: localStorage.getItem("authCode")
          ? localStorage.getItem("authCode")
          : dmData.authCode,
      },
      url: CONFIG.dataSourceRoot + sourcePath + "?rand=" + Math.random(),
      data: paraData,
      contentType: 'application/json',
      traditional: true,
      success: function (result) {
        //更新授权码
        //离线情况下不更新授权码
        clearTimeout(ajaxLoadingTimer)
        $("#fileLoading").hide();
        if (result.authCode) {
          localStorage.setItem("authCode", result.authCode);
          dmData.authCode = result.authCode
        }
        resolve(result);
      },
      //报错时调用
      error: function (__xmlRequest, __textStatus) {
        //请求完成
        clearTimeout(ajaxLoadingTimer)
        $("#fileLoading").hide();
        systemUi.promptWindow({ title: '获取数据失败', time: 3000 })
        reject(__xmlRequest, __textStatus);
        console.log(__xmlRequest, __textStatus, '__xmlRequest---');
      },
    });
  });
};
var asyncGetData = function (sourcePath, paraData) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      headers: {
        auth_code: localStorage.getItem("authCode")
          ? localStorage.getItem("authCode")
          : dmData.authCode,
      },
      url: CONFIG.dataSourceRoot + sourcePath + "?rand=" + Math.random(),
      data: handleGetParams(paraData),
      success: function (result) {
        //更新授权码
        //离线情况下不更新授权码
        if (result.authCode) {
          localStorage.setItem("authCode", result.authCode);
          dmData.authCode = result.authCode
        }
        resolve(result);
      },
      //报错时调用
      error: function (__xmlRequest, __textStatus) {
        //请求完成
        reject(__xmlRequest, __textStatus);
        console.log(__xmlRequest, __textStatus);
      },
    });
  });
};

var asyncGetOtherData = function (sourcePath, paraData) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      headers: {
        auth_code: localStorage.getItem("authCode")
          ? localStorage.getItem("authCode")
          : dmData.authCode,
      },
      url: CONFIG.dataVoiceSourceRoot + sourcePath + "?rand=" + Math.random(),
      data: handleGetParams(paraData),
      success: function (result) {
        //更新授权码
        //离线情况下不更新授权码
        if (result.authCode) {
          localStorage.setItem("authCode", result.authCode);
          dmData.authCode = result.authCode
        }
        resolve(result);
      },
      //报错时调用
      error: function (__xmlRequest, __textStatus) {
        //请求完成
        reject(__xmlRequest, __textStatus);
        console.log(__xmlRequest, __textStatus);
      },
    });
  });
};
var handleGetParams = function (params) {
  let res = ''
  for (let key in params) {
    res += key + '=' + params[key] + '&'
  }
  return res.substring(0, res.length - 1)
}
