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
    @click-preview="fileClick"
  >
    <template #input>
      <van-uploader
        :class="uploadFileClass"
        uploadIcon="plus"
        accept=""
        :preview-options="{ closeable: true }"
        :before-read="beforeRead"
        :before-delete="beforeDelete"
        :disabled="effectDisabled || effectReadonly"
        :show-upload="!effectReadonly"
        v-model="fileList"
      >
        <div
          v-if="uploadType !== 'button' && !effectReadonly"
          class="van-uploader__upload"
        >
          <i class="van-icon van-icon-plus van-uploader__upload-icon" />
        </div>
        <van-button
          v-if="uploadType === 'button' && !effectReadonly"
          :size="buttonSize"
          :type="buttonType"
          :plain="buttonPlain"
          :round="buttonRound"
          :icon="buttonIcon"
          :color="buttonColor"
          :iconPosition="buttonIconPosition"
        >
          {{ buttonName }}
        </van-button>
        <!-- 暂无数据按钮的显示 -->
        <van-button
          v-if="uploadType === 'button' && showPlaceTips"
          disabled
          color="#909399"
          :size="buttonSize"
        >
          暂无数据
        </van-button>
        <!-- 暂无数据的显示 -->
        <div v-if="uploadType !== 'button' && showPlaceTips" class="place-tips">
          暂无数据
        </div>
        <!-- 文件的预览 -->
        <template #preview-cover="fileData">
          <div
            v-if="!isImageFile(fileData.name)"
            class="preview-cover van-ellipsis"
          >
            {{ fileData.name }}
          </div>
        </template>
      </van-uploader>
    </template>
  </van-field>
</template>

<script setup>
import { computed, getCurrentInstance, watch, ref } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
import { showToast } from "vant";
import { isEmpty, isImageFile } from "@/utils/functionUtil";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
const props = defineProps({
  staticFiles: {
    type: String,
    default: "default"
  },
  fileIds: {
    type: String,
    default: "default"
  },
  uploadType: {
    type: String,
    default: "button"
  },
  buttonName: {
    type: String,
    default: "上传文件"
  },
  buttonSize: {
    type: String,
    default: "small"
  },
  buttonType: {
    type: String,
    default: "info"
  },
  buttonPlain: {
    type: Boolean,
    default: false
  },
  buttonRound: {
    type: Boolean,
    default: false
  },
  buttonColor: {
    type: String,
    default: "#1989FA"
  },
  buttonIcon: {
    type: String,
    default: "plus"
  },
  buttonIconPosition: {
    type: String,
    default: "left"
  },
  limit: {
    type: Number,
    default: 3
  },
  limitSize: {
    type: Number,
    default: 2
  },
  limitTypeArray: {
    type: Array,
    default: () => {
      return ["全部"];
    }
  },
  label: {
    type: String,
    default: ""
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
const emit = defineEmits(["update:fileIds", "update:staticFiles"]);
const uploadFileClass = computed(() => {
  return {
    "readonly-wrap": effectReadonly.value,
    "button-upload": props.uploadType === "button",
    "large-upload": props.uploadType === "button" && props.buttonSize === "large"
  };
});
const showPlaceTips = computed(() => {
  return effectReadonly.value && fileList.value.length === 0;
});
// 文件预览点击 非图片文件点击后下载
function fileClick(file) {
  if (!file.isImage) {
    proxy.$getDataAxios.downLoadFile(file.id);
  }
}
/**
 * 文件列表相关
 */
let fileList = ref([]);
let fieldValue = ref("");
// 监听id的改变
watch(() => props.fileIds, val => {
  if (val !== "default") {
    fieldValue.value = val;
    getFileData();
  }
}, { immediate: true });
// 监听静态数据的改变
watch(() => props.staticFiles, val => {
  if (val !== "default") {
    fieldValue.value = val;
    getStaticFileData();
  }
}, { immediate: true });
// 初始化获取保存的文件数据
function getFileData() {
  if (isEmpty(props.fileIds)) {
    return;
  }
  proxy.$getDataAxios.getUrlByFileId(props.fileIds).then(res => {
    if (!res.data) {
      return;
    }
    fileList.value = [];
    res.data.forEach(item => {
      let fileObj = { name: item.name, id: item.id };
      if (isImageFile(item.name)) {
        fileObj.url = proxy.$setAssetType(item.url);
        fileObj.isImage = true;
      } else {
        fileObj.file = new File([], item.name);
      }
      fileList.value.push(fileObj);
    });
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  });
}
// 初始化静态数据的文件数据
function getStaticFileData() {
  if (!props.fileIds) {
    return;
  }
  const fileArray = JSON.parse(props.staticFiles);
  fileList.value = [];
  fileArray.forEach(item => {
    let fileObj = { name: item.name, id: item.id };
    if (item.isImage) {
      fileObj.url = proxy.$setAssetType(item.url);
      fileObj.isImage = true;
    } else {
      fileObj.file = new File([], item.name);
    }
    fileList.value.push(fileObj);
  });
}
// 上传前验证
function beforeRead(file) {
  // 如果有文件类型限制
  const suffixArr = file.name.split(".");
  const suffix = suffixArr[suffixArr.length - 1];
  if (props.limitTypeArray.length && props.limitTypeArray.indexOf("全部") === -1) {
    let limitFlag = props.limitTypeArray.some(type => {
      return suffix === type;
    });
    if (!limitFlag) {
      showToast("不支持该类型的文件上传");
      return false;
    }
  }
  // 如果有大小限制
  if (props.limitSize !== "") {
    if (file.size > props.limitSize * 1024 * 1024) {
      showToast("上传文件超过限制大小，请重新上传");
      return false;
    }
  }
  // 如果有上传文件个数限制
  if (props.limit && fileList.value.length >= props.limit) {
    showToast(`上传文件个数不得超过${props.limit}个`);
    return false;
  }
  if (props.fileIds !== "default") {
    uploadFile(file);
  } else {
    showToast("请绑定数据模型并导出后台运行后上传文件");
  }
}
// 上传文件
function uploadFile(file) {
  proxy.$getDataAxios.uploadFile({ file: file }).then(res => {
    let fileObj = { name: res.data.name, id: res.data.id };
    if (isImageFile(res.data.name)) {
      fileObj.url = `${BASE_FILE_PREVIEW_URL}/${res.data.id}`;
      fileObj.isImage =  true;
    } else {
      fileObj.file = new File([], res.data.name);
    }
    fileList.value.push(fileObj);
    fileListChange();
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  });
}
// 删除前判断
function beforeDelete(removeFile, detail) {
  fileList.value.splice(detail.index, 1);
  fileListChange();
}
// 文件改变
function fileListChange() {
  let fileArray = [];
  let fileIdArray = [];
  fileList.value.forEach(item => {
    fileArray.push(item);
    fileIdArray.push(item.id);
  });
  if (props.fileIds !== "default") {
    emit("update:fileIds", fileIdArray.join(","));
  } else {
    emit("update:staticFiles", JSON.stringify(fileArray));
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
.van-uploader {
  width: 100%;
  :deep(.van-uploader__file-name) {
    display: none;
  }
  :deep(.preview-cover) {
    position: absolute;
    width: 100%;
    padding: 0 4px;
    color: #646566;
    font-size: 12px;
    bottom: 10px;
    text-align: center;
    box-sizing: border-box;
  }
}
:deep(.van-uploader__wrapper--disabled) {
  .van-uploader__preview-delete {
    display: none;
  }
}
.readonly-wrap {
  :deep(.van-uploader__preview-delete) {
    display: none;
  }
}
.large-upload {
  :deep(.van-uploader__wrapper) {
    width: 100%;
  }
  :deep(.van-uploader__input-wrapper) {
    width: 100%;
  }
}
.button-upload {
  :deep(.van-uploader__wrapper) {
    .van-uploader__preview {
      width: 100%;
      margin: 0px;
      margin-bottom: 5px;
      border: 1px solid #e7efeb;
      box-sizing: border-box;
      .van-uploader__file {
        width: 100%;
      }
    }
    .van-uploader__preview-image {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      img {
        object-fit: contain !important;
      }
    }
  }
}
.place-tips {
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border: 1px solid #e7e7eb;
  border-radius: 3px;
  box-sizing: border-box;
  vertical-align: top;
  color: #909399;
  font-size: 14px;
}
</style>
