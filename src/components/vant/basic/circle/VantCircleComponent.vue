<template>
  <van-circle
    v-model:current-rate="currentRate"
    :style="computedStyle"
    :size="size"
    :color="color"
    :layer-color="layerColor"
    :fill="fill"
    :speed="speed"
    :text="text"
    :stroke-width="strokeWidth"
    :clockwise="clockwise"
  />
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  currentRateData: {
    type: [Number, String],
    default: 20
  },
  size: {
    type: String,
    default: "80"
  },
  color: {
    type: String,
    default: "#1989fa"
  },
  layerColor: {
    type: String,
    default: "#ebedf0"
  },
  fill: {
    type: String,
    default: "#fff"
  },
  speed: {
    type: String,
    default: "0"
  },
  strokeWidth: {
    type: String,
    default: "40"
  },
  clockwise: {
    type: Boolean,
    default: true
  },
  contentFontSize: {
    type: String,
    default: "14"
  },
  contentColor: {
    type: String,
    default: "#323233"
  }
});
const text = computed(() => {
  return props.currentRateData ? (parseInt(props.currentRateData * 100) / 100) + "%" : "0.00%";
});
const currentRate = computed({
  //防止报错
  set: () => {},
  get: () => {
    return props.currentRateData ? parseFloat(props.currentRateData) : 0;
  }
});
const computedStyle = computed(() => {
  const circleStyle = {
    "--contentFontSize": `${props.contentFontSize}px`,
    "--contentColor": props.contentColor,
  };
  return circleStyle;
});
</script>
<style scoped lang="less">
:deep(.van-circle) {
  vertical-align: top;
}
:deep(.van-circle__text) {
  font-size: var(--contentFontSize);
  color: var(--contentColor);
}
</style>