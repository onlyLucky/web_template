/*
 * @Author: fg
 * @Date: 2023-03-28 15:39:14
 * @LastEditors: fg
 * @LastEditTime: 2023-03-30 09:58:28
 * @Description: 用户列表模式
 */

import { getUserList, getUserCareer } from "@/apis/user";
import { useTools } from "@/hooks/useTools";
import _ from "lodash";
export const useUser = () => {
  type TypeUserParams = {
    pageSize: number;
    pageNum: number;
    nickname: string;
  };
  // 用户搜索参数
  let userParams = reactive<TypeUserParams>({
    pageSize: 10,
    pageNum: 1,
    nickname: "",
  });
  const { useArrRemoveJson, useArrHasJson } = useTools();
  // 是否为全选
  let selectAll = ref<boolean>(false);
  // 数据总条数
  let total = ref<number>(0);
  // 用户列表
  let userList = ref<any[]>([]);
  // 表单加载
  let loading = ref<boolean>(false);
  // 选中的index
  let selectIds = ref<number[]>([]);
  let selectList = ref<any[]>([]);

  // 获取列表人员数据
  const getUserData = () => {
    loading.value = true;
    getUserList(userParams)
      .then((res: any) => {
        loading.value = false;
        res.data.records.map((item: any) => {
          item.select = selectIds.value.indexOf(item.id) != -1;
        });
        total.value = res.data.total;
        let temp = [...userList.value, ...res.data.records];
        // 检测是否为全选
        selectAll.value = temp.every((item, index, arr) => {
          return item.select == true
        })
        userList.value = temp;
      })
      .catch((err: any) => {
        // 数据加载失败之后 页面减一
        if (userParams.pageNum !== 1) {
          userParams.pageNum = userParams.pageNum - 1;
        }
        loading.value = false;
      });
  };

  // 顶部搜索更改
  const onSearchChange = () => {
    userList.value = [];
    userParams.pageNum = 1;
    getUserData();
  };

  // 单个选中的时候
  const onItemSelect = (index: number) => {
    let temp = [...userList.value];
    let tempSelectIds = [...selectIds.value]
    let tempSelectList = [...selectList.value]
    temp[index].select = !temp[index].select;
    userList.value = temp
    let tempSelect: any = []
    userList.value.map(item => {
      tempSelect.push(item.select)
    })
    // console.log(userList.value, tempSelect, temp[index].select)
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
    selectIds.value = tempSelectIds
    selectList.value = tempSelectList
    selectAll.value = userList.value.every((item, index, arr) => {
      return item.select == true
    })
  }

  // 全选
  const onSelectAll = (flag: boolean) => {
    selectAll.value = flag;
    let temp = [...userList.value];
    let tempSelectIds = [...selectIds.value]
    let tempSelectList = [...selectList.value]
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
    selectIds.value = tempSelectIds
    selectList.value = tempSelectList
    userList.value = temp
  }

  // 更新用户数据选中
  const uploadSelect = () => {
    let temp = [...userList.value];
    temp.map((item) => {
      item.select = selectIds.value.indexOf(item.id) != -1;
    });
    userList.value = temp;
    selectAll.value = userList.value.every((item, index, arr) => {
      return item.select == true
    })
  }

  // 删除某一项
  const onDelItem = (index: number, id: any) => {
    selectIds.value = _.without([...selectIds.value], id);
    selectList.value = useArrRemoveJson([...selectList.value], 'id', id)
    uploadSelect()
  }


  // 获取职位列表
  let careerMap = ref<any[]>([]);
  const getUserCareerData = () => {
    careerMap.value = [];
    getUserCareer({}).then((res) => {
      careerMap.value = res.data;
    });
  };
  const computedCaeerName: any = (id: any) => {
    let temp = "";
    careerMap.value.map((item: any) => {
      if (item.id == Number(id)) {
        temp = item.caeerName;
      }
    });
    return temp;
  };

  onMounted(() => {
    getUserCareerData()
  })

  return {
    userParams,
    total,
    userList,
    loading,
    selectAll,
    selectIds,
    selectList,
    getUserData,
    computedCaeerName,
    onSearchChange,
    onItemSelect,
    onSelectAll,
    onDelItem,
    uploadSelect
  }
}