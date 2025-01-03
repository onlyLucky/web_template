<div align="center">
  <h1>vue3&ts</h1>
</div>

## 目录

- [目录](#目录)
- [Vue](#vue)
  - [V1.vue 中 hooks 的使用](#v1vue-中-hooks-的使用)
    - [01.方便使用](#01方便使用)
- [ts](#ts)
  - [报错处理](#报错处理)
    - [01.赋值表达式的左侧不能是可选属性访问](#01赋值表达式的左侧不能是可选属性访问)
- [使用场景](#使用场景)
  - [01.ref 获取 dom 标签 ts 类型](#01ref-获取-dom-标签-ts-类型)
  - [02.ts Event 类型处理](#02ts-event-类型处理)
  - [03.自定义组件 export 类型](#03自定义组件-export-类型)
- [参考链接](#参考链接)

## Vue

### V1.vue 中 hooks 的使用

#### 01.方便使用

- 可以将导出的变量放置在与文件名称相同的函数中，比如`useTap.ts`中 声明一个`useTap()`

```ts
// useTap.ts
let tapFlag = ref<boolean>(false);
const useTap = () => {
  return {
    tapFlag,
  };
};

const handleTap = (flag: boolean) => {
  tapFlag.value = flag;
};

export { useTap, handleTap };
```

使用

```vue
<template>
  <div @click="handleTap(!tapFlag)">tap</div>
</template>
<script setup>
import { useTap, handleTap } from "./useTap.ts";
const { tapFlag } = useTap();
</script>
```

## ts

### 报错处理

#### 01.赋值表达式的左侧不能是可选属性访问

报错代码

```ts
refAudio.value?.currentTime = 20;
```

解决报错

```ts
refAudio.value!.currentTime = 20;
```

!not null 的断言操作符，不执行运行时检查，告诉编译器只需要知道这个东西

## 使用场景

### 01.ref 获取 dom 标签 ts 类型

```vue
<template>
  <audio ref="refAudio"></audio>
</template>
<script setup lang="ts">
const refAudio = ref<HTMLAudioElement>();
</script>
```

参考以下列表：

```ts
	"a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;

```

### 02.ts Event 类型处理

如果不知道当前 event 事件类型，可以参考下面的处理：

```vue
<template>
  <audio @timeupdate="onPlayChange"></audio>
</template>
<script setup lang="ts">
/**
 * @description: 监听timeupdate事件触发
 * @param {*} e 事件对象
 * @return {*}
 */
const onPlayChange = (e: Event) => {
  console.log((e.target as HTMLAudioElement).currentTime);
};
</script>
```

### 03.自定义组件 export 类型

自定义组件中

```vue
<!-- Comps.vue -->
<template>
  <div class="meetListCon">
    <h1>meet List</h1>
  </div>
</template>
<script setup lang="ts">
export type CompType = {
  name: string;
};
</script>
<style scoped lang="less">
.meetListCon {
  h1 {
    font-size: 30px;
  }
}
</style>
```

引入使用

```ts
import Comps, { CompType } from "./Comps.vue";
```

## 参考链接

[vue3 slot 插槽在 tsx 中的使用方法](https://blog.csdn.net/weixin_45291937/article/details/127869765)

很多 vue3 中 tsx 写法中可以在 react 的 tsx 中参考：
