/*
 * @Author: fg
 * @Date: 2023-03-29 14:32:23
 * @LastEditors: fg
 * @LastEditTime: 2023-03-30 09:38:30
 * @Description: 用户部门模式
 */

import { getOrgDept } from "@/apis/user";
import _ from "lodash";
import { useTools } from "@/hooks/useTools";
export const useDept = () => {
  const { useArrRemoveJson, useArrHasJson } = useTools();
  // 部门id
  let deptId = ref<any>("")
  // 部门用户列表数据
  let deptList = ref<any[]>([]);
  let deptUserList = ref<any[]>([]);
  // 选中的部门层级
  let deptSelectArr = ref<any[]>([]);
  // 选中
  let deptSelectIds = ref<any[]>([]);
  let deptSelectList = ref<any[]>([]);
  // 加载
  let deptLoading = ref<boolean>(false);
  // 全选
  let deptSelectAll = ref<boolean>(false);
  const getDeptUser = () => {
    let params = _.pickBy({ deptId: deptId.value })
    deptLoading.value = true
    getOrgDept(params).then(res => {
      deptList.value = res.data.deptList ? res.data.deptList : []
      let temp = res.data.userList ? res.data.userList : []
      temp.map((item: any) => {
        item.select = deptSelectIds.value.indexOf(item.id) != -1;
      })
      deptUserList.value = temp
      // 检测是否为全选
      deptSelectAll.value = temp.every((item: any, index: any, arr: any) => {
        return item.select == true
      })
      deptLoading.value = false
    }).catch(err => {
      deptLoading.value = false
    })
  }

  // 部门点击
  const onDeptItemTap = (item: any) => {
    deptId.value = item.id
    let temp = [...deptSelectArr.value]
    temp.push(item)
    deptSelectArr.value = temp
    getDeptUser()
  }
  // 顶部部门结构点击
  const onDeptTopItemTap = (index: number) => {
    if (index != deptSelectArr.value.length - 1) {
      let temp = [...deptSelectArr.value]
      deptId.value = temp[index].id
      temp = temp.slice(0, index + 1)
      deptSelectArr.value = temp
      getDeptUser()
    }
  }
  // 全选
  const onDeptSelectAll = (flag: boolean) => {
    deptSelectAll.value = flag
    let temp = [...deptUserList.value];
    let tempSelectIds = [...deptSelectIds.value]
    let tempSelectList = [...deptSelectList.value]
    temp.map(item => {
      item.select = flag
      if (flag) {
        if (tempSelectIds.indexOf(item.id) == -1) {
          tempSelectIds.push(item.id)
        }
        if (useArrHasJson(tempSelectList, 'id', item.id).length <= 0) {
          tempSelectList.push(item)
        }
      } else {
        let tempIndex = tempSelectIds.indexOf(item.id)
        if (tempSelectIds.indexOf(item.id) != -1) {
          tempSelectIds.splice(tempIndex, 1)
          tempSelectList = useArrRemoveJson(tempSelectList, 'id', item.id) as any[]
        }
      }
    })
    deptSelectIds.value = tempSelectIds
    deptSelectList.value = tempSelectList
    deptUserList.value = temp
  }
  // 单个用户点击
  const onDeptItemSelect = (index: number) => {
    let temp = [...deptUserList.value];
    let tempSelectIds = [...deptSelectIds.value]
    let tempSelectList = [...deptSelectList.value]
    temp[index].select = !temp[index].select;
    deptUserList.value = temp
    if (temp[index].select) {
      if (tempSelectIds.indexOf(temp[index].id) == -1) {
        tempSelectIds.push(temp[index].id)
      }
      if (useArrHasJson(tempSelectList, 'id', temp[index].id).length <= 0) {
        tempSelectList.push(temp[index])
      }
    } else {
      let tempIndex = tempSelectIds.indexOf(temp[index].id)
      if (tempIndex != -1) {
        tempSelectIds.splice(tempIndex, 1)
      }
      tempSelectList = useArrRemoveJson(tempSelectList, 'id', temp[index].id) as any[]
    }
    deptSelectIds.value = tempSelectIds
    deptSelectList.value = tempSelectList
    deptSelectAll.value = deptUserList.value.every((item, index, arr) => {
      return item.select == true
    })
  }
  // 删除某一项
  const onDeptDelItem = (index: number, id: any) => {
    deptSelectIds.value = _.without([...deptSelectIds.value], id);
    deptSelectList.value = useArrRemoveJson([...deptSelectList.value], 'id', id)
    uploadDeptSelect()
  }
  // 初始化数据
  const initDept = () => {
    deptId.value = ''
    deptSelectArr.value = []
    deptUserList.value = []
    deptList.value = []
    deptLoading.value = false
  }

  // 更新选中数据
  const uploadDeptSelect = () => {
    let temp = [...deptUserList.value];
    temp.map((item) => {
      item.select = deptSelectIds.value.indexOf(item.id) != -1;
    });
    deptUserList.value = temp;
    deptSelectAll.value = deptUserList.value.every((item, index, arr) => {
      return item.select == true
    })
  }

  return {
    deptId,
    deptList,
    deptUserList,
    deptLoading,
    deptSelectArr,
    deptSelectIds,
    deptSelectList,
    deptSelectAll,
    getDeptUser,
    onDeptItemTap,
    onDeptItemSelect,
    onDeptTopItemTap,
    onDeptDelItem,
    initDept,
    onDeptSelectAll,
    uploadDeptSelect
  }
}