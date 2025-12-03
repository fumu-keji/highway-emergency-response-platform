<template>
  <div v-if="showComponent">
    <van-field
      readonly
      is-link
      clickable
      :label="label"
      :labelAlign="labelAlign"
      :labelWidth="labelWidth"
      :inputAlign="inputAlign"
      :placeholder="placeholder"
      :disabled="effectDisabled"
      :name="prop"
      :required="required"
      :rules="rules"
      v-model="name"
      @click="hanlderOnClick"
    />
    <van-popup
      :lazy-render="false"
      v-model:show="showPicker"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns-field-names="{
          text: dataModelFieldLabel,
          value: dataModelFieldValue,
        }"
        :title="title"
        :confirmButtonText="confirmButtonText"
        :cancelButtonText="cancelButtonText"
        :columns="optionItem"
        v-model="bindValue"
        @cancel="showPicker = false"
        @confirm="hanlderOnConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  title: {
    type: String,
    default: "地区选择"
  },
  confirmButtonText: {
    type: String,
    default: "确认"
  },
  cancelButtonText: {
    type: String,
    default: "取消"
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
const emit = defineEmits(["change", "update:value"]);
// 弹层交互相关
let showPicker = ref(false);
let name = defineModel("name");
let bindValue = ref([]);
watch(() => props.value, newValue => {
  const resultArray = props.optionItem.filter(item => {
    return item[props.dataModelFieldValue] === newValue;
  });
  const resultObject = resultArray.length ? resultArray[0] : null;
  name.value = resultObject ? resultObject[props.dataModelFieldLabel] : "";
  bindValue.value = !isEmpty(newValue) ? [props.value] : [];
}, { immediate: true });
// 点击输入框打开弹层
function hanlderOnClick() {
  if (effectDisabled.value || effectReadonly.value) {
    return;
  }
  showPicker.value = true;
}
// 确认选择数据
function hanlderOnConfirm({ selectedOptions }) {
  const selectedOptionObject = selectedOptions[0];
  const pickerName = selectedOptionObject[props.dataModelFieldLabel];
  const pickerValue = selectedOptionObject[props.dataModelFieldValue];
  name.value = pickerName;
  emit("update:value", pickerValue);
  emit("change", pickerValue);
  showPicker.value = false;
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
