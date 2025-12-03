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
      v-model="fieldValue"
      @click="hanlderOnClick"
    />
    <van-popup
      :lazy-render="false"
      round
      position="bottom"
      v-model:show="showCascader"
    >
      <van-cascader
        show-toolbar
        :field-names="{ text: 'name' }"
        :options="cascaderOptionItem"
        v-model="modelValue"
        @close="showCascader = false"
        @finish="hanlderOnFinish"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, useAttrs, onMounted, watch, computed } from "vue";
import { treeFindPath, cloneObject } from "../../../../utils/functionUtil";
const attrs = useAttrs();
const modelValue = defineModel("modelValue");
const emit = defineEmits(["update:modelValue"]);
// 弹层交互相关
let showCascader = ref(false);
let fieldValue = ref("");
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
const cascaderOptionItem = computed(() => {
  return transformTreeData(cloneObject(optionItem.value));
});
onMounted(() => {
  initData();
}); 
function initData() {
  if (modelValue.value) {
    const resultArray = treeFindPath(
      cascaderOptionItem.value, 
      data => data.value === modelValue.value,
      "name"
    );
    fieldValue.value = resultArray.join("/");
  }
}
// 监听下拉框数据的改变
watch(() => optionItem.value, (newOptionItem, oldOptionItem) => {
  if (JSON.stringify(newOptionItem) === JSON.stringify(oldOptionItem)) {
    return;
  }
  emit("update:modelValue", "");
  fieldValue.value = "";
});
// 点击输入框打开弹层
function hanlderOnClick() {
  if (attrs.compDisabled || attrs.compReadonly) {
    return;
  }
  showCascader.value = true;
}
function hanlderOnFinish({ value, selectedOptions }) {
  fieldValue.value = selectedOptions.map(option => option.name).join("/");
  emit("update:modelValue", value);
  showCascader.value = false;
}
function transformTreeData(data) {
  for (let i = 0; i < data?.length; i++) {
    if (data[i].children?.length === 0) {
      delete data[i].children;
    } else {
      transformTreeData(data[i].children);
    }
  }
  return data;
}
</script>

