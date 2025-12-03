<template>
  <van-tag
    :size="size"
    :type="type"
    :color="color"
    :plain="plain"
    :round="round"
    :closeable="closeable"
  >
    {{ tagName }}
  </van-tag>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "default"
  },
  type: {
    type: String,
    default: "primary"
  },
  color: {
    type: String,
    default: ""
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: false
  }
});
let tagName = defineModel("tagName", {
  type: String,
  default: "标签"
});
defineExpose({
  tagName
});
</script>

<style lang="less" scoped>
.van-tag {
  justify-content: center;
}
.van-tag--plain::before {
  border: none;
}
</style>
