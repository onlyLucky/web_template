/*
 * @Author: fg
 * @Date: 2022-12-14 17:24:52
 * @LastEditors: fg
 * @LastEditTime: 2023-06-14 16:43:03
 * @Description: content
 */
import { ref, defineEmits } from "vue";
import style from "./style.module.less";
import { Tooltip } from "view-ui-plus";
import { ipcRenderer } from "electron";
import SvgIcon from "../SvgIcon/index.vue";

// icons (require 方式别名配置读取不到)
/* import icon_close from "@/assets/icons/system/icon_sys_close.png";
import icon_max from "@/assets/icons/system/icon_sys_maximize.png";
import icon_min from "@/assets/icons/system/icon_sys_minimize.png";
import icon_restore from "@/assets/icons/system/icon_sys_restore.png"; */

interface Props {
  isShowChangeSize?: boolean;
  isShowMinSize?: boolean;
  color?: string;
}

let smallSizeFlag = ref<boolean>(true);

let ctx: any;

const onMinTap = () => {
  ipcRenderer.send("window_min");
};

const onMaxTap = () => {
  ipcRenderer.send("window_max");
};

const onCloseTap = (ctx: any) => {
  ipcRenderer.send("window_close");
};

ipcRenderer.on("window_max_status", (event, status) => {
  smallSizeFlag.value = !status;
  console.log("window_max_status", status);
});

const SystemOpt = (props: Props = { isShowChangeSize: true }, ctx: any) => {
  // 上面给默认值的方式不接受，不知道为什么tsx
  if (props.isShowChangeSize == undefined) {
    props.isShowChangeSize = true;
  }
  if (props.isShowMinSize == undefined) {
    props.isShowMinSize = true;
  }
  if (props.color == undefined) {
    props.color = "var(--fontColor)";
  }
  return (
    <div class={style.sOpt_Box}>
      {props.isShowMinSize ? (
        <div class={style.sIconBox} onClick={onMinTap}>
          <SvgIcon
            style={{ width: "18px", height: "18px" }}
            iconName="icon-2zuixiaohua-2"
            color={props.color}
          ></SvgIcon>
          {/* <img src={icon_min} alt="" /> */}
        </div>
      ) : (
        ""
      )}

      {props.isShowChangeSize ? (
        smallSizeFlag.value ? (
          <div class={style.sIconBox} onClick={onMaxTap}>
            <SvgIcon
              iconName="icon-zuidahua1"
              style={{ width: "20px", height: "20px" }}
              color={props.color}
            ></SvgIcon>
            {/* <img src={icon_max} alt="" /> */}
          </div>
        ) : (
          <Tooltip content="还原">
            {/* onMaxTap.bind(this, true) */}
            <div class={style.sIconBox} onClick={onMaxTap}>
              <SvgIcon
                iconName="icon-chuangkouhuanyuan"
                style={{ width: "20px", height: "20px" }}
                color={props.color}
              ></SvgIcon>
              {/* <img src={icon_restore} alt="" /> */}
            </div>
          </Tooltip>
        )
      ) : (
        ""
      )}

      <div class={style.sIconBox} onClick={onCloseTap.bind(this, ctx)}>
        <SvgIcon
          iconName="icon-guanbi1"
          style={{ width: "16px", height: "16px" }}
          color={props.color}
        ></SvgIcon>
        {/* <img src={icon_close} alt="" /> */}
      </div>
    </div>
  );
};

export default SystemOpt;
