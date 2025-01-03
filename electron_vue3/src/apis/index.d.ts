/*
 * @Author: fg
 * @Date: 2023-01-16 17:38:10
 * @LastEditors: fg
 * @LastEditTime: 2023-01-16 17:38:11
 * @Description: content
 */
// 响应数据结构
interface Result {
  code: number;
  msg: string;
}

// 请求响应参数，包含data
interface ResultData<T> extends Result {
  data?: T;
}