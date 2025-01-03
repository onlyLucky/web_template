<!--
 * @Author: fg
 * @Date: 2023-01-06 18:03:51
 * @LastEditors: fg
 * @LastEditTime: 2023-02-01 15:39:55
 * @Description: content
-->
<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from "vue";
import _ from "lodash";
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#409eff",
  },
  size: {
    type: String,
    default: "16",
  },
  style: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});
// icon style
const svgStyle = computed(() => {
  if (_.isEmpty(props.style)) {
    return {
      width: props.size + "px",
      height: props.size + "px",
    };
  }
  return props.style;
});
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  vertical-align: -2px;
}
</style>
