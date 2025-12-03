<template>
  <van-image
    class="img-render-style"
    :fit="fit"
    :src="imageUrl"
    @click="previewImage"
  />
</template>

<script setup>
import { ref, computed, getCurrentInstance, watch } from "vue";
import { ImagePreview, showImagePreview } from "vant";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
const props = defineProps({
  fileIds: {
    type: String,
    default: ""
  },
  fit: {
    type: String,
    default: "fill"
  },
  preview: {
    type: Boolean,
    default: false
  }
});
let src = defineModel("src", {
  type: String,
  default: "https://www.fumucloud.com/apis/system/api/file/preview/8174305923825702"
});
let imageUrl = ref("");
watch(() => props.fileIds, fileId => {
  if (fileId) {
    let fileIds = fileId.split(",");
    if (fileIds.length > 0) {
      imageUrl.value = `${BASE_FILE_PREVIEW_URL}/${fileIds[0]}`;
    }
  } else {
    imageUrl.value = "";
  }
}, { immediate: true });
watch(() => src.value, () => {
  if (props.fileIds) {
    return;
  }
  imageUrl.value = "";
  if (src.value) {
    imageUrl.value = proxy.$setAssetType(src.value);
  }
}, { immediate: true });
// 预览图片
function previewImage() {
  if (props.preview) {
    showImagePreview({
      images: [imageUrl.value],
      closeable: true
    });
  }
}
defineExpose({
  src
});
</script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

<style lang="less" scoped>
.img-render-style {
  vertical-align: middle;
  :deep(.van-image__img) {
    -webkit-user-drag: none;
  }
}
</style>
