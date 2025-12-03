<template>
  <van-dropdown-item
    :options="menuItemOptions"
    v-model="modelValue"
    @change="dropdownItemChange"
  >
    <template #title>
      <span>{{ menuItemTitle }}</span>
    </template>
  </van-dropdown-item>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  modelTitle: {
    type: String,
    default: ""
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
});
const emit = defineEmits(["change"]);
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
let menuItemOptions = ref([]);
let menuItemTitle = ref("");
watch(() => modelValue, () => {
  setOptionItem();
}, { immediate: true });
// 设置下拉数据
function setOptionItem() {
  menuItemOptions.value = [];
  menuItemOptions.value = props.optionItem.map(ele => {
    return { text: ele[props.dataModelFieldLabel], value: ele[props.dataModelFieldValue] };
  });
  menuItemOptions.value.unshift({ text: "不限", value: "" });
  dropdownItemChange(modelValue.value);
}
// 下拉数据改变
function dropdownItemChange(val) {
  let resultData = menuItemOptions.value.find(item => {
    return val === item.value;
  });
  if (resultData.value === "") {
    menuItemTitle.value = props.modelTitle;
  } else {
    menuItemTitle.value = resultData.text; 
  }
}
</script>
