<template>
  <div v-if="showComponent">
    <van-field
      readonly
      clickable
      is-link
      :label="label"
      :labelAlign="labelAlign"
      :labelWidth="labelWidth"
      :inputAlign="inputAlign"
      :placeholder="placeholder"
      :disabled="effectDisabled"
      :name="prop"
      :required="required"
      :rules="rules"
      v-model="fieldValue"
      @click="hanlderOnClick"
    />
    <van-popup
      :lazy-render="false"
      v-model:show="showCascader"
      round
      position="bottom"
    >
      <van-cascader
        show-toolbar
        :field-names="{ text: dataModelFieldLabel }"
        :title="title"
        :activeColor="activeColor"
        :options="resultOptionItem"
        v-model="modelValue"
        @close="showCascader = false"
        @finish="hanlderOnFinish"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
import { treeFindPath } from "@/utils/functionUtil";
/**
 * 基础相关
 */
const props = defineProps({
  placeholder: {
    type: String,
    default: "请选择"
  },
  title: {
    type: String,
    default: "地区选择"
  },
  activeColor: {
    type: String,
    default: "#1989fa"
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
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change"]);
/**
 * 值绑定相关
 */
let showCascader = ref(false);
let fieldValue = ref("");
let resultOptionItem = ref([]);
onMounted(async () => {
  resultOptionItem.value = transformTreeData(props.optionItem);
  if (modelValue.value) {
    const resultArray = treeFindPath(
      resultOptionItem.value, 
      data => data.value === modelValue.value,
      props.dataModelFieldLabel
    );
    fieldValue.value = resultArray.join("/");
  }
});
watch(modelValue, val => {
  if (val === "") {
    fieldValue.value = "";
  }
});
function hanlderOnClick() {
  if (effectDisabled.value || effectReadonly.value) {
    return;
  }
  showCascader.value = true;
}
function hanlderOnFinish({ selectedOptions }) {
  fieldValue.value = selectedOptions.map(option => option.name).join("/");
  showCascader.value = false;
  emit("change", fieldValue.value);
}
function transformTreeData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children.length === 0) {
      delete data[i].children;
    } else {
      transformTreeData(data[i].children);
    }
  }
  return data;
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
