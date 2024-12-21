# UniApp、Vite、Vue3、Pinia、Unocss 小程序、H5 项目模板

入门简单、开发简单、接近原生，适用于了解或不熟悉uniapp的开发人员去快速使用uniapp开发小程序、h5

node 版本^14.18.0 || >=16.0.0

## 特色

- ⚡️[uni-app](https://github.com/dcloudio/uni-app), [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/)

- 📦 [组件自动化引入](https://github.com/antfu/unplugin-vue-components)

- 🍍 [使用 Pinia 的状态管理](https://pinia.vuejs.org)

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://icon-sets.iconify.design/)

- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🌍 [API 采用模块化自动导入方式](https://blog.csdn.net/qq_43775179/article/details/134811292) 根据demo.js文件设置接口，以API_xxx_method的方式命名，在请求时无需导入 直接使用useRequest()函数返回参数以解构的方式获取，拿到即为写入的接口

## 🍭 安装使用

🍙 获取项目代码

```bash
git clone https://github.com/gitboyzcf/uni-preset-vue3-vite.git
```

🌈 安装依赖

```bash
pnpm install
```

🐥 运行

```bash
pnpm dev:mp-weixin
```

🍁 打包

```bash
pnpm build:mp-weixin
```


## 🍣 Git 规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `✨ feat` 增加新功能
- `🐛 fix` 修复问题/BUG
- `🎉 init` 初始化
- `📝 docs` 文档变更
- `💄 style` 代码格式(不影响代码运行的变动)
- `♻️ refactor` 重构(既不是增加feature，也不是修复bug)
- `⚡️ perf` 性能优化
- `✅ test` 增加测试
- `⏪️ revert` 回退
- `🚀‍ build` 构建过程或辅助工具的变动
- `👷 ci` CI 配置

## 🍀 不同环境差别

1. ios底部小黑条 [wx] [h5]
    
    解决方式：可以在uni.getSystemInfoSync获取小黑条高度。wx安卓，h5 没有
   ```js
    let dInfo = uni.getSystemInfoSync()
    if(dInfo  && dInfo.screenHeight){
      let size = dInfo.screenHeight - dInfo.safeArea.bottom
    }
    
   ```
2. 自定义tabBar 底部菜单显示问题 [wx] [h5]
   
    最初，`uni.hideTabBar()` 可以隐藏底部菜单，使用自定义tabBar，但是有时候刷新再次会出现。
    
    之后使用了 在`page.json` 中 配置`tabBar`
    ```json
    {
      ...
      "tabBar": {
        ...
        "custom": true,
        ...
      }
      ...
    }
    ```
	  微信小程序中，会报`uni.hideTabBar()`有关的错误，这时候注释掉代码，[h5]环境中，会有两个菜单，由此

    ```js
    onLaunch: function () {
      console.log('App Launch')
      /*#ifdef H5*/
      uni.hideTabBar();
      /*#endif*/
    },
    ```

3. backup
   

## 📔 笔记

### eslint

#### VSCode ESLint 的注释
在 VSCode 中，如果您想要忽略 ESLint 对某一行或一段代码的检查，您可以使用 ESLint 的注释来实现。以下是几种常见的方法：
1. 忽略单行检查

在您想要忽略检查的代码行上方添加以下注释：

```javascript
// eslint-disable-next-line
const result = dangerousFunction();
```

这将禁用紧随其后的单行代码的 ESLint 规则检查。

2. 忽略多行检查

如果您想在一个块中禁用 ESLint 检查，可以使用以下注释包围该代码块：

```javascript
/* eslint-disable */
const result = dangerousFunction();
/* eslint-enable */
```

这将禁用这两个注释之间的所有代码的 ESLint 规则检查。

3. 禁用特定规则

如果您只想禁用特定的规则，可以在 `eslint-disable-next-line` 或 `eslint-disable` 注释中指定规则名称：

```javascript
// eslint-disable-next-line no-alert
alert('Hello, world!');

/* eslint-disable no-alert */
alert('Hello, world!');
console.log('This will also be ignored');
/* eslint-enable no-alert */
```

4. 忽略文件级别的检查

如果您想要忽略整个文件的 ESLint 检查，可以在文件顶部添加以下注释：

```javascript
/* eslint-disable */
```

这将禁用整个文件的 ESLint 规则检查。

6. 使用 `// eslint-disable-line` 忽略当前行

如果您想在注释的同一行忽略 ESLint 检查，可以使用：

```javascript
const result = dangerousFunction(); // eslint-disable-line
```

#### uniapp 条件编译

在 UniApp 中，根据不同的环境（如微信小程序和H5）进行条件判断，可以通过以下几种方式实现：

1. 使用条件编译

UniApp 支持条件编译，允许你根据不同的平台编写特定的代码。条件编译的基本语法如下：

```javascript
/*#ifdef 平台标识符*/
// 在该平台下执行的代码
/*#endif*/
```

对于微信小程序和H5，你可以使用以下平台标识符：

- `MP-WEIXIN`：微信小程序端。
- `H5`：网页端，即在浏览器中运行的H5应用。
- `APP-PLUS`:	uni-app js引擎版编译为App时

**示例代码**：

```javascript
/*#ifdef MP-WEIXIN*/
// 微信小程序端执行的逻辑
console.log('Running on WeChat Mini Program');
/*#endif*/

/*#ifdef H5*/
// 在浏览器端（H5）执行的逻辑
console.log('Running on H5');
/*#endif*/
```

### unocss

[http://localhost:5173/__unocss#/](unocss检测后台，对应应用服务)

- 带有`[]` 的属性值，在末尾需要加空格，或者不放在末尾，（有报错产生）

```html
<view w-[100%] bg-[#F4F6F9] h-80rpx ></view>
```

