<!--
 * @Author: fg
 * @Date: 2023-01-16 13:37:32
 * @LastEditors: fg
 * @LastEditTime: 2023-04-26 19:35:41
 * @Description: content
-->

<template>
  <div class="select">
    <Select
      style="width: 200px"
      placeholder="请选择"
      v-model="props.compData.value"
      @on-change="onChange"
    >
      <Option
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
        >{{ item.label }}</Option
      >
    </Select>
  </div>
</template>
<script lang="ts" setup>
type PropsType = {
  filterable?: boolean;
  option: any[];
};

const props = withDefaults(
  defineProps<{
    compData?: DataType<PropsType>;
  }>(),
  {
    compData: () => {
      return {
        description: "",
        name: "",
        parent: "",
        value: "",
        type: "",
        props: {
          filterable: true,
          option: [],
        },
      };
    },
  }
);
const options = props.compData.props?.option;

const onChange = () => {};
/* let selectVal = ref<string>(props.compData.value);
const onChange = (val: any) => {
  selectVal.value = val;
}; */
</script>
<style lang="less" scoped>
:deep(.ivu-select) {
  .fontSizePx2Em(14);
  .ivu-select-dropdown-list {
    .ivu-select-item {
      .fontSizePx2Em(14);
    }
  }
  .ivu-select-input {
    .fontSizePx2Em(14);
  }
  .ivu-select-selected-value {
    .fontSizePx2Em(14);
  }
}
.select {
  touch-action: none; //无用
}
</style>
