<template>
  <!-- 异步组件补充处理 -->
  <!-- <Suspense> -->
  <router-view />
  <!-- </Suspense> -->
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ipcRenderer } from "electron";
let goRefresh: any;
console.log("app.vue");
ipcRenderer.send("get_app");
ipcRenderer.on("set_url", (e, url, lang) => {
  locale.value = lang;
  localStorage.setItem("app_url", url);
  // Config.json 读取的地址找不到， 项目进入先运行App.vue => main.ts
  /* import("@/apis/login").then((res) => {
    goRefresh = res.goRefresh;
  }); */
});
const { locale } = useI18n();

// 初始化

onMounted(async () => {
  const result = await ipcRenderer.invoke("get_global", ["system", "config"]);
  let config = result.data;
  // 主体设置
  document.body.setAttribute("class", "theme_basic");
  // 字体大小设置
  document.body.style.fontSize = config.basic.fontSize.value + "px";
  /* document.documentElement.style.setProperty(
    "--fontUnit",
    config.basic.fontSize.value.toString()
  ); */
  // 字体设置
  document.body.style.fontFamily = config.basic.fontFamily.value;
  // document.getElementById("app")!.className = "theme_basic";
  // 判断当前是否有config配置
  ipcRenderer.on("config_change", (e, key, value) => {
    if (key == "fontFamily") {
      document.body.style.fontFamily = value;
    }
    if (key == "fontSize") {
      document.body.style.fontSize = value + "px";
    }
  });
  ipcRenderer.on("timeout", (e) => {
    goRefresh({ oldToken: localStorage.getItem("token") || "" }).then(
      (res: any) => {
        localStorage.setItem("token", res.data);
        ipcRenderer.send("clear_timeout");
      }
    );
  });
});
</script>
<style lang="less">
#app {
  touch-action: none;
  .size(100vw,100vh);
}
</style>
