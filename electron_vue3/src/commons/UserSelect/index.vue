<!--
 * @Author: fg
 * @Date: 2023-03-27 14:17:34
 * @LastEditors: fg
 * @LastEditTime: 2023-03-30 10:04:09
 * @Description: 用户选择
-->
<template>
  <Modal
    v-model="isShow"
    width="800"
    class-name="selectModal f-row-c-c"
    :mask-closable="!loading"
  >
    <template #header>
      <h1 class="mTitle">{{ title }}</h1>
    </template>
    <div class="content f-row-b-s">
      <!-- <h1 class="cTitle">基本信息</h1> -->
      <div class="conLeft">
        <div class="header f-row-b-c">
          <div class="hLeft f-row-c-c">
            <Input
              v-show="showType == 0"
              :border="false"
              type="text"
              v-model="userParams.nickname"
              clearable
              @on-change="onSearchChange"
              placeholder="请输入用户昵称"
            ></Input>
          </div>
          <div class="hRight f-row-c-c">
            <Tooltip
              placement="bottom-end"
              content="按用户选"
              v-show="showType == 1"
            >
              <div class="optItem f-row-c-c" @click="onChangeType(0)">
                <svg-icon
                  iconName="icon-renyuan1"
                  className="optIcon"
                  size="24"
                  color="var(--fontColor)"
                ></svg-icon>
              </div>
            </Tooltip>
            <Tooltip
              placement="bottom-end"
              content="按组织选"
              v-show="showType == 0"
            >
              <div class="optItem f-row-c-c" @click="onChangeType(1)">
                <svg-icon
                  iconName="icon-zuzhijigou"
                  className="optIcon"
                  size="24"
                  color="var(--fontColor)"
                ></svg-icon>
              </div>
            </Tooltip>
          </div>
        </div>
        <div class="conLeftBox">
          <div class="conLeftItem conLeftUser" v-show="showType == 0">
            <div class="selectAll f-row-b-c">
              <Checkbox v-model="selectAll" @on-change="onSelectAll">{{
                selectAll ? "取消全部" : "全部选择"
              }}</Checkbox>
            </div>
            <div class="userBox" @scroll="onConScroll">
              <div
                class="userItem f-row-s-c"
                v-for="(item, index) in userList"
                :key="index"
                @click="onItemSelect(index)"
              >
                <div class="avatar f-row-s-c">
                  <Checkbox v-model="item.select"></Checkbox>
                  <img
                    class="avatarImg"
                    v-if="item.avatarPath"
                    :src="staticPath + item.avatarPath"
                    alt="avatar"
                  />
                  <div class="avatarBox f-row-c-c" v-if="!item.avatarPath">
                    <span>{{ item.nickname.slice(-2) }}</span>
                  </div>
                  <div
                    class="genderBox f-row-c-c"
                    v-show="item.userSex == 1 || item.userSex == 2"
                  >
                    <svg-icon
                      v-show="item.userSex == 1"
                      iconName="icon-nan"
                      className="iconGender"
                      size="16"
                      color="var(--f_color_active)"
                    ></svg-icon>
                    <svg-icon
                      iconName="icon-nv"
                      v-show="item.userSex == 2"
                      className="iconGender"
                      size="16"
                      color="var(--error)"
                    ></svg-icon>
                  </div>
                </div>
                <div class="userInfo f-col-c-s">
                  <div class="userTop">
                    <Text
                      class="equipNameTxt"
                      :ellipsis-config="{ tooltip: true }"
                      ellipsis
                      placement="bottom-start"
                    >
                      {{ item.nickname }}
                    </Text>
                  </div>
                  <div
                    class="userBottom"
                    v-show="computedCaeerName(item.careerId)"
                  >
                    <span>{{ computedCaeerName(item.careerId) }}</span>
                  </div>
                </div>
              </div>
              <div
                class="conFooter f-row-c-c"
                v-show="userList.length >= userParams.pageSize"
              >
                <span
                  class="conFooterLink"
                  v-debounce="getTypeUserData"
                  v-show="total > userList.length"
                  >查看更多</span
                >
                <span class="conFooterTxt" v-show="total == userList.length"
                  >已经到底了哦</span
                >
              </div>
              <div class="loading f-col-c" v-show="loading">
                <Icon
                  type="ios-loading"
                  size="26"
                  color="var(--f_color_active)"
                  class="conLoading iconLoading"
                ></Icon>
                <div class="conLoadingTxt">加载中...</div>
              </div>
              <div class="noDataCon f-col-s-c" v-show="userList.length <= 0">
                <img src="@/assets/images/no_data.png" alt="" />
                <span>当前暂无用户数据</span>
              </div>
            </div>
          </div>
          <div class="conLeftItem conLeftDept" v-show="showType == 1">
            <div class="selectAll f-row-b-c">
              <Checkbox v-model="deptSelectAll" @on-change="onDeptSelectAll">{{
                selectAll ? "取消全部" : "全部选择"
              }}</Checkbox>
            </div>
            <div class="userBox">
              <div class="deptTop f-row-s-c" v-show="deptSelectArr.length > 0">
                <div
                  class="deptTopItem f-row-c-c"
                  v-for="(item, index) in deptSelectArr"
                  :key="index"
                  @click="onDeptTopItemTap(index)"
                >
                  <span>{{ item.name }}</span>
                  <svg-icon
                    iconName="icon-right-arrow"
                    className="optIcon"
                    size="14"
                    color="var(--fontColor)"
                  ></svg-icon>
                </div>
              </div>
              <div
                class="deptItem f-row-b-c"
                v-for="(item, index) in deptList"
                :key="index"
                @click="onDeptItemTap(item)"
              >
                <div class="deptName f-row-s-c">
                  <Text
                    :ellipsis-config="{ tooltip: true }"
                    ellipsis
                    placement="bottom-start"
                  >
                    {{ item.name }}
                  </Text>
                  <span v-show="item.personNum" class="deptNum f-row-c-c"
                    >({{ item.personNum }})</span
                  >
                </div>
                <svg-icon
                  iconName="icon-right-arrow"
                  className="optIcon"
                  size="16"
                  color="var(--fontColor)"
                ></svg-icon>
              </div>

              <!--  -->
              <div
                class="userItem f-row-s-c"
                v-for="(item, index) in deptUserList"
                :key="index"
                @click="onDeptItemSelect(index)"
              >
                <div class="avatar f-row-s-c">
                  <Checkbox v-model="item.select"></Checkbox>
                  <img
                    class="avatarImg"
                    v-if="item.avatarPath"
                    :src="staticPath + item.avatarPath"
                    alt="avatar"
                  />
                  <div class="avatarBox f-row-c-c" v-if="!item.avatarPath">
                    <span>{{ item.nickname.slice(-2) }}</span>
                  </div>
                  <div
                    class="genderBox f-row-c-c"
                    v-show="item.userSex == 1 || item.userSex == 2"
                  >
                    <svg-icon
                      v-show="item.userSex == 1"
                      iconName="icon-nan"
                      className="iconGender"
                      size="16"
                      color="var(--f_color_active)"
                    ></svg-icon>
                    <svg-icon
                      iconName="icon-nv"
                      v-show="item.userSex == 2"
                      className="iconGender"
                      size="16"
                      color="var(--error)"
                    ></svg-icon>
                  </div>
                </div>
                <div class="userInfo f-col-c-s">
                  <div class="userTop">
                    <Text
                      class="equipNameTxt"
                      :ellipsis-config="{ tooltip: true }"
                      ellipsis
                      placement="bottom-start"
                    >
                      {{ item.nickname }}
                    </Text>
                  </div>
                  <div
                    class="userBottom"
                    v-show="computedCaeerName(item.careerId)"
                  >
                    <span>{{ computedCaeerName(item.careerId) }}</span>
                  </div>
                </div>
              </div>

              <div class="loading f-col-c" v-show="deptLoading">
                <Icon
                  type="ios-loading"
                  size="26"
                  color="var(--f_color_active)"
                  class="conLoading iconLoading"
                ></Icon>
                <div class="conLoadingTxt">加载中...</div>
              </div>
              <div
                class="noDataCon f-col-s-c"
                v-show="deptUserList.length <= 0"
              >
                <img src="@/assets/images/no_data.png" alt="" />
                <span>当前暂无用户数据</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="conLine f-row-c-c"></div>
      <div class="conRight">
        <div class="cRHeader f-row-b-c">
          <div class="f-row-s-c">
            <span class="crTitle">已选择</span>
            <span class="pNum" v-show="selectList.length > 0"
              >{{ selectList.length }} 人</span
            >
          </div>
        </div>
        <div class="conRBox f-w">
          <div
            class="conRItem f-row-c-c"
            v-for="(item, index) in selectList"
            :key="index"
            @click="onClearOne(index, item.id)"
          >
            <div class="avatar f-row-c-c">
              <img
                class="avatarImg"
                v-if="item.avatarPath"
                :src="staticPath + item.avatarPath"
                alt=""
              />
              <div class="avatarBox f-row-c-c" v-if="!item.avatarPath">
                <span>{{ item.nickname.slice(-2) }}</span>
              </div>
            </div>
            <p class="nickName">{{ item.nickname }}</p>
            <div class="delBox f-row-c-c">
              <svg-icon
                iconName="icon-guanbi1"
                className="iconGender"
                size="8"
                color="var(--bg)"
              ></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button type="text" v-debounce="onCancel">取消</Button>
      <Button type="primary" :loading="loadingBtn" v-debounce="onConfirm"
        >确定</Button
      >
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { Form, Message } from "view-ui-plus";
import { getUserList, getUserCareer } from "@/apis/user";
import { useUser } from "./useUser";
import { useDept } from "./useDept";
import { useTools } from "@/hooks/useTools";
let emit = defineEmits<{
  (e: "onConfirm"): void;
}>();
let props = withDefaults(
  defineProps<{
    title: string;
    selectData: any[];
  }>(),
  {
    title: "选择人员",
    selectData: () => [],
  }
);
const { useArrJsonNoOverlap } = useTools();
const {
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
  uploadSelect,
} = useUser();

const {
  deptId,
  deptLoading,
  deptList,
  deptUserList,
  deptSelectArr,
  deptSelectIds,
  deptSelectList,
  deptSelectAll,
  initDept,
  getDeptUser,
  onDeptItemTap,
  onDeptItemSelect,
  onDeptTopItemTap,
  onDeptSelectAll,
  onDeptDelItem,
  uploadDeptSelect,
} = useDept();

let staticPath = localStorage.getItem("staticPath");
let isShow = ref<boolean>(false);
type SearchType = 0 | 1;
let showType = ref<SearchType>(0); // 左侧搜索类型，0： 用户列表搜索   1： 组织架构搜索
const handleShow = () => {
  isShow.value = true;
  showType.value = 0;
  if (userList.value.length <= 0) getUserData();
  if (deptList.value.length <= 0 || deptUserList.value.length <= 0) {
    getDeptUser();
  }
};

let loadingBtn = ref<boolean>(false);

// 切换搜索类型
const onChangeType = (type: SearchType) => {
  if (type == 0) {
    selectIds.value = deptSelectIds.value;
    selectList.value = deptSelectList.value;
    uploadSelect();
  } else {
    deptSelectIds.value = selectIds.value;
    deptSelectList.value = selectList.value;
    uploadDeptSelect();
  }
  showType.value = type;
};

// 检测props selectData
watch(
  () => props.selectData,
  (n) => {
    selectIds.value = [];
    selectList.value = [];
    deptSelectIds.value = [];
    deptSelectList.value = [];
    props.selectData.map((item: any) => {
      selectIds.value.push(item.id);
      deptSelectIds.value.push(item.id);
    });
    let temp = userList.value;
    temp.map((item: any) => {
      item.select = selectIds.value.indexOf(item.id) != -1;
    });
    userList.value = temp;
    selectList.value = props.selectData;
    deptSelectList.value = props.selectData;
  },
  { deep: true }
);
watch(
  () => deptSelectIds,
  (n) => {
    selectIds.value = deptSelectIds.value;
    selectList.value = deptSelectList.value;
  },
  { deep: true }
);

// 滚动区域监听
const onConScroll = (e: any) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  if (scrollTop + clientHeight === scrollHeight) {
    // console.log("滚动到底部", total.value, userList.value.length, userParams);
    getTypeUserData();
  }
};

const getTypeUserData = () => {
  if (total.value > userList.value.length) {
    userParams.pageNum = userParams.pageNum + 1;
    getUserData();
  }
};

// 删除左侧某一项操作
const onClearOne = (index: number, id: any) => {
  if (showType.value == 0) {
    onDelItem(index, id);
  } else {
    onDeptDelItem(index, id);
  }
};

const initUser = () => {
  let temp = userList.value;
  temp.map((item) => {
    item.select = false;
  });
  userList.value = temp;
};

const handleResult = () => {
  // let;
};

// 操作
const onCancel = () => {
  isShow.value = false;
  initDept();
  loading.value = false;
  loadingBtn.value = false;
};
const onConfirm = () => {
  emit("onConfirm");
  loadingBtn.value = true;
};
const onConfirmError = () => {
  loading.value = false;
  loadingBtn.value = false;
};
const returnSelect = () => {
  return {
    selects: [...selectList.value],
    handle: useArrJsonNoOverlap(
      [...props.selectData],
      [...selectList.value],
      "id"
    ),
  };
};

defineExpose({
  loadingBtn,
  handleShow,
  returnSelect,
  onCancel,
  onConfirmError,
});
</script>
<style lang="less">
.selectModal {
  .size(100%,100%);
  user-select: none;
  overflow: hidden;
  .mTitle {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    // @fontColor
    color: @f_color_h6;
  }
  .content {
    .size(100%,500px);
    .conLeft {
      .size(calc(50% - 16px), 100%);
      .header {
        .size(100%,40px);
        .hLeft {
          .size(100%,100%);
          .ivu-input {
            border: none;
            border-radius: 4px;
            background-color: @menu_item_hover;
            cursor: pointer;
          }
          .ivu-input:focus {
            box-shadow: none;
          }
        }
        .hRight {
          .size(auto,100%);
          flex-shrink: 0;
          .optItem {
            padding: 6px;
            border-radius: 4px;
            background-color: @bg;
            cursor: pointer;
            margin-left: 10px;
            &:hover {
              background-color: @search_bottom_border;
            }
            span {
              margin-left: 4px;
              font-size: 14px;
              color: @f_color_h3;
            }
          }
        }
      }
      .conLeftBox {
        .size(100%,calc(100% - 40px));
        position: relative;
        .conLeftItem {
          .size(100%,100%);
          .selectAll {
            .size(100%,34px);
            padding: 0 10px;
            box-sizing: border-box;
            .ivu-checkbox-label-text {
              padding-left: 12px;
            }
          }
          .userBox {
            .size(100%, calc(100% - 34px));
            overflow: auto;
            .userItem {
              .size(100%,68px);
              padding: 0 10px;
              box-sizing: border-box;
              border-radius: 6px;
              cursor: pointer;
              .avatar {
                .size(80px,60px);
                margin-right: 10px;
                position: relative;
                flex-shrink: 0;
                .ivu-checkbox-wrapper {
                  margin-right: 12px;
                  pointer-events: none;
                }

                .avatarImg {
                  .size(50px,50px);
                  border-radius: 6px;
                }
                .avatarBox {
                  .size(50px,50px);
                  border-radius: 6px;
                  background-color: @f_color_active;
                  span {
                    font-size: 16px;
                    color: @bg;
                  }
                }
                .genderBox {
                  position: absolute;
                  bottom: 0px;
                  right: 0px;
                  background: @bg;
                  padding: 2px;
                  border-radius: 50%;
                  border: 1px solid @search_bottom_border;
                }
              }
              &:hover {
                background: @menu_hover;
              }
              .userInfo {
                .size(100%,60px);
                flex-shrink: 1;
                .userTop {
                  font-size: 16px;
                  .ivu-typography {
                    color: @f_color_h3;
                  }
                }
                .userBottom {
                  margin-top: 6px;
                  color: @fontColor;
                  font-size: 14px;
                }
              }
            }
          }
        }
        .conLeftUser {
          .userBox {
            .conFooter {
              .size(100%,20px);
              span {
                font-size: 14px;
                padding: 0px 10px;
              }
              span.conFooterLink {
                cursor: pointer;
                color: @f_color_active;
              }
              span.conFooterTxt {
                color: @fontColor;
              }
            }
          }
        }
        .conLeftDept {
          .userBox {
            position: relative;
            .deptTop {
              position: sticky;
              top: 0px;
              left: 0px;
              background-color: @bg;
              z-index: 2;
              .size(100%,50px);
              margin-bottom: 10px;
              padding: 0 10px;
              box-sizing: border-box;
              overflow: auto;
              border-bottom: 1px solid @search_bottom_border;
              // background-color: @content_bg;
              .deptTopItem {
                flex-shrink: 0;
                .size(auto, 100%);
                margin-right: 10px;
                span {
                  font-size: 14px;
                  color: @f_color_active;
                  cursor: pointer;
                  line-height: 18px;
                }
                &:last-child {
                  span {
                    color: @fontColor;
                    cursor: auto;
                  }
                }
              }
            }
            .deptItem {
              z-index: 1;
              .size(100%,50px);
              padding: 0px 10px;
              box-sizing: border-box;
              border-radius: 6px;
              cursor: pointer;
              .deptName {
                .size(100%,100%);
                .ivu-typography {
                  font-size: 16px;
                  color: @f_color_h3;
                }
                .deptNum {
                  .size(auto,100%);
                  flex-shrink: 0;
                  font-size: 14px;
                  color: @fontColor;
                  margin-left: 10px;
                  margin-bottom: 2px;
                }
              }
              .optIcon {
                flex-shrink: 0;
                margin-left: 10px;
              }
              &:hover {
                background: @menu_hover;
              }
            }
            .userItem {
              z-index: 1;
            }
          }
        }
      }
      .loading {
        .size(100%,100%);
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(255, 255, 255, 0.7);
        .conLoading {
          margin-bottom: 10px;
        }
        .conLoadingTxt {
          text-align: center;
          font-size: 14px;
          color: @f_color_active;
        }
      }
      .noDataCon {
        .size(auto,auto);
        img {
          .size(200px,200px);
          margin-top: 50px;
          margin-bottom: 10px;
        }
        span {
          font-size: 14px;
          color: @fontColor;
        }
      }
    }
    .conLine {
      .size(32px,100%);
      &::before {
        content: "";
        .size(1px, 100%);
        background: @search_bottom_border;
      }
    }
    .conRight {
      .size(calc(50% - 16px), 100%);
      .cRHeader {
        .size(100%, 40px);
        .crTitle {
          font-size: 16px;
          color: @f_color_h3;
          margin-right: 10px;
        }
        .pNum {
          font-size: 14px;
          color: @fontColor;
        }
      }
      .conRBox {
        .size(100%, calc(100% - 40px));
        overflow: auto;
        align-content: baseline;
        .conRItem {
          padding: 4px;
          height: 38px;
          box-sizing: border-box;
          background: @content_bg;
          border-radius: 8px;
          margin-bottom: 10px;
          margin-right: 10px;
          .avatar {
            .size(30px,30px);
            margin-right: 4px;
            .avatarImg {
              .size(100%,100%);
              border-radius: 6px;
            }
            .avatarBox {
              .size(100%,100%);
              border-radius: 6px;
              background-color: @f_color_active;
              span {
                font-size: 10px;
                color: @bg;
              }
            }
          }
          .nickName {
            font-size: 14px;
            color: @f_color_h3;
            margin-right: 10px;
          }
          .delBox {
            .size(16px,16px);
            background: @fontColor;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
  }
  .ivu-modal {
    top: 0px;
  }
  .ivu-modal-content {
    .ivu-modal-close {
      top: 22px;
    }
    .ivu-modal-header {
      border-bottom: none;
      display: flex;
    }
    .ivu-modal-body {
      padding: 0px 16px;
      .ivu-form-item-error .ivu-input,
      .ivu-input {
        border: none;
      }
      .ivu-input {
        font-size: 14px;
      }
      .ivu-form-item-error .ivu-input:focus,
      .ivu-date-picker-focused input:not([disabled]),
      .ivu-input:focus {
        box-shadow: none;
      }
      .ivu-form-item-error-tip {
        padding-left: 10px;
        font-size: 12px;
      }
      .ivu-form-item {
        margin-bottom: 0px;
      }
    }
    .ivu-modal-footer {
      border-top: none;
    }
  }
}
</style>
