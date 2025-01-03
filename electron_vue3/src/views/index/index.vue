
<template>
  <div class="PageIndex">
    <div class="header f-row-b-c">
      <div></div>
      <div class="headerRight f-row-e-c">
        <!-- <Tooltip placement="bottom" content="设置">
          <div class="hRIcon f-row-c-c">
            <SvgIcon
              iconName="icon-shezhi-xianxing"
              className="setting"
              size="20"
              color="var(--bg)"
              @click="settingTap"
            ></SvgIcon>
          </div>
        </Tooltip> -->
        <SystemOpt color="var(--bg)" @close="onWinClose"></SystemOpt>
      </div>
    </div>
    <div
      class="content"
      :style="{
        height: 'calc(100% - 48px)',
      }"
    >
      <h1>hello index</h1>
      <Button>Default</Button>
    </div>
    
  </div>
</template>
<script setup lang="ts">
import SystemOpt from "@/commons/system_opt/index.vue";
import { useRoute } from "vue-router";
import { ipcRenderer } from "electron";
import { Message, Modal } from "view-ui-plus";
import { useI18n } from "vue-i18n";
const fs = require("fs");
const path = require("path");
const route = useRoute();
const { exec } = require("child_process");
const queryParams = reactive<FileQPType>(route.query as FileQPType);

const { t } = useI18n();

let mediaConfig = reactive<any>({
  width: "",
  height: "",
});
// 选中的文件夹路径
let dicPath = ref<string>("");
// 当前是否被修复的视频会议
let isFixed = ref<boolean>(false);

// 下载
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

const onWinClose = () => {
  console.log("onWinClose---///");
  Modal.confirm({
    title: "是否确认退出应用",
    onOk: () => {
      ipcRenderer.send("quit_app");
    },
  });
};



onMounted(() => {
  
  // 点击选择文件监听
  /* ipcRenderer.on("sendSelectFileResult", async (e, data) => {
  }); */
});
</script>
<style scoped lang="less">
:deep(.hTitle) {
  .ivu-typography {
    color: @bg;
    .fontSizePx2Em(16);
    cursor: pointer;
    font-weight: bold;
  }
}
:deep(.ivu-upload-drag) {
  .size(100%,100%);
  background: transparent;
  border: none;
}
:deep(.ivu-upload-list) {
  display: none;
}
.PageIndex {
  .size(100vw,100vh);
  background-color: @video_header;
  .header {
    .size(100%,48px);
    padding: 0 8px 0 16px;
    box-sizing: border-box;
    background-color: @video_header;
    -webkit-app-region: drag;
    .hTitle {
      .fontSizePx2Em(16);
      color: @bg;
      padding-left: 48px;
      box-sizing: border-box;
      position: relative;
      .hTitleIcon {
        position: absolute;
        top: 1px;
        left: 10px;
        cursor: pointer;
        -webkit-app-region: no-drag;
      }
    }
    .headerRight {
      -webkit-app-region: no-drag;
      .hRIcon {
        flex-shrink: 0;
        .size(40px,40px);
        cursor: pointer;
      }
    }
  }
  .content {
    .size(100%, calc(100% - 48px));
    background-color: #fff;
    overflow: hidden;

  }
}
</style>
