/*
 * @Author: fg
 * @Date: 2023-01-29 14:17:06
 * @LastEditors: fg
 * @LastEditTime: 2023-02-08 13:26:21
 * @Description: views index.d.ts
 */
type MeetDetailType = {
  name: string,
  createUserName: string | null,
  deviceName: string | null,
  deviceId: number,
  createTime: string | null,
  endTime: string | null,
  meetShare: 0 | 1,
  secrecy: 0 | 1,
  secrecyPassword: string | null,
  state: 0 | 1,
  fileUpload: 0 | 1,
}

type ConfigKey = 'basic' | 'windows' | 'language' | 'network' | 'download'

// 文件列表路由query传参类型
type FileQPType = {
  name?: string;
  id: any;
};
// 文件列表类筛选型
type FileFilterType = {
  type: number;// 类型id
  typeName: string; // 类型名称
}