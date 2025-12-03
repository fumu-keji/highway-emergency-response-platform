<template>
  <van-nav-bar
    :border="border"
    :style="{
      backgroundColor: backgroundColor,
    }"
  >
    <template #left>
      <van-icon
        v-if="leftArrow"
        name="arrow-left"
        :size="leftFontSize"
        :color="leftColor"
      />
      <span :style="leftStyle">{{ leftText }}</span>
    </template>
    <template #title>
      <span :style="titleStyle">{{ title }}</span>
    </template>
    <template #right>
      <span :style="rightStyle">{{ rightText }}</span>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "标题"
  },
  leftText: {
    type: String,
    default: "返回"
  },
  rightText: {
    type: String,
    default: "按钮"
  },
  leftArrow: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: false
  },
  titleFontSzie: {
    type: [String, Number],
    default: "16"
  },
  titleColor: {
    type: String,
    default: "#323233"
  },
  leftFontSize: {
    type: [String, Number],
    default: "14"
  },
  leftColor: {
    type: String,
    default: "#1778ff"
  },
  rightFontSize: {
    type: [String, Number],
    default: "14"
  },
  rightColor: {
    type: String,
    default: "#1778ff"
  },
  backgroundColor: {
    type: String,
    default: "#ffffff"
  }
});
// 中间文案样式
const leftStyle = computed(() => {
  return {
    fontSize: `${props.leftFontSize || 14}px`,
    color: props.leftColor
  };
});
// 中间文案样式
const titleStyle = computed(() => {
  return {
    fontSize: `${props.titleFontSzie || 16}px`,
    color: props.titleColor,
    fontWeight: "500"
  };
});
// 中间文案样式
const rightStyle = computed(() => {
  return {
    fontSize: `${props.rightFontSize || 14}px`,
    color: props.rightColor
  };
});
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__content) {
  height: 100% !important;
}
</style>
