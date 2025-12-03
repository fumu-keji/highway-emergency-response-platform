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
      <van-stepper
        :class="customClass"
        :integer="integer"
        :decimalLength="decimalLength"
        :step="step"
        :min="min"
        :max="max"
        :inputWidth="inputWidth"
        :buttonSize="buttonSize"
        :theme="theme"
        :disabled="effectDisabled || effectReadonly"
        v-model="modelValue"
        @change="emit('change', $event)"
      />
    </template>
  </van-field>
</template>

<script setup>
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
const props = defineProps({
  integer: {
    type: Boolean,
    default: true
  },
  decimalLength: {
    type: String,
    default: ""
  },
  step: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 20
  },
  inputWidth: {
    type: String,
    default: "40"
  },
  buttonSize: {
    type: String,
    default: "24"
  },
  theme: {
    type: String,
    default: "normal"
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
  customClass,
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
  &.van-stepper--round {
    :deep(.van-stepper__minus--disabled) {
      cursor: pointer;
      opacity: 1;
    }
    :deep(.van-stepper__plus--disabled) {
      cursor: pointer;
      opacity: 1;
    }
    :deep(.van-stepper__input:disabled) {
      color: #323233;
      -webkit-text-fill-color: #323233;
    }
  }
  &.van-stepper--normal {
    :deep(.van-stepper__minus--disabled) {
      cursor: pointer;
      color: #323233;
      background-color: #f2f3f5;
    }
    :deep(.van-stepper__plus--disabled) {
      cursor: pointer;
      color: #323233;
      background-color: #f2f3f5;
    }
    :deep(.van-stepper__input:disabled) {
      color: #323233;
      -webkit-text-fill-color: #323233;
    }
  }
}
</style>
