/*
 * @Author: fg
 * @Date: 2023-01-29 15:49:41
 * @LastEditors: fg
 * @LastEditTime: 2023-01-29 16:55:33
 * @Description: meet 模块切换保密分享开关
 */

import { reviseMeetDetail } from "@/apis/meet";

type Params = {
  id: number,
  secrecy?: 0 | 1,
  meetShare?: 0 | 1,
}

// table表格多个切换修改
export function useSwitchMultiple(params: Params, beforeCallback: Function, endCallback: Function) {
  return new Promise((resolve: Function, reject: Function) => {
    beforeCallback();
    reviseMeetDetail(params)
      .then((res) => {
        endCallback()
        resolve();
      })
      .catch((err) => {
        endCallback()
        reject();
      });
  });
}

export let isSecrecyLoading = ref<boolean>(false)
export function useSecrecy(params: Params) {
  return new Promise((resolve: Function, reject: Function) => {
    isSecrecyLoading.value = true
    reviseMeetDetail(params)
      .then((res) => {
        isSecrecyLoading.value = false
        resolve();
      })
      .catch((err) => {
        isSecrecyLoading.value = false
        reject();
      });
  });
}

export let isShareLoading = ref<boolean>(false)
export function useShare(params: Params) {
  console.log('useShare')
  return new Promise((resolve: Function, reject: Function) => {
    isShareLoading.value = true
    reviseMeetDetail(params)
      .then((res) => {
        isShareLoading.value = false
        resolve();
      })
      .catch((err) => {
        isShareLoading.value = false
        reject();
      });
  });
}