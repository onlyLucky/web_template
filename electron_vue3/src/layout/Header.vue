<!--
 * @Author: fg
 * @Date: 2022-12-14 14:04:52
 * @LastEditors: fg
 * @LastEditTime: 2023-02-23 15:46:45
 * @Description: header
-->
<template>
  <div class="header">
    <div class="headerLeft">
      <HLogo></HLogo>
    </div>
    <div class="headerRight f-row-e-c">
      <Tooltip placement="bottom" content="设置">
        <SvgIcon
          iconName="icon-shezhi-xianxing"
          className="setting"
          size="20"
          color="var(--fontColor)"
          @click="settingTap"
        ></SvgIcon>
      </Tooltip>
      <SystemOpt></SystemOpt>
    </div>
  </div>
</template>
<script setup lang="ts">
import SystemOpt from "@/commons/system_opt/index";
import HLogo from "./comps/HLogo.vue";
import SvgIcon from "@/commons/SvgIcon/index.vue";
import { ipcRenderer } from "electron";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const settingTap = async () => {
  await ipcRenderer.invoke("open-win", {
    type: 0,
    urlName: "setting",
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    resizable: false,
    title: t("setting"),
  });
};
</script>
<style scoped lang="less">
.header {
  width: 100vw;
  height: 48px;
  background-color: @bg;
  // background-color: @f_color_active;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  /* 值为no-drag时不可拖拽 */
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  z-index: 2;
  position: relative;
  justify-content: space-between;
  cursor: pointer;
  .setting {
    .size(20px,20px);
    margin-right: 6px;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
}
</style>
