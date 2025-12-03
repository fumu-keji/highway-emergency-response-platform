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
      <van-radio-group
        :style="{ '--checkedColor': checkedColor }"
        :class="customClass"
        :disabled="effectDisabled || effectReadonly"
        :direction="direction"
        v-model="modelValue"
        @change="emit('change', $event)"
      >
        <van-radio
          v-for="(item, index) in optionItem"
          :key="index"
          :shape="shape"
          :labelPosition="labelPosition"
          :iconSize="iconSize"
          :checkedColor="checkedColor"
          :name="item[dataModelFieldValue]"
        >
          {{ item[dataModelFieldLabel] }}
        </van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script setup>
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
const props = defineProps({
  shape: {
    type: String,
    default: "round"
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  labelPosition: {
    type: String,
    default: "right"
  },
  iconSize: {
    type: String,
    default: "20"
  },
  checkedColor: {
    type: String,
    default: "#1989fa"
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
  optionItem: {
    type: Array,
    default: () => []
  },
  dataModelFieldValue: {
    type: String,
    default: "value"
  },
  dataModelFieldLabel: {
    type: String,
    default: "name"
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
  :deep(.van-radio--disabled) {
    cursor: pointer;
    .van-radio__icon {
      cursor: pointer;
    }
    .van-radio__label {
      color: #323233;
      cursor: pointer;
    }
    .van-radio__icon--checked .van-icon {
      color: #fff;
      background-color: var(--checkedColor);
      border-color: var(--checkedColor);
    }
    .van-icon {
      background-color: #ffffff;
      border-color: #c8c9cc;
    }
  }
}
</style>
