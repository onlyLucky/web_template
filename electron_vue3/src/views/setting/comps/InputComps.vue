<!--
 * @Author: fg
 * @Date: 2023-06-07 19:42:57
 * @LastEditors: fg
 * @LastEditTime: 2023-06-07 19:53:58
 * @Description: Input
-->
<template>
  <div class="input">
    <Input
      v-model="props.compData.value"
      :type="props.compData.props?.type"
      :placeholder="props.compData.props?.placeholder"
      :clearable="props.compData.props?.clearable"
    >
    </Input>
  </div>
</template>
<script lang="ts" setup>
type PropsType = {
  type:
    | "text"
    | "password"
    | "textarea"
    | "url"
    | "email"
    | "date"
    | "number"
    | "tel";
  placeholder: string;
  clearable: boolean;
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
          type: "text",
          placeholder: "请输入",
          clearable: false,
        },
      };
    },
  }
);
</script>
<style lang="less" scoped>
.input {
  width: 400px;
  touch-action: none; //无用
}
</style>
