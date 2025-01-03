import { isNumber } from "lodash";

export const useTools = () => {
  const useBytesUnit = (bytes: number) => {
    if (!isNumber(bytes)) {
      return '0 B';
    }
    if (bytes === 0) return '0 B';
    var k = 1024,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }

  /**
   * @description: 数组处理arr，删除项为对象，删除某一项属性attr中属性值为value
   * @param {any} arr 预处理数组
   * @param {string} attr 属性
   * @param {any} value 属性值
   * @return {*} 处理后的数组
   */
  const useArrRemoveJson = (arr: any[], attr: string, value: any) => {
    if (!arr || arr.length == 0) {
      return []
    }
    let newArr = arr.filter(function (item, index) {
      return item[attr] != value
    }) || []
    return newArr
  }

  /**
   * @description: 获取当前数组对象arr 是否存在attr属性 值为value
   * @param {any} arr 数组对象
   * @param {string} attr 属性
   * @param {any} value 属性值
   * @return {*} 返回当前key为attr， value 为value的数组
   */
  const useArrHasJson = (arr: any[], attr: string, value: any) => {
    if (!arr || arr.length == 0) {
      return []
    }
    return arr.filter(function (item, index) {
      return item[attr] == value
    })
  }

  /**
   * @description: 获取 arr1 与 arr2 属性key 为 attr 的并集
   * @param {any} arr1 第一个数组
   * @param {any} arr2 第二个数组
   * @param {string} attr key
   * @return {*} 返回并集数组
   */
  const useArrJsonOverlap = (arr1: any[], arr2: any[], attr: string) => {
    let res: any[] = []
    res = arr1.filter(x => arr2.some(y => y[attr] === x[attr]))
    return res
  }

  /**
   * @description: 获取arr1 与 arr2 属性key 为 attr 不是并集部分，
   * @param {any} arr1 第一个数组
   * @param {any} arr2 第二个数组
   * @param {string} attr key
   * @return {*} 返回为对象 left为左侧（arr1） right为右侧（arr2）
   */
  const useArrJsonNoOverlap = (arr1: any[], arr2: any[], attr: string) => {
    type ResType = {
      left: any[],
      right: any[]
    }
    let res: ResType = { left: [], right: [] }
    res.left = arr1.filter(x => !arr2.some(y => y[attr] === x[attr]))
    res.right = arr2.filter(y => !arr1.some(x => x[attr] === y[attr]))
    return res
  }

  /**
   * @description: 数组按照attr 的值 返回 [..value]
   * @param {any} arr 
   * @param {string} attr
   * @return {*} [..value]
   */
  const useArrJsonHandleAttr = (arr: any[], attr: string) => {
    let res: any[] = [];
    arr.map(item => {
      res.push(item[attr])
    })
    return res;
  }

  const useDateGetDay = (day: number) => {
    let today = new Date();
    let target_day_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(target_day_milliseconds); //注意，这行是关键代码
    let tYear = today.getFullYear();
    let tMonth: any = today.getMonth();
    let tDate: any = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "/" + tMonth + "/" + tDate;
  }

  const doHandleMonth = (month: any) => {
    let m: string = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  }

  /**
   * @description: 获取value在数组arr中的范围下标
   * @param {number} arr 数组是index（是数组下标） index+1 为一个范围 比如 index为0，index+1为10，范围 0~10
   * @param {number} value
   * @return {*} 范围下标
   */
  const useValueInArr = (arr: number[], value: number) => {
    let resIndex: number = 1;
    if (arr.length > 0) {
      if (value >= arr[arr.length - 1]) {
        return arr.length - 1
      }
      for (let index in arr) {
        if (Number(arr[index]) >= value) {
          resIndex = Number(index);
          break;
        }
      }
    }
    return resIndex
  }

  return {
    useBytesUnit,
    useArrRemoveJson,
    useArrHasJson,
    useArrJsonOverlap,
    useArrJsonNoOverlap,
    useArrJsonHandleAttr,
    useDateGetDay,
    doHandleMonth,
    useValueInArr
  }
}