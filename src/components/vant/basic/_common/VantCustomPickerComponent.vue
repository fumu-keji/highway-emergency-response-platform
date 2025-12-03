<template>
  <div>
    <van-field
      readonly
      is-link
      :label="$attrs.label"
      :labelWidth="$attrs.width"
      :labelAlign="$attrs.labelAlign"
      :inputAlign="$attrs.inputAlign"
      :disabled="$attrs.compDisabled"
      :required="$attrs.required"
      :rules="$attrs.rules"
      v-model="name"
      @click="hanlderOnClick"
    />
    <van-popup
      :lazy-render="false"
      round
      position="bottom"
      v-model:show="showPicker"
    >
      <van-picker
        show-toolbar
        :columns-field-names="{
          text: 'name',
        }"
        :columns="optionItem"
        v-model="pickerValue"
        @cancel="showPicker = false"
        @confirm="hanlderOnConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, useAttrs, onMounted, watch, computed } from "vue";
const attrs = useAttrs();
const modelValue = defineModel("modelValue");
const emit = defineEmits(["update:modelValue"]);
// 弹层交互相关
let showPicker = ref(false);
let name = defineModel("name");
let pickerValue = ref([]);
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
onMounted(() => {
  initData();
}); 
function initData() {
  const bindValue = modelValue.value;
  const resultArray = optionItem.value.filter(item => {
    return item.value === bindValue;
  });
  name.value = resultArray.length ? resultArray[0].name : "";
  pickerValue.value = [bindValue];
}
// 监听下拉框数据的改变
watch(() => optionItem.value, (newOptionItem, oldOptionItem) => {
  if (newOptionItem === oldOptionItem) {
    return;
  }
  emit("update:modelValue", "");
  name.value = "";
  pickerValue.value = [];
});
// 点击输入框打开弹层
function hanlderOnClick() {
  if (attrs.compDisabled || attrs.compReadonly) {
    return;
  }
  showPicker.value = true;
  const bindValue = modelValue.value;
  pickerValue.value = [bindValue];
}
// 确认选择数据
function hanlderOnConfirm(pickerData) {
  const pickerName = pickerData.selectedOptions[0].name;
  const pickerValue = pickerData.selectedOptions[0].value;
  name.value = pickerName;
  emit("update:modelValue", pickerValue);
  showPicker.value = false;
}
</script>

