const getTimeArray = (date) => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day, hour, minute, second].map(formatNumber)
}

export function formatTime (date) {
  const t = getTimeArray(date)
  return [t[0], t[1], t[2]].map(formatNumber).join('-') + ' ' + [t[3], t[4], t[5]].map(formatNumber).join(':')
}

export function formatDate (date) {
  const t = getTimeArray(date)
  return [t[0], t[1], t[2]].map(formatNumber).join('-')
}

// 转化日期 如2018-7-6 -->(2018-07-06)
export function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
