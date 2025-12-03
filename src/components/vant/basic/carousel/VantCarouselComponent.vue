<template>
  <van-swipe
    class="carousel-render-style"
    :style="carouselStyle"
    :vertical="vertical"
    :loop="loop"
    :autoplay="autoplay"
    :showIndicators="showIndicators"
    :indicatorColor="indicatorColor"
  >
    <van-swipe-item v-for="item in optionItem" :key="item.id">
      <img
        style="width: 100%; height: 100%"
        fit="fill"
        :src="setImageSrc(item.url)"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: String,
    default: "3000"
  },
  showIndicators: {
    type: Boolean,
    default: true
  },
  indicatorBackColor: {
    type: String,
    default: "#ffffff"
  },
  indicatorColor: {
    type: String,
    default: "#1778ff"
  },
  optionItem: {
    type: Array,
    default: () => []
  }
});
const carouselStyle = computed(() => {
  return  { "--indicatorBackColor": props.indicatorBackColor };
});
function setImageSrc(value) {
  return proxy.$setAssetType(value);
}
</script>
<style lang="less" scoped>
.carousel-render-style {
  :deep(.van-swipe__indicator) {
    background: var(--indicatorBackColor);
    opacity: 0.9 !important;
  }
}
</style>
