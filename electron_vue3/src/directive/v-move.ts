/*
 * @Author: fg
 * @Date: 2022-12-28 09:51:11
 * @LastEditors: fg
 * @LastEditTime: 2023-03-10 16:03:16
 * @Description: v-move 拖拽自定义指令
 */
import { App, Directive, DirectiveBinding } from "vue"

const vMove: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const mouseDown = (e: MouseEvent) => {
      let width = el.clientWidth;
      let height = el.clientHeight;
      let pWidth = el.parentElement!.clientWidth;
      let pHeight = el.parentElement!.clientHeight;
      // console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        if (e.clientX - X >= 0 && (e.clientX - X) <= pWidth - width) {
          el.style.left = e.clientX - X + "px";
        } else {
          if ((e.clientX - X) < 0) {
            el.style.left = 0 + "px";
          }
          if ((e.clientX - X) > (pWidth - width)) {
            el.style.left = (pWidth - width) + "px";
          }
        }

        if (e.clientY - Y >= 0 && (e.clientY - Y) <= (pHeight - height - 100)) {
          el.style.top = e.clientY - Y + "px";
        } else {
          if ((e.clientY - Y) < 0) {
            el.style.top = 0 + "px";
          }
          if ((e.clientY - Y) > (pHeight - height - 100)) {
            el.style.top = (pHeight - height - 100) + 'px'
          }
        }


        // console.log(e.clientX, e.clientY, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    if (binding.value) {
      el.addEventListener("mousedown", mouseDown);
    }
  },
}

// 需要绝对定位 absolute fixed
export default (app: App<Element>) => {
  app.directive('move', vMove)
}