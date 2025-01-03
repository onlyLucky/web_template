<!--
 * @Author: fg
 * @Date: 2023-01-10 16:35:42
 * @LastEditors: fg
 * @LastEditTime: 2023-01-11 13:56:49
 * @Description: 水印组件
-->
<template>
  <div class="waterMask" v-if="show"></div>
</template>
<script setup lang="ts">
import { waterMark } from "./waterMark.js";

export type SettingType = {
  textArr: any[]; // 需要展示的文字，多行就多个元素【必填】
  font?: string; // 字体样式
  fillStyle?: string; //描边样式 颜色
  maxWidth?: number; // 文字水平时最大宽度
  minWidth?: number; // 文字水平时最小宽度
  lineHeight?: number; // 文字行高
  marginRight?: number; // 每个水印的右间隔
  marginBottom?: number; // 每个水印的下间隔
  left?: number; // 整体背景距左边的距离
  top?: number; // 整体背景距上边的距离
  dom?: string; //mask塞到那个dom里面
  maskDivId?: string; //mask div dom的class名称
  [key: string]: any;
};
const props = withDefaults(
  defineProps<{
    option: SettingType;
    show: boolean;
  }>(),
  {
    show: true,
    option: () => {
      return {
        textArr: ["文本加水印"],
        font: "18px '微软雅黑'",
        fillStyle: "rgba(0,0,0,0.05)",
        maxWidth: 100,
        minWidth: 40,
        lineHeight: 24,
        deg: -35,
        marginRight: 100,
        marginBottom: 50,
        left: 20,
        top: 20,
        dom: "",
        maskDivId: "waterMask",
      };
    },
  }
);

onMounted(() => {
  waterMark.init({
    ...props.option,
  });
});
</script>
<style lang="less" scoped>
.waterMask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
}
</style>
