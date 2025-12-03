<template>
  <van-radio-group
    v-if="showComponent"
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
      :label-position="labelPosition"
      :iconSize="iconSize"
      :checkedColor="checkedColor"
      :name="item[dataModelFieldValue]"
    >
      {{ item[dataModelFieldLabel] }}
    </van-radio>
  </van-radio-group>
</template>

<script setup>
import { useItemAttr } from "@/hooks/VantFormItemHooks.js";
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
