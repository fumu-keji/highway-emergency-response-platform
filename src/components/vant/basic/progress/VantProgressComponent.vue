<template>
  <van-progress
    :style="Style"
    ref="progressRef"
    :percentage="percentageData"
    :stroke-width="strokeWidth"
    :color="color"
    :track-color="trackColor"
    :pivot-color="pivotColor"
    :text-color="textColor"
    :showPivot="showPivot"
    :pivotText="progressText"
  />
</template>

<script setup>
import { computed, ref, watch } from "vue";
const props = defineProps({
  percentage: {
    type: [Number, String],
    default: 20
  },
  strokeWidth: {
    type: String,
    default: "4"
  },
  color: {
    type: String,
    default: "#1989fa"
  },
  trackColor: {
    type: String,
    default: "#e5e5e5",
  },
  pivotText: {
    type: String,
    default: ""
  },
  pivotColor: {
    type: String,
    default: "#1989fa"
  },
  textColor: {
    type: String,
    default: "#fff"
  },
  showPivot: {
    type: Boolean,
    default: true
  },
  pivotType: {
    type: String,
    default: "percentage"
  },
  width: {
    type: String,
    default: "100"
  },
  widthUnit: {
    type: String,
    default: "%"
  },
});
const progressText = computed(() => {
  return props.pivotType == "percentage" ? props.percentage + "%" : props.pivotText;
});
const Style = computed(() => {
  return { width: props.width + props.widthUnit };
});
let percentageData = ref(0);
const progressRef = ref("");
watch(() => props.percentage, val => {
  val = Number(val);
  if (val > 100) {
    percentageData.value = 100;
  } else if (val < 0) {
    percentageData.value = 0;
  } else {
    percentageData.value = val;
  }
}, { immediate: true });
watch(()=>props.width, () => {
  progressRef.value.resize();
});
watch(()=>props.widthUnit, () => {
  progressRef.value.resize();
});
</script>
