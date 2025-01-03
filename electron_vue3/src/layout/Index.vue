<!--
 * @Author: fg
 * @Date: 2022-12-14 14:05:24
 * @LastEditors: fg
 * @LastEditTime: 2023-02-25 15:02:19
 * @Description: Index
-->
<template>
  <div class="_app">
    <WaterMark :option="waterSetting"></WaterMark>
    <Header></Header>
    <div class="appContent f">
      <div class="menuBox" :style="{ width: menuWidth + 'px' }">
        <Menu :open="isOpen"></Menu>
        <div class="hideOpt">
          <div
            class="optCon optLeft f-row-c-c"
            v-show="isOpen"
            v-debounce="changeStatus"
          >
            <Icon type="ios-arrow-back" size="24" color="#666" />
          </div>
          <div
            class="optCon optRight f-row-c-c"
            v-show="!isOpen"
            v-debounce="changeStatus"
          >
            <Icon type="ios-arrow-forward" size="24" color="#666" />
          </div>
        </div>
      </div>
      <div class="contentBox" :style="{ width: `calc(100% - ${menuWidth}px)` }">
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
import Menu from "./Menu.vue";
import WaterMark, { SettingType } from "@/commons/WaterMask/index.vue";
const waterSetting = ref<SettingType>({
  textArr: ["可立批"],
  fillStyle: "rgba(0,0,0,.05)",
});
let isOpen = ref<boolean>(false);
let menuWidth = ref<number>(80);
const changeStatus = () => {
  isOpen.value = !isOpen.value;
  menuWidth.value = isOpen.value ? 200 : 80;
};
</script>
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.99, -0.01, 0.37, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
._app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .appContent {
    width: 100%;
    height: calc(100% - 48px);
    background-color: @bg;
    position: relative;
    z-index: 1;
    .menuBox {
      width: 80px;
      height: 100%;
      background-color: @bg;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
      position: relative;
      z-index: 1;
      position: relative;
      transition: width 0.2s;
      .hideOpt {
        .size(60px,100px);
        position: absolute;
        top: 50%;
        right: -30px;
        transform: translateY(-50%);
        // background-color: lightblue;
        &:hover {
          .optCon {
            display: flex;
          }
        }
        .optCon {
          display: none;
          .size(30px, 80px);
          background-color: #e9e9e9;
          position: absolute;
          top: 50%;
          box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
          transform: translateY(-50%);
          cursor: pointer;
        }
        .optLeft {
          left: 0px;
          border-radius: 12px 0% 0% 12px;
        }
        .optRight {
          right: 0;
          border-radius: 0% 12px 12px 0%;
        }
      }
    }
    .contentBox {
      width: calc(100% - 80px);
      transition: width 0.2s;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      background-color: @content_bg;
      position: relative;
      z-index: 0;
      .content {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: @bg;
        overflow: auto;
        overflow-x: hidden;
      }
    }
  }
}
</style>
