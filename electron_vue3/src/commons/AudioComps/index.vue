<!--
 * @Author: fg
 * @Date: 2023-02-10 09:33:29
 * @LastEditors: fg
 * @LastEditTime: 2023-02-11 17:57:19
 * @Description: 音频组件
-->
<template>
  <div class="AudioBox">
    <audio
      ref="refAudio"
      controls
      :src="audioInfo.src"
      @timeupdate="onPlayChange"
      @canplay="onCanPlay"
      @ended="onEnded"
    ></audio>
  </div>
</template>
<script setup lang="ts">
// "https://m801.music.126.net/20230210095355/6a44ab660525af0af6f395ac8a8532f8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096426578/ff65/7348/d83f/36ab528a5935b3ee552768bd939af6cf.mp3"
export type AudioInfoType = {
  src: string;
  duration: number;
  durationTxt: string;
  currentTime: number;
  currentTimeTxt: string;
  progress: number;
  playing: boolean;
};

let props = withDefaults(
  defineProps<{
    src: string[];
  }>(),
  {
    src: () => [],
  }
);

let emit = defineEmits<{
  (e: "change", info: AudioInfoType, index: number): void;
}>();

let current = ref<number>(0); //当前第几个
let AudioList = reactive<AudioInfoType[]>([]);
const refAudio = ref<HTMLAudioElement>();
let audioInfo = reactive<AudioInfoType>({
  src: "",
  durationTxt: "",
  duration: 0,
  currentTime: 0,
  currentTimeTxt: "",
  progress: 0,
  playing: false,
});

const init = () => {
  props.src.map((item) => {
    AudioList.push({
      src: item,
      durationTxt: "",
      duration: 0,
      currentTime: 0,
      currentTimeTxt: "",
      progress: 0,
      playing: false,
    });
  });
  audioInfo.src = props.src[0];
};

const handlePlay = () => {
  if (refAudio.value?.paused) {
    play();
    audioInfo.playing = true;
  } else {
    pause();
    audioInfo.playing = false;
  }
};

const play = () => {
  refAudio.value?.play();
};
const pause = () => {
  refAudio.value?.pause();
};

/**
 * @description:获取赋值 duration
 * @return {*}
 */
const onCanPlay = () => {
  console.log("onCanPlay-");
  audioInfo.duration = refAudio.value?.duration!;
  AudioList[current.value].duration = audioInfo.duration;
  let tempTxt = computedTime(audioInfo.duration);
  audioInfo.durationTxt = tempTxt;
  AudioList[current.value].durationTxt = tempTxt;
  emit("change", audioInfo, current.value);
  console.log(AudioList, "audioInfo.currentTime--onCanPlay");
  if (audioInfo.playing) {
    refAudio.value?.play();
  }
};

const onEnded = () => {
  console.log("end");
  if (current.value + 1 == AudioList.length) {
    audioInfo.playing = false;
  }
  emit("change", audioInfo, current.value);
};

/**
 * @description: 监听timeupdate事件触发
 * @param {*} e 事件对象
 * @return {*}
 */
const onPlayChange = (e: Event) => {
  audioInfo.currentTime = (e.target as HTMLAudioElement).currentTime;
  emit("change", audioInfo, current.value);
};

const computedTime = (seconds: number): string => {
  let min =
    Math.trunc(seconds / 60) > 10
      ? Math.trunc(seconds / 60)
      : "0" + Math.trunc(seconds / 60);
  let sec =
    Math.trunc(seconds % 60) > 10
      ? Math.trunc(seconds % 60)
      : "0" + Math.trunc(seconds % 60);
  return `${min}:${sec}`;
};

// 监听同步数据
watch(
  () => audioInfo.currentTime,
  (n) => {
    let tempTxt = computedTime(audioInfo.currentTime);
    audioInfo.progress = (audioInfo.currentTime / audioInfo.duration) * 100;
    audioInfo.currentTimeTxt = tempTxt;
    AudioList[current.value].currentTimeTxt = tempTxt;
    AudioList[current.value].progress = audioInfo.progress;
    AudioList[current.value].currentTime = audioInfo.currentTime;
  },
  { deep: true }
);

// 跳转指定播放
const seek = (progress?: number) => {
  if (progress) {
    audioInfo.currentTime = (progress / 100) * audioInfo.duration;
  }
  refAudio.value!.currentTime = audioInfo.currentTime;
  if (refAudio.value?.paused) {
    audioInfo.playing = true;
    refAudio.value.play();
  }
};
// 下一首
const next = () => {
  if (current.value < props.src.length - 1) {
    // 储存进度
    handleSyncData();
    current.value = current.value + 1;
    console.log(
      AudioList[current.value].currentTime,
      "AudioList[current.value]"
    );
    Object.assign(audioInfo, AudioList[current.value]);
    audioInfo.playing = true;
    emit("change", audioInfo, current.value);
    seek();
  }
};
// 上一首
const previous = () => {
  if (current.value > 0) {
    // 储存进度
    handleSyncData();
    current.value = current.value - 1;
    console.log(
      AudioList[current.value].currentTime,
      "AudioList[current.value]"
    );
    Object.assign(audioInfo, AudioList[current.value]);
    audioInfo.playing = true;
    emit("change", audioInfo, current.value);
    seek();
  }
};
// 储存进度
const handleSyncData = () => {
  AudioList[current.value].currentTime = audioInfo.currentTime;
  AudioList[current.value].currentTimeTxt = audioInfo.currentTimeTxt;
};
watch(
  () => props.src,
  (n) => {
    init();
  },
  { deep: true }
);

defineExpose({
  current,
  audioInfo,
  handlePlay,
  seek,
  previous,
  next,
});
</script>
<style scoped lang="less">
.AudioBox {
  position: fixed;
  top: 0;
  left: 0;
  audio {
    opacity: 0;
  }
}
</style>
