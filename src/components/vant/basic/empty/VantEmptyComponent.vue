<template>
  <van-empty :image="image" :imageSize="imageSize" :description="description" />
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: "https://img01.yzcdn.cn/vant/custom-empty-image.png"
  },
  imageSize: {
    type: Number,
    default: 80
  },
  description: {
    type: String,
    default: "暂无数据"
  }
});
</script>
