<template>
  <van-switch
    v-if="showComponent"
    :class="customClass"
    :size="size"
    :activeColor="activeColor"
    :inactiveColor="inactiveColor"
    :disabled="effectDisabled || effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  />
</template>

<script setup>
import { useItemAttr } from "@/hooks/VantFormItemHooks.js";
const props = defineProps({
  size: {
    type: String,
    default: "20"
  },
  activeColor: {
    type: String,
    default: "#1778ff"
  },
  inactiveColor: {
    type: String,
    default: "#C0CCDA"
  },
  compDisabled: {
    type: Boolean,
    default: false
  },
  compReadonly: {
    type: Boolean,
    default: false
  }
});
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change"]);
// 控制组件属性
const {
  customClass,
  showComponent,
  disabledComponent,
  effectDisabled,
  effectReadonly,
  readonlyComponent
} = useItemAttr(props);
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.van-switch--disabled.readonly-wrap {
  cursor: pointer;
  opacity: 1;
}
.van-switch {
  box-sizing: content-box !important;
}
</style>
