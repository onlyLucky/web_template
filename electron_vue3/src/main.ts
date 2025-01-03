import { createApp } from 'vue'
import type { App } from "vue"
import AppCom from './App.vue'
import './samples/node-api'
import 'amfe-flexible'

// 路由引入
import router from './router';
// 国际化
import ViewUIPlus from 'view-ui-plus';
import i18n from '@/locale'
// iview 
import { Button, Input, Icon, DatePicker, Table, Row, Col, Poptip, Page, Tooltip, Tag, Switch, Checkbox, CheckboxGroup, Text, Title, Select, Option, RadioGroup, Radio, Slider, Space, Skeleton, SkeletonItem, Progress, Dropdown, DropdownMenu, DropdownItem, Spin, Circle, Badge, Upload, Modal, FormItem, Form, InputNumber, ColorPicker, Paragraph } from 'view-ui-plus'
import SvgIcon from "@/commons/SvgIcon/index.vue";
import './assets/iconfont/iconfont.js';

// 样式文件引入
import "@/styles/index"
// 自定义指令引入
import { vDebounce, vMove } from "./directive/index"
import { webFrame, screen, ipcRenderer } from "electron"

import 'default-passive-events'

// vue3 event bus
import mitt from 'mitt'

// 设置适配窗口分辨率缩放
// console.log('screen.getPrimaryDisplay().workAreaSize')
// console.log(screen.getPrimaryDisplay().workAreaSize)
// webFrame.setZoomFactor(1)
const app = createApp(AppCom);
// event bus
const bus = mitt()
app.config.globalProperties.$bus = bus //相当于Vue2中的:Vue.prototype.$bus = bus

app.use(router)
app.use(i18n)
/* app.use(ViewUIPlus, {
  i18n
}) */
app.use(vDebounce).use(vMove)


app.component('SvgIcon', SvgIcon)
app.component('Button', Button)
app.component('Input', Input)
app.component('DatePicker', DatePicker)
app.component('Table', Table)
app.component('Row', Row)
app.component('Col', Col)
app.component('Poptip', Poptip)
app.component('Tooltip', Tooltip)
app.component('Page', Page)
app.component('Tag', Tag)
app.component('Title', Title)
app.component('Text', Text)
app.component('Switch', Switch)
app.component('Checkbox', Checkbox)
app.component('CheckboxGroup', CheckboxGroup)
app.component('Select', Select)
app.component('Option', Option)
app.component('RadioGroup', RadioGroup);
app.component('Slider', Slider);
app.component('Radio', Radio);
app.component('Icon', Icon);
app.component('Skeleton', Skeleton);
app.component('SkeletonItem', SkeletonItem);
app.component('Space', Space);
app.component('Dropdown', Dropdown);
app.component('DropdownMenu', DropdownMenu);
app.component('DropdownItem', DropdownItem);
app.component('Spin', Spin);
app.component('Circle', Circle);
app.component('Progress', Progress);
app.component('Badge', Badge);
app.component('Upload', Upload);
app.component('Modal', Modal);
app.component('Form', Form);
app.component('FormItem', FormItem);
app.component('ColorPicker', ColorPicker);
app.component('InputNumber', InputNumber);
app.component('Paragraph', Paragraph);


app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
});
