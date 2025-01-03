<!--
 * @Author: fg
 * @Date: 2023-01-29 09:35:31
 * @LastEditors: fg
 * @LastEditTime: 2023-04-07 19:15:39
 * @Description: dd风格的头像组件处理
-->
<template>
  <div class="avatarBox f-col-b-c">
    <div
      :class="['avatar', 'f-col-c-c', !avatar ? 'avatarColor' : '']"
      :style="style"
    >
      <div class="imgBox f-col-c-c" v-if="avatar">
        <img :src="avatar" :alt="nickname" />
      </div>
      <span v-else>{{ nickname.substring(nickname.length - 2) }}</span>
      <div v-if="dot" class="topRedPoint"></div>
      <div v-if="count > 0" class="topRedNum f-row-c-c">
        {{ count > 0 && count <= 99 ? count : "99+" }}
      </div>
      <div class="tag" v-if="tagname">{{ tagname }}</div>
    </div>
    <Text
      className="userName"
      :ellipsis-config="{ tooltip: true }"
      ellipsis
      placement="bottom-start"
      v-show="bottomName"
    >
      {{ nickname }}
    </Text>
  </div>
</template>
<script setup lang="ts">
import _ from "lodash";
const props = withDefaults(
  defineProps<{
    shape?: "circle" | "square";
    size?: "large" | "small" | "default" | number;
    nickname: string;
    tagname?: string;
    avatar?: string | null; //头像展示
    count?: number; //消息数
    dot?: boolean; //红点
    bottomName?: boolean; //底部展示nickname
  }>(),
  {
    shape: "circle",
    size: "default",
    nickname: "avatar",
    avatar: null,
    tagname: "",
    dot: false,
    count: 0,
    bottomName: true,
  }
);
// 头像size样式预处理
let style = computed(() => {
  if (_.isNumber(props.size)) {
    return { width: `${props.size}px`, height: `${props.size}px` };
  } else {
    switch (props.size) {
      case "large":
        return { width: "40px", height: "40px" };
        break;
      case "default":
        return { width: "36px", height: "36px" };
        break;
      case "small":
        return { width: "32px", height: "32px" };
        break;
      default:
        return {};
        break;
    }
  }
});
</script>
<style scoped lang="less">
.avatarBox {
  .size(100%,100%);
  user-select: none;
  .avatarColor {
    background-color: @f_color_active;
  }
  .avatar {
    .size(36px,36px);
    border-radius: 4px;
    font-size: 14px;
    color: @bg;
    flex-shrink: 0;
    position: relative;
    .imgBox {
      .size(100%,100%);
      border-radius: 4px;
      overflow: hidden;
      img {
        .size(100%,100%);
      }
    }
    .tag {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      background-color: @bg;
      padding: 0 6px;
      border-radius: 20px;
      box-sizing: border-box;
      color: @f_color_active;
      font-size: 10px;
      white-space: nowrap;
      border: 1px solid @meet_summary_icon_time;
    }
    .topRedPoint {
      .size(10px,10px);
      border-radius: 50%;
      background: red;
      position: absolute;
      border: 2px solid @bg;
      top: -4px;
      right: -4px;
      box-sizing: border-box;
    }
    .topRedNum {
      border-radius: 50%;
      background: red;
      color: @bg;
      .size(22px,22px);
      position: absolute;
      border: 2px solid @bg;
      top: -10px;
      right: -10px;
      font-size: 9px;
      line-height: 9px;
      box-sizing: border-box;
    }
  }
  .userName {
    .size(60px,16px);
    line-height: 16px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
