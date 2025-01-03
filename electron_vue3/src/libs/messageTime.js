export const JUST_NOW = 3000; //3s内
export const IN_SECOND = 1000 * 60; //一分钟
export const IN_MINUTE = 1000 * 60 * 60; //一小时
export const IN_HOUR = 1000 * 60 * 60 * 12; //12小时
export const IN_DAY = 1000 * 60 * 60 * 24 * 1; //1天
export const IN_MONTH = 1000 * 60 * 60 * 24 * 30; //1个月
 
export function updateTimeShow(time) {
  let localTime = new Date(); //当前系统时间
  let createTime = new Date(time) //消息创建时间
  let diff = localTime - createTime;
  if (diff <= JUST_NOW)
    return '刚刚';
  else if (diff <= IN_SECOND)
    return "1分钟内";
  else if (diff <= IN_MINUTE)
    return parseInt(diff / IN_SECOND) + '分钟前';
  else if (diff <= IN_MINUTE)
    return parseInt(diff / IN_MINUTE) + '小时前';
  else if (diff <= IN_HOUR * 2) {
    const list = createTime.toString().split(" ");
		const listnow = localTime.toString().split(" ");
		const lastIndex = list[4].lastIndexOf(":")
		let realtime = list[4].toString().substring(0, lastIndex);
		if(Number(listnow[2])>Number(list[2])){
			realtime = '昨天 ' + realtime
		}
		console.log(list,'list')
    
    return realtime;
  } else if (diff < IN_DAY * 7) {
    if (diff < IN_DAY) {
      return parseInt(diff / IN_HOUR) + '天前';
    }
    const t = createTime.toString().slice(0, 3);
		const list = createTime.toString().split(" ");
		const lastIndex = list[4].lastIndexOf(":")
		const realtime = list[4].toString().substring(0, lastIndex);
    switch (t) {
      case "Mon":
        return '星期一 '+realtime;
      case "Tue":
        return '星期二 '+realtime;
      case "Wed":
        return '星期三 '+realtime;
      case "Thu":
        return '星期四 '+realtime;
      case "Fri":
        return '星期五 '+realtime;
      case "Sat":
        return '星期六 '+realtime;
      case "Sun":
        return '星期日 '+realtime;
    }
  } else if (diff < IN_MONTH*24) {
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
 
export function getNumberMonth(month) {
  switch (month) {
    case "Jan":
      return "1";
    case "Feb":
      return "2";
    case "Mar":
      return "3";
    case "Apr":
      return "4";
    case "May":
      return "5";
    case "June":
      return "6";
    case "July":
      return "7";
    case "Aug":
      return "8";
    case "Sep":
      return "9";
    case "Oct":
      return "10";
    case "Nov":
      return "11";
    case "Dec":
      return "12";
  }
}

export function dateFormat(fmt, date) {
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
}
