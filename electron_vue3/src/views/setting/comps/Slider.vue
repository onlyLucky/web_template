<!--
 * @Author: fg
 * @Date: 2023-01-16 16:09:35
 * @LastEditors: fg
 * @LastEditTime: 2023-04-26 19:37:58
 * @Description: content
-->
<template>
  <div class="slider">
    <Slider
      style="flex-shrink: 0; width: 80%"
      v-model="props.compData.value"
      :marks="propsObj?.marks"
      :min="propsObj?.min"
      :max="propsObj?.max"
      :show-input="propsObj?.showInput"
      :show-tip="propsObj?.showTip"
    ></Slider>
    <!-- <span></span> -->
  </div>
</template>
<script lang="ts" setup>
type PropsType = {
  marks?: object;
  max: number;
  min: number;
  showInput?: boolean;
  showTip?: boolean;
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
          max: 20,
          min: 1,
          marks: {},
          showInput: false,
          showTip: false,
        },
      };
    },
  }
);
const propsObj = props.compData.props;
</script>
<style lang="less" scoped>
:deep(.ivu-slider-wrap) {
  .ivu-slider-button-wrap {
    .size(18px,18px);
    top: -6px;
    .ivu-tooltip {
      .size(18px,18px);
      display: flex;
      align-items: center;
      justify-content: center;
      .ivu-tooltip-rel {
        .size(18px,18px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.slider {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  /* display: flex;
  align-items: center;
  span {
    flex-shrink: 0;
  } */
}
</style>
