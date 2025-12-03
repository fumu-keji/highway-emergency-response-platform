<template>
  <van-rate
    v-if="showComponent"
    :size="size"
    :allowHalf="allowHalf"
    :count="count"
    :color="color"
    :voidColor="voidColor"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  />
</template>

<script setup>
import { useItemAttr } from "@/hooks/VantFormItemHooks.js";
const props = defineProps({
  size: {
    type: String,
    default: "25"
  },
  allowHalf: {
    type: Boolean,
    default: false
  },
  count: {
    type: [String, Number],
    default: "5"
  },
  color: {
    type: String,
    default: "#ffd21e"
  },
  voidColor: {
    type: String,
    default: "#eeeeee"
  },
  disabledColor: {
    type: String,
    default: "#ffd21e"
  },
  compDisabled: {
    type: Boolean,
    default: false
  },
  compReadonly: {
    type: Boolean,
    default: false
  },
});
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change"]);
// 控制组件属性
const {
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
