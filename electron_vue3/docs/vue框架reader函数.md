<div align="center">
  <h1>vue reader函数使用</h1>
  <p>Vue3 使用 h 函数 推荐使用函数式插槽，以便获得更佳的性能</p>
  <p>使用h函数去渲染是一个比较神奇的经历，线上搜到的资料比较散，在这里做一下总结</p>
</div>

## 目录

- [目录](#目录)
- [自定义指令](#自定义指令)
- [参考链接](#参考链接)

## 自定义指令

可以使用 `withDirectives` 将自定义指令应用于 `vnode`：

```js
import { h, withDirectives } from "vue";

// 自定义指令
const pin = {
  mounted() {
    /* ... */
  },
  updated() {
    /* ... */
  },
};

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h("div"), [[pin, 200, "top", { animate: true }]]);
```

上面是 vue3 render 在自定义指令中的实践，单纯的介绍了如何使用，真实环境中需要下面的补充

**【注意！！！】：如果是外部自定义指令，没有在当前组件中定义的指令，（这里需要获取指令对象 Directive）**

> 当一个指令是以名称注册并且不能被直接导入时（指的是在 main.ts 中 app.use(vDebounce)注册的全局指令），可以使用 resolveDirective 函数来解决这个问题

```js
function resolveDirective(name: string): Directive | undefined
```

> 这里`resolveDirective` 只能在 `setup()`和`render()`函数中使用，像在`<script setup lang="ts">`场景中时，直接放在最外层，在生命周期函数中不会有效果，而且会报`waring`,内容是上面（只能在 `setup()`和`render()`函数中使用）

下面是一段伪代码

```vue
<script setup lang="ts">
import { withDirectives, resolveDirective } from "vue";
import { Notice } from "view-ui-plus";
// 自定义指令获取
const vDebounce = resolveDirective("debounce");
const onOpenFile = () => {
  console.log("onOpenFile");
};
Notice.success({
  title: "下载成功",
  desc: `${fileName}, 打开文件`,
  duration: 6,
  render: (h: any) => {
    return h(
      "p",
      {
        class: "fileLink",
        style: { color: "var(--fontColor)", userSelect: "none" },
      },
      [
        `${fileName}，`,
        withDirectives(
          h(
            "span",
            {
              style: {
                color: "var(--f_color_active)",
                cursor: "pointer",
                borderBottom: "1px solid var(--f_color_active)",
              },
            },
            "打开文件"
          ),
          [[vDebounce, onOpenFile]]
        ),
      ]
    );
  },
});
</script>
```

## 参考链接

- [Vue3 渲染函数使用文档（比较全）](https://cn.vuejs.org/guide/extras/render-function.html)
- [Vue3 使用 h 函数创建子组件](https://blog.csdn.net/m0_46627730/article/details/123990678)
- [vue3 官网 h()](https://vue3js.cn/global/h.html)
- [vue3 中 h 函数的常见使用方式](https://juejin.cn/post/7132656370901336101)
- [vue3 自定义组建使用 v-model, 在 render 函数中创建 v-model 功能](https://www.jianshu.com/p/abf12ba6cf2d)

fill="......."
fill=""
