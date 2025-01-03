<!--
 * @Author: fg
 * @Date: 2023-06-14 16:20:10
 * @LastEditors: fg
 * @LastEditTime: 2023-06-14 17:24:15
 * @Description: content
-->
<template>
  <div class="sOpt_Box">
    <div class="sIconBox" @click="onMinTap" v-show="isShowMinSize">
      <SvgIcon iconName="icon-2zuixiaohua-2" size="18" :color="color"></SvgIcon>
    </div>

    <div class="sIconBox" @click="onMaxTap" v-show="smallSizeFlag">
      <SvgIcon iconName="icon-zuidahua1" size="20" :color="color"></SvgIcon>
    </div>

    <Tooltip content="还原" v-show="!smallSizeFlag">
      <div class="sIconBox" @click="onMaxTap">
        <SvgIcon
          iconName="icon-chuangkouhuanyuan"
          size="20"
          :color="color"
        ></SvgIcon>
      </div>
    </Tooltip>

    <div class="sIconBox" @click="onCloseTap">
      <SvgIcon iconName="icon-guanbi1" size="16" :color="color"></SvgIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from "electron";
import SvgIcon from "../SvgIcon/index.vue";

const props = withDefaults(
  defineProps<{
    color: string;
    isShowChangeSize: boolean;
    isShowMinSize: boolean;
  }>(),
  {
    color: "#409eff",
    isShowChangeSize: true,
    isShowMinSize: true,
  }
);

let emit = defineEmits<{
  (e: "close"): void;
}>();

let smallSizeFlag = ref<boolean>(true);

const onMinTap = () => {
  ipcRenderer.send("window_min");
};

const onMaxTap = () => {
  ipcRenderer.send("window_max");
};

const onCloseTap = () => {
  // ipcRenderer.send("window_close");
  emit("close");
};

onMounted(() => {
  ipcRenderer.on("window_max_status", (event, status) => {
    smallSizeFlag.value = !status;
    console.log("window_max_status", status);
  });
});
</script>
<style lang="less" scoped>
.sOpt_Box {
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  user-select: none;
  .sIconBox {
    width: 40px;
    height: 40px;
    // background-color: @bg;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: no-drag;
    &:hover {
      background-color: @menu_item_hover;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
