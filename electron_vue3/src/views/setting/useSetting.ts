/*
 * @Author: fg
 * @Date: 2023-04-13 10:44:46
 * @LastEditors: fg
 * @LastEditTime: 2023-04-23 17:49:43
 * @Description: 设置处理逻辑
 */
/* 
  备份config data（用于比较修改数据，筛选出来更改的数据--检测是否需要系统重启）
  数据处理
  数据储存更改
  是否需要系统重启，发送消息更改
*/
import hdObj from "./handleData";
import { Message, Modal } from "view-ui-plus";
import { ipcRenderer } from "electron";
export const useSetting = () => {
  // 备份数据
  let copyData = reactive(hdObj.getConfigItem());
  // 更改过后的数据（应用存活的状态下，config更改数据）
  let configData = reactive<any>({})
  let menuData = reactive<any[]>([]);
  let searchData = reactive<any[]>([]);
  // 是否需要重新加载
  let isNeedReload = ref<boolean>(false)

  console.log(copyData, 'menuData', menuData)
  // 检测json对象 配置 更新
  const compareJson: () => any[] = () => {
    let res: any[] = []
    menuData.map((menu, menuIndex) => {
      menu.children.map((item: any, index: number) => {
        if (copyData[item.parent] && copyData[item.parent][item.name]) {
          // 内部value值 与 外部value不一致
          if (JSON.stringify(configData[item.parent][item.name].value) != JSON.stringify(configData[item.parent].children[index].value)) {
            configData[item.parent][item.name].value = configData[item.parent].children[index].value
          }
          if (JSON.stringify(copyData[item.parent][item.name].value) != JSON.stringify(item.value)) {
            res.push(item)
          }
        }
      })
    })
    console.log('compareJson', res)
    return res
  }
  // 计算当前点击搜索配置项属于在menuData中的的下标
  const computedSearchIndex = (searchKey: string) => {
    let res: number[] = []
    menuData.map((item, index) => {
      // 判断当前是否为主标题
      if (item.name === searchKey) {
        res = [index]
        return index
      } else {
        if (item.hasOwnProperty(searchKey)) {
          res = [index, item[searchKey].index]
          return index
        }
      }

    })
    console.log(res, 'computedSearchIndex')
    return res
  }
  // 计算备份数据处理
  const computedUpdateConfig = () => {
    isNeedReload.value = false
    let resNoReload: any[] = []
    let tempDiff: any[] = compareJson()
    if (tempDiff.length > 0) {
      tempDiff.map((item: any) => {
        let tempIndex = configData[item.parent][item.name].index
        configData[item.parent][item.name].value = item.value
        configData[item.parent].children[tempIndex] = item
        console.log(configData[item.parent][item.name].value, 'configData[item.parent][item.name].value')
        if (item.isNeedReload) {
          isNeedReload.value = true
        } else {
          resNoReload.push(item)
        }
      })
    }
    return resNoReload
  }

  const toLine: (data: any[]) => any[] = (data) => {
    return data.reduce(
      (arr, { name, description, children = [], show = true }) => {
        let temp: any[] = show ? [{ name, description }] : [];
        return arr.concat(temp, toLine(children))
      },
      []
    )
  }

  // 保存处理
  const onSaveConfig = () => {
    let noLoadArr = computedUpdateConfig();
    console.log(isNeedReload.value, 'isNeedReload.value', configData)
    if (isNeedReload.value) {
      Modal.confirm({
        title: "保存设置，需要重启应用",
        okText: "重启",
        cancelText: "我知道",
        onOk: () => {
          ipcRenderer.send('win_reset')
        },
        onCancel: () => {
        },
      });
    } else {
      console.log(noLoadArr, "noLoadArr");
      // hdObj
      noLoadArr.map((item) => {
        ipcRenderer.send("set_config", item.name, item.value);
      });
      // 保存数据
      hdObj.saveFile(configData)
      // 更新数据
      Object.assign(copyData, hdObj.getConfigItem())
      // 更新系统配置
      ipcRenderer.send("upload_config", toRaw(configData))
      Message.success('应用设置更改成功')
    }
    // 修改global配置
    ipcRenderer.send(
      "set_global",
      ["system", "config"],
      JSON.stringify({
        data: configData,
        isNeedUpload: isNeedReload.value,
      })
    );
  }

  onMounted(async () => {
    const result = await ipcRenderer.invoke("get_global", ["system", "config"]);
    Object.assign(configData, result.data)
    isNeedReload.value = result.isNeedUpload
    let key: any
    for (key in configData) {
      if (configData.hasOwnProperty(key)) {
        if ((configData[key] as any).show) {
          let temp = JSON.parse(JSON.stringify(configData[key]))
          temp.select = false
          temp.hover = false
          let tempChildren: any[] = []
          if (temp.children) {
            temp.children.map((item: any) => {
              if (item.show) {
                tempChildren.push(item)
              }
            })
          }
          temp.children = tempChildren;
          menuData.push(temp)
        }
      }
    }
    menuData[0].select = true;
    Object.assign(searchData, toLine(menuData))
  })


  return {
    menuData,
    searchData,
    copyData,
    isNeedReload,
    compareJson,
    computedUpdateConfig,
    computedSearchIndex,
    onSaveConfig
  }
}