<template>
  <van-cell
    :title="cellText"
    :is-link="isLink"
    :border="border"
    clickable
    center
    @click="handleCellClick"
  >
    <template #icon>
      <van-icon
        v-if="iconType === 'icon' && icon"
        v-show="icon"
        :style="iconStyle"
        :name="icon"
      />
      <van-image
        v-else-if="iconType === 'img' && src"
        :style="imageStyle"
        :src="imageUrl"
      />
    </template>
  </van-cell>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  cellText: {
    type: String,
    default: "单元格"
  },
  isLink: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  iconType: {
    type: String,
    default: "icon"
  },
  icon: {
    type: String,
    default: ""
  },
  src: {
    type: String,
    default: ""
  },
  imgHeight: {
    type: [String, Number],
    default: 20
  },
  imgWidth: {
    type: [String, Number],
    default: 20
  },
  iconMarginRight: {
    type: [String, Number],
    default: 0
  },
});
const iconStyle = computed(() => {
  return {
    marginRight: props.iconMarginRight + "px"
  };
});
const imageStyle = computed(() => {
  return {
    width: props.imgWidth + "px",
    height: props.imgHeight + "px",
    marginRight: props.iconMarginRight + "px",
  };
});
const imageUrl = computed(() => {
  return proxy.$setAssetType(props.src);
});
const emit = defineEmits(["click"]);
function handleCellClick() {
  emit("click");
}
</script>

<style lang="less" scoped>
.van-cell--borderless:after {
  display: none !important;
}
</style>
