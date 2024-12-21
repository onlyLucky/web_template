var dmData = {
  authCode: "",// 授权码
  systemEnumList: [{ //系统枚举信息
    name: "",
    enums: [{
      key: "",
      value: ""
    }]
  }],
  //当前终端信息
  nodeInfo: {
    nodeNo: "",
    //默认MAC
    mac: "empty",
    //终端id
    id: 0,
    //会议室终端id
    roomNodeId: 0,
    //终端类型
    nodeType: 0,
    //是否授权
    isAuthorize: false,
    //终端所授权的会议室编号多个用逗号隔开
    roomNos: "",
    uuid: "", // 设备uuid
  },
  meetingInfo: {
    id: 0,
    meetingName: "",
    userName: "",
    time: "",
    openTime: "",
    closeTime: "",
    //会议所在会议室名称 多个用逗号分隔
    roomNames: "",
    //会议所在会议室编号 多个用逗号分隔
    roomNos: "",
    //会议状态
    status: 0,
    //会议室信息
    boardroom: {
      rtmpPushFlowSwitch: {
        name: "",
        value: {
          mode: "txLive",
          rtmp: {
            url: "rtmp://192.168.19.89:1935/live/",
          },
          txLive: {
            pushUrl: "webrtc://push.mydeskmedia.com/dmlive/",
            playUrl: "webrtc://play.mydeskmedia.com/dmlive/",
          },
          isOpen: "false",
          url: "rtmp://192.168.19.89:1935/live/",
        },
      },
    },
    videoProvider: '',
    isVideoMeeting: '',
    /*播流地址*/
    playUrl: "",
    pushUrl: "",
  },
  //当前参会人员信息
  userInfo: {
    //参会人员id
    topicUserId: 0,
    //人员id
    id: 0,
    //人员昵称
    nickname: "",
    //参会人员权限
    permissionList: [],
    //是否主持人
    isAdmin: false,
    //职位职称
    userRank: "",
    //公司
    company: "",
    //头像
    avatarPath: "",
    //联系信息
    contactInfo: "",
    //用户是否签到
    userIsSign: false,
    roleName: "",
    // 用户账号
    userCode: "",
    // 用户是否入座
    AlreadySeated: 1,
  },
  mouseInfo: { // 鼠标数据
    nodeInfo: "",
    nodeNo: "",
    pkid: 0,
    screenSize: "",
    width: 1920,
    height: 1080,
    screenWidth: 1920, // 屏幕像素宽度
    screenHeight: 1080,// 屏幕像素高度
  },
};

//枚举（enum）
var dmEnum = {
  // mdm版本码值
  runningSystemVersionCode: {},
  /*白板批注*/
  hubCommentType: {
    openComment: 0,
    closeComment: 1,
    setColor: 2,
    setPenSize: 3
  },
  /**
   * 流媒体方式
   */
  streamingMediaMode: {
    close: "close",
    txLive: "txLive",
    rtmp: "rtmp",
    sis: "sis",
    matrix: "matrix",
  },
  /*大屏 同屏开关状态值 客户端约定*/
  shareAction: {
    open: 1,
    close: 2,
  },
  /*浮动窗口按钮枚举*/
  floatButton: {
    //不显示
    disable: 0,
    //返回无纸化
    FHWZH: 1,
    //  返回同屏
    FHTP: 2,
    //  远程控制
    YCKZ: 3,
    //  发起同屏
    FQTP: 4,
    //  取消同屏
    QXTP: 5
  },
  /*角色*/
  roleName: {
    host: "主持人",
    leader: "领导",
  },
  /*鼠标是否移动图片*/
  mouseImg: {
    move: "../Image/鼠标亮色.png",
    unmove: "../Image/鼠标暗色.png",
  },
  /*鼠标颜色*/
  mouseColor: {
    red: "white", //"#F448C3",
    yellow: "white", //"#FAAF31",
    blue: "white", //"#08C5DF",
    white: "white",
  },
  /*文字颜色图片*/
  textColor: {
    White: "White",
    Gray: "Gray"
  },
  mouserAction: {
    move: "move",
    unmove: "unmove",
  },
  //请求状态码
  statusCode: {
    //请求成功
    success: 0,
    //请求失败
    fail: 1,
    //请求未授权
    notPermissions: 2,
  },

  //会议状态
  meetingStatus: {
    //未开始
    notStarted: null,
    //进行中
    progress: null,
    //已结束
    ended: null,
    //已取消
    canceled: null,
    //禁用
    disable: null,
    //未启用
    enabled: null,
  },
  //议题状态
  topicStatus: {
    //已结束
    over: null,
    //未开始
    normal: null,
    //未开始
    progress: null,
    //已删除
    deleted: null,
    //正常
    regular: null,
  },
  //投票状态
  voteStatus: {
    //未开始
    notStarted: null,
    //投票中
    progress: null,
    //已完成
    ended: null,
    //已取消
    canceled: null,
  },
  //投票类型
  voteType: {
    //默认项
    DEFAULT: null,
    //自定义
    CUSTOM: null,
  },
  //终端类型
  nodeType: {
    //升降机
    elevator: null,
    //大屏
    bigScreen: null,
    //PAD
    pad: null,
    //门牌
    doorPlate: null,
    //电视机
    television: null,
    //桌牌
    tablePlate: null,
    //升降桌牌
    liftTablePlate: null,
    //升降麦杆
    liftStraw: null,
  },
  //呼叫状态
  shoutStatus: {
    //未处理
    UNPROCESSED: null,
    //已处理
    PROCESSED: null,
  },
  //呼叫类型
  shoutType: {
    //自定义
    ZDY: null,
    //文字
    WZ: null,
    //手写
    SX: null,
  },
  //文件格式类型
  fileModel: {
    //办公
    office: null,
    //视频
    video: null,
    //音频
    audio: null,
    //图片
    image: null,
    //其他
    other: null,
  },
  //用户性别
  userSex: {
    //保密
    secret: null,
    //男
    man: null,
    //女
    woman: null,
  },
  //切图结果
  slicingResult: {},
  //文件切图状态
  cropStatus: {
    //未切图
    notcrop: null,
    //不切图
    decline: null,
    //切图中
    croping: null,
    //已切图
    already: null,
    //切图失败
    failure: null,
    //文件破损
    filedistroy: null,
    //携带密码
    password: null,
    //密码错误
    password_error: null,
    //存在问题
    unknown_error: null,
  },
  //文件操作限制
  datumAllowOpt: {
    //查看
    view: null,
    //下载
    download: null,
    //修改
    modify: null,
    //删除
    delete: null,
    //全操作
    all: null,
  },
  //注册类型
  clientType: {
    ASR_SERVICE: 13,
    CLIENT: 0,
    DOORPLATE: 8,
    ELEVATOR: 2,
    ELEVATOR_BIG_SCREEN: 4,
    GUIDE: 11,
    HG_DEVICE: 12,
    MOUSE_CONTROL: 17,
    PAD_MOUSE_CONTROL: 18,
    PAD: 3,
    PAD_BIG_SCREEN: 5,
    PAD_CONTROL: 9,
    RDP_CLIENT: 14,
    SYSTEM: 1,
    TEA_ROOM: 7,
    TELEVISION: 10,
    TE_CLIENT: 16,
    VM_CLIENT: 15,
    WAIT_ROOM: 6,
  },
  // 项目版本类型枚举类
  versionType: {
    /**
     * 旗舰版
     */
    ULTIMATE: 1,
    /**
     * 标准版
     */
    STANDARD: 2,
    /**
     * PadV16版
     */
    PAD: 3,
  },
  //发言意见状态
  opinionStatus: {
    //初稿
    FIRST_DRAFT: 1,
    //修订稿
    REVISE_DRAFT: 2,
    //终稿
    FINAL_DRAFT: 3,
  },
  recordActionType: {
    start: "start",
    stop: "stop"
  },
  // 平板系统名称枚举类
  runningSystemVersion: {
    //鸿蒙
    HARMONYOS: 1,
    //荣耀
    HONOR: 2,
    //联想
    LENOVO: 4
  }
};