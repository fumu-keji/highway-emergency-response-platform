<template>
  <van-field
    v-if="showComponent"
    readonly
    :label="label"
    :labelAlign="labelAlign"
    :labelWidth="labelWidth"
    :inputAlign="inputAlign"
    :disabled="effectDisabled"
    :name="prop"
    :required="required"
    :rules="rules"
    v-model="fieldValue"
  >
    <template #input>
      <!-- 签名 -->
      <div
        class="sign-content"
        :class="{ 'readonly-wrap': !effectDisabled && effectReadonly }"
      >
        <van-button
          v-if="!imageSrc"
          :disabled="effectDisabled || effectReadonly"
          plain
          icon="edit"
          @click="openPopup"
        >
          开始签字
        </van-button>
        <div
          v-if="imageSrc && !effectDisabled && !effectReadonly"
          class="canvas-delete"
        >
          <van-icon name="cross" @click.stop="deleteCanvas" />
        </div>
        <van-image
          v-if="imageSrc"
          fit="fill"
          :preview="false"
          :src="imageSrc"
          @click="openPopup"
        />
      </div>
      <!-- 签名板弹出层 -->
      <van-popup
        :round="false"
        :close-on-click-overlay="true"
        position="bottom"
        v-model:show="visible"
      >
        <!-- 签名板 -->
        <van-signature
          ref="vanSignatureRef"
          :pen-color="writeColor"
          :line-width="writeWidth"
          :background-color="backgroundColor"
          :tip="tip"
          :clear-button-text="clearButtonText"
          :confirm-button-text="confirmButtonText"
          @submit="signatureSubmit"
        />
      </van-popup>
    </template>
  </van-field>
</template>

<script setup>
import { ref, getCurrentInstance, watch, nextTick } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
const props = defineProps({
  fileIds: {
    type: String,
    default: "default"
  },
  fileData: {
    type: String,
    default: "default"
  },
  prop: {
    type: String,
    default: ""
  },
  rules: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: "标签"
  },
  labelWidth: {
    type: String,
    default: "30"
  },
  labelAlign: {
    type: String,
    default: "left"
  },
  inputAlign: {
    type: String,
    default: "left"
  },
  writeColor: {
    type: String,
    default: "#101010"
  },
  writeWidth: {
    type: Number,
    default: 5
  },
  backgroundColor: {
    type: String,
    default: "#fff"
  },
  tip: {
    type: String,
    default: ""
  },
  clearButtonText: {
    type: String,
    default: "清空"
  },  
  confirmButtonText: {
    type: String,
    default: "确认"
  },  
  formDisabled: {
    type: [String, Boolean],
    default: ""
  },
  compDisabled: {
    type: Boolean,
    default: false
  },
  formReadonly: {
    type: [String, Boolean],
    default: ""
  },
  compReadonly: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits(["submit", "update:fileIds", "update:fileData"]);
/**
 * 弹出层相关
 */
let visible = ref(false);
// 打开弹出层
async function openPopup() {
  if (effectDisabled.value || effectReadonly.value) {
    return;
  }
  visible.value = true;
  await nextTick();
  if (isEmpty(imageSrc.value)) {
    vanSignatureRef.value.clear();
  }
}
/**
 * 签名版数据相关
 */
const vanSignatureRef = ref(null);
let imageSrc = ref("");
let fieldValue = ref("");
// 监听id的改变
watch(() => props.fileIds, val => {
  if (val !== "default") {
    fieldValue.value = val;
    getFileData();
  }
}, { immediate: true });
// 监听静态数据的改变
watch(() => props.fileData, val => {
  if (val !== "default") {
    fieldValue.value = val;
    getStaticFileData();
  }
}, { immediate: true });
// 初始化数据绑定的文件数据
function getFileData() {
  imageSrc.value = "";
  if (isEmpty(props.fileIds)) {
    return;
  }
  proxy.$getDataAxios.getUrlByFileId(props.fileIds).then(res => {
    if (!res.data) {
      return;
    }
    imageSrc.value = `${BASE_FILE_PREVIEW_URL}/${res.data[0].id}`;
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  });
}
// 初始化静态数据的绑定
function getStaticFileData() {
  imageSrc.value = props.fileData;
}
// 保存图片
function signatureSubmit(data) {
  if (props.fileIds !== "default") {
    saveFileIdsData(data.image);
  } else {
    saveStatisFileData(data.image);
  }
}
// 调用接口进行保存
function saveFileIdsData(image) {
  const param = {
    file: dataURLtoFile(image, "dianziqianming")
  };
  // 调用上传接口
  proxy.$getDataAxios.uploadFile(param).then(res =>{
    imageSrc.value = `${BASE_FILE_PREVIEW_URL}/${res.data.id}`;
    emit("update:fileIds", res.data.id);
    emit("submit", res.data.id);
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  }).finally(() => {
    visible.value = false;
  });
}
// base64转成图片
function dataURLtoFile(dataURL, fileName) {
  let arr = dataURL.split(",");
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: "image/png" });
}
// 静态数据保存
function saveStatisFileData(image) {
  imageSrc.value = image;
  visible.value = false;
  emit("update:fileData", image);
  emit("submit", image);
}
// 清除签名
function deleteCanvas() {
  imageSrc.value = "";
  if (props.fileIds !== "default") {
    emit("update:fileIds", "");
  } else {
    emit("update:fileData", "");
  }
}

// 控制组件属性
const {
  showComponent,
  disabledComponent,
  effectDisabled,
  effectReadonly,
  readonlyComponent
} = useFormItemAttr(props);
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.readonly-wrap {
  &.sign-content {
    position: relative;
    width: 100%;
    height: 100px;
    :deep(.van-button) {
      cursor: pointer;
      opacity: 1;
    }
  }
}
:deep(.van-popup) {
  overflow: hidden;
}
.sign-content {
  position: relative;
  width: 100%;
  height: 100px;
  :deep(.van-image) {
    width: 100%;
    height: 100%;
  }
  :deep(.van-button) {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    color: #666666;
    border-color: #dcdfe6;
  }
  :deep(.canvas-delete) {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 0 12px;
    z-index: 2;
    cursor: pointer;
    .van-icon {
      position: absolute;
      top: -2px;
      right: -2px;
      color: #fff;
      font-size: 16px;
      transform: scale(0.5);
    }
  }
}
</style>