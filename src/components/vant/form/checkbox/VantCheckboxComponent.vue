<template>
  <van-checkbox-group
    v-if="showComponent"
    :style="{ '--checkedColor': checkedColor }"
    :class="customClass"
    :disabled="effectDisabled || effectReadonly"
    :direction="direction"
    :max="max"
    v-model="bindValue"
    @change="handleOnChange"
  >
    <van-checkbox
      v-for="(item, index) in optionItem"
      :key="index"
      :shape="shape"
      :label-position="labelPosition"
      :iconSize="iconSize"
      :checkedColor="checkedColor"
      :name="item[dataModelFieldValue]"
    >
      {{ item[dataModelFieldLabel] }}
    </van-checkbox>
  </van-checkbox-group>
</template>

<script setup>
import { ref, watch } from "vue";
import { useItemAttr } from "@/hooks/VantFormItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
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
  max: {
    type: Number,
    default: 3
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
const emit = defineEmits(["change", "update:value"]);
let bindValue = ref([]);
watch(() => props.value, newValue=> {
  bindValue.value = !isEmpty(newValue) ? newValue.split(",") : [];
}, { immediate: true });
function handleOnChange(value) {
  const updateValue = !isEmpty(value) ? value.join(",") : "";
  emit("update:value", updateValue);
  emit("change", updateValue);
}
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
  :deep(.van-checkbox--disabled) {
    cursor: pointer;
    .van-checkbox__icon {
      cursor: pointer;
    }
    .van-checkbox__label {
      color: #323233;
      cursor: pointer;
    }
    .van-checkbox__icon--checked .van-icon {
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
