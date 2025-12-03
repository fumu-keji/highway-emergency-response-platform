<template>
  <van-divider :contentPosition="contentPosition" :style="computedStyle">
    <template v-if="dividerValue !== ''">
      <span v-if="dividerType === 'text'">
        {{ dividerValue }}
      </span>
      <i v-else :class="dividerValue" />
    </template>
  </van-divider>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  lineColor: {
    type: String,
    default: "#969799"
  },
  borderStyle: {
    type: String,
    default: "solid"
  },
  dividerType: {
    type: String,
    default: "text"
  },
  dividerValue: {
    type: String,
    default: ""
  },
  dividerColor: {
    type: String,
    default: "#969799"
  },
  contentPosition: {
    type: String,
    default: "left"
  },
  dividerFontSize: {
    type: String,
    default: "14"
  }
});
const computedStyle = computed(() => {
  return { 
    borderColor: props.lineColor,
    color: props.dividerColor,
    borderStyle: props.borderStyle,
    fontSize: `${props.dividerFontSize}px`,
  };
});
</script>
