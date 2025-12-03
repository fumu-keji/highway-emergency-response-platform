<template>
  <van-search
    :style="Style"
    :label="label"
    :shape="shape"
    :placeholder="placeholder"
    :inputAlign="inputAlign"
    :background="background"
    :disabled="disabled"
    :clearable="clearable"
    :showAction="showAction"
    v-model="modelValue"
    @search="handleOnSearch"
  >
    <template #action>
      <div :style="ActionStyle" @click="handleOnSearch">
        {{ actionText }}
      </div>
    </template>
  </van-search>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  shape: {
    type: String,
    default: "round"
  },
  placeholder: {
    type: String,
    default: "请输入"
  },
  inputAlign: {
    type: String,
    default: "left"
  },
  background: {
    type: String,
    default: "#ffffff"
  },
  showAction: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: "搜索"
  },
  actionColor: {
    type: String,
    default: "#323233"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  innerBackground: {
    type: String,
    default: "#f7f8fa"
  }
});
const emit = defineEmits(["input", "search"]);
const ActionStyle = computed(() => {
  const textColor = props.disabled ? "#c8c9cc" : props.actionColor;
  return { color: textColor };
});
const Style = computed(() => {
  return {  "--innerBackground": props.innerBackground };
});
let modelValue = defineModel("modelValue");
function handleOnSearch() {
  if (props.disabled) {
    return;
  }
  emit("search");
}
</script>

<style lang="less" scoped>
.van-search__action {
  line-height: 0;
}
:deep(.van-search__content) {
  background-color: var(--innerBackground);
}
.van-search__content {
  :deep(.van-cell::after) {
    display: none !important;
  }
}
:deep(.van-search__label) {
  display: flex;
  align-items: center;
}
:deep(.van-search__field) {
  height: 40px !important;
}
</style>