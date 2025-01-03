<!--
 * @Author: fg
 * @Date: 2023-01-16 10:10:33
 * @LastEditors: fg
 * @LastEditTime: 2023-04-19 19:31:00
 * @Description: content
-->
<template>
  <component :is="compName" :compData="data"></component>
</template>
<script lang="ts" setup>
import SelectComps from "./Select.vue";
import RadioGroupComps from "./RadioGroup.vue";
import SliderComps from "./Slider.vue";
import InputComps from "./InputComps.vue";
const comps: Map<string, any> = new Map([["Select", SelectComps]]);
comps.set("RadioGroup", RadioGroupComps);
comps.set("Slider", SliderComps);
comps.set("Input", InputComps);
// console.log(comps, comps.get("Select"));

const props = withDefaults(
  defineProps<{
    data?: DataType;
    index: number[];
  }>(),
  {
    data: () => {
      return {
        description: "",
        name: "",
        parent: "",
        value: "",
        type: "",
        props: {},
      };
    },
    index: () => [0, 0],
  }
);
const compName = comps.get(props.data.type) || "";
</script>
<style lang="less" scoped></style>
