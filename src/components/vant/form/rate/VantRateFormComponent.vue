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
  >
    <template #input>
      <van-rate
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
  </van-field>
</template>

<script setup>
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
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
