/*
 * @Author: fg
 * @Date: 2023-02-07 15:53:32
 * @LastEditors: fg
 * @LastEditTime: 2023-02-07 17:36:58
 * @Description: 聊天时间信息处理
 */
export const JUST_NOW: number = 3000; //3s内
export const IN_SECOND: number = 1000 * 60; //一分钟
export const IN_MINUTE: number = 1000 * 60 * 60; //一小时
export const IN_HOUR: number = 1000 * 60 * 60 * 12; //12小时
export const IN_DAY: number = 1000 * 60 * 60 * 24 * 1; //1天
export const IN_MONTH: number = 1000 * 60 * 60 * 24 * 30; //1个月

export function useMsgTimeShow(time: any) {
  let localTime: Date = new Date(); //当前系统时间
  let createTime: Date = new Date(time); //消息创建时间
  let diff: number = localTime.valueOf() - createTime.valueOf();
  if (diff <= JUST_NOW)
    return '刚刚';
  else if (diff <= IN_SECOND)
    return "1分钟内";
  else if (diff <= IN_MINUTE)
    return parseInt((diff / IN_SECOND).toString()) + '分钟前';
  else if (diff <= IN_MINUTE)
    return parseInt((diff / IN_MINUTE).toString()) + '小时前';
  else if (diff <= IN_HOUR * 2) {
    const list = createTime.toString().split(" ");
    const listNow = localTime.toString().split(" ");
    const lastIndex = list[4].lastIndexOf(":")
    let realtime = list[4].toString().substring(0, lastIndex);
    if (Number(listNow[2]) > Number(list[2])) {
      realtime = '昨天 ' + realtime
    }
    return realtime;
  } else if (diff < IN_DAY * 7) {
    if (diff < IN_DAY) {
      return parseInt((diff / IN_HOUR).toString()) + '天前';
    }
    const t = createTime.toString().slice(0, 3);
    const list = createTime.toString().split(" ");
    const month = list[1];
    const lastIndex = list[4].lastIndexOf(":")
    const realtime = list[4].toString().substring(0, lastIndex);
    /* switch (t) {
      case "Mon":
        return '星期一 ' + realtime;
      case "Tue":
        return '星期二 ' + realtime;
      case "Wed":
        return '星期三 ' + realtime;
      case "Thu":
        return '星期四 ' + realtime;
      case "Fri":
        return '星期五 ' + realtime;
      case "Sat":
        return '星期六 ' + realtime;
      case "Sun":
        return '星期日 ' + realtime;
    } */
    return `${getNumberMonth(month)}-${list[2]} ${realtime}`;
  } else if (diff < IN_MONTH * 24) {
    const list = createTime.toString().split(" ");
    const month = list[1];
    var realtime = "";
    if (diff < IN_MONTH) {
      realtime += getNumberMonth(month);
    } else {
      realtime = list[3] + "-" + getNumberMonth(month);
    }

    return realtime + "-" + list[2];
  }
}

export function getNumberMonth(month: string) {
  switch (month) {
    case "Jan":
      return "01";
    case "Feb":
      return "02";
    case "Mar":
      return "03";
    case "Apr":
      return "04";
    case "May":
      return "05";
    case "June":
      return "06";
    case "July":
      return "07";
    case "Aug":
      return "08";
    case "Sep":
      return "09";
    case "Oct":
      return "10";
    case "Nov":
      return "11";
    case "Dec":
      return "12";
  }
}

/* export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
} */
