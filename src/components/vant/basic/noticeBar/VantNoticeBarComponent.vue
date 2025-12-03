<template>
  <van-notice-bar
    left-icon="volume-o"
    :style="computedStyle"
    :mode="mode"
    :scrollable="scrollable"
    :speed="speed"
    :text="text"
    :background="background"
    :color="color"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  mode: {
    type: String,
    default: ""
  },
  scrollable: {
    type: Boolean,
    default: true
  },
  speed: {
    type: String,
    default: "60"
  },
  text: {
    type: String,
    default: "技术是开发它的人的共同灵魂。"
  },
  background: {
    type: String,
    default: "#fffbe8"
  },
  color: {
    type: String,
    default: "#ed6a0c"
  },
  fontSize: {
    type: String,
    default: "14"
  }
});
const computedStyle = computed(() => {
  return {
    fontSize: `${props.fontSize}px`,
    "--iconFontSize": props.fontSize,
    "--minWidth": `${props.fontSize * 1.5 < 24 ? 24 : props.fontSize * 1.5}px`
  };
});
</script>
<style scoped lang="less">
:deep(.van-notice-bar__left-icon) {
  font-size: var(--iconFontSize);
  min-width: var(--minWidth);
}
:deep(.van-notice-bar__right-icon) {
  font-size: var(--iconFontSize);
}
.van-notice-bar {
  line-height: var(--iconFontSize);
}
</style>