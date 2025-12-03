<template>
  <van-badge
    :style="Style"
    :content="badgeValue || 0"
    :color="badgeColor"
    :dot="badgeIsDot"
    :max="Number(badgeMax)"
  />
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  badgeValue: {
    type: [String, Number],
    default: 0
  },
  badgeColor: {
    type: String,
    default: "#ee0a24"
  },
  badgeIsDot: {
    type: Boolean,
    default: false
  },
  badgeMax: {
    type: String,
    default: "99"
  },
  badgeSize: {
    type: String,
    default: "24"
  },
  fontSize: {
    type: String,
    default: "14"
  }
});
const Style = computed(() => {
  return {
    "--badgeSize": `${props.badgeSize}px`,
    "--lineHeight": props.badgeSize ? `${props.badgeSize}px` : 1.2,
    "--fontSize": `${props.fontSize}px`
  };
});
</script>
<style lang="less" scoped>
.van-badge {
  height: var(--badgeSize);
  width: var(--badgeSize);
  line-height: var(--lineHeight);
  font-size: var(--fontSize);
}
</style>
