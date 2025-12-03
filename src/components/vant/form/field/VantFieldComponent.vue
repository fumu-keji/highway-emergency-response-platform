<template>
  <van-field
    v-if="showComponent"
    autocomplete="off"
    :type="type"
    :label="label"
    :labelAlign="labelAlign"
    :labelWidth="labelWidth"
    :inputAlign="inputAlign"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :showWordLimit="showWordLimit"
    :leftIcon="leftIcon"
    :rightIcon="rightIcon"
    :clearable="clearable"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
    :name="prop"
    :required="required"
    :rules="rules"
    v-model="modelValue"
    @update:model-value="emit('change', $event)"
  />
</template>

<script setup>
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
const props = defineProps({
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: "请输入"
  },
  maxlength: {
    type: [String, Number],
    default: "20"
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  leftIcon: {
    type: String,
    default: ""
  },
  rightIcon: {
    type: String,
    default: ""
  },
  clearable: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: "文本"
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
} = useFormItemAttr(props);
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>
