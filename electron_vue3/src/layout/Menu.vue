<!--
 * @Author: fg
 * @Date: 2022-12-15 16:43:56
 * @LastEditors: fg
 * @LastEditTime: 2023-03-16 16:15:48
 * @Description: content
-->
<template>
  <div class="menu f-col-s-c">
    <div
      :class="[
        'menuItem',
        activeRouteName == item.name ? 'active' : '',
        open ? 'menuItemRow f-row-s-c' : 'menuItemCol f-col-c-c',
      ]"
      v-for="(item, index) in menuList"
      :key="index"
      @click="handleMenuTap(item)"
    >
      <!-- <Dropdown placement="right-start"> -->
      <Tooltip
        :content="item.meta?.title"
        placement="right"
        :disabled="open"
        :delay="600"
        theme="light"
      >
        <div :class="[open ? 'f-row-s-c' : 'f-col-c-c']">
          <SvgIcon
            :iconName="item.meta?.icon"
            :size="open ? '26' : activeRouteName == item.name ? '30' : '26'"
            :color="
              activeRouteName == item.name ? 'var(--bg)' : 'var(--fontColor)'
            "
          ></SvgIcon>

          <span v-show="open">{{ item.meta?.title }}</span>
        </div>
      </Tooltip>
      <!-- <template #list>
          <DropdownMenu>
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </template> -->
      <!-- </Dropdown> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import routes from "@/router/routes";
// Submenu
import { ref, watch } from "vue";
import { Dropdown } from "view-ui-plus";
const props = withDefaults(
  defineProps<{
    open: boolean;
  }>(),
  {
    open: false,
  }
);
let menuList: RouteRecordRaw[] | undefined = [] as RouteRecordRaw[];
let activeRouteName = ref<string>("");
const route = useRoute();
const router = useRouter();
routes.map((item) => {
  if (item.name == "_index") {
    menuList = item.children;
  }
});

const handleMenuTap = (item: any) => {
  router.push({ name: item.name });
};

// 监听路由
watch(
  () => route.name,
  (n, o) => {
    console.log(n, o);
    activeRouteName.value = <string>n;
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
:deep(.ivu-menu) {
  width: 100% !important;
}
:deep(.ivu-menu-vertical .ivu-menu-submenu-title) {
  padding: 14px;
}
:deep(.ivu-menu-item:hover) {
  background-color: @menu_item_hover;
}
:deep(.ivu-menu-vertical.ivu-menu-light:after) {
  display: none;
}
:deep(.ivu-dropdown) {
  width: 100%;
}
:deep(.ivu-select-dropdown) {
  width: 140px;
  margin-left: 10px;
}
:deep(.menuItemRow) {
  .ivu-select-dropdown {
    margin-left: 24px;
  }
}
:deep(.menuItemCol) {
  .ivu-select-dropdown {
    margin-left: 10px;
  }
}
.menu {
  .size(100%,100%);
  user-select: none;
  overflow: auto;
  .menuItemBox {
    width: 100%;
  }
  .menuItem {
    // background-color: pink;
    cursor: pointer;
    &:hover {
      background-color: @menu_hover;
    }
  }
  .menuItem.active {
    background-color: @f_color_active;
    span {
      color: @bg;
    }
  }
  .menuItemCol {
    .size(64px,64px);
    border-radius: 6px;
    margin-top: 18px;
    span {
      font-size: 12px;
      margin-top: 2px;
      color: @fontColor;
    }
  }
  .menuItemCol.active {
    span {
      margin-top: 6px;
      font-size: 14px;
    }
  }
  .menuItemRow {
    .size(calc(100% - 20px),50px);
    margin-top: 10px;
    padding: 0 20px;
    box-sizing: border;
    border-radius: 6px;
    span {
      font-size: 16px;
      color: @fontColor;
      margin-left: 10px;
    }
  }
  .menuItemRow.active {
  }
}
</style>
