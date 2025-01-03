/*
 * @Author: fg
 * @Date: 2023-01-16 14:43:56
 * @LastEditors: fg
 * @LastEditTime: 2023-01-16 14:57:21
 * @Description: content
 */
interface DataType<T = object> {
  name: string;
  description: string;
  parent: string;
  value: any;
  type: string;
  props?: T;
  [propsName: string]: any;
}