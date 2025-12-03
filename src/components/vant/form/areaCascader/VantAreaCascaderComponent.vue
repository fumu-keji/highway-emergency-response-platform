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
        :field-names="{
          text: 'name',
          value: 'code',
        }"
        :title="title"
        :activeColor="activeColor"
        :options="optionItem"
        v-model="modelValue"
        @close="showCascader = false"
        @finish="hanlderOnFinish"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, getCurrentInstance, watch } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
import { treeFindPath } from "@/utils/functionUtil";
import {
  PROVINCES_CODE,
  CITYS_CODE,
  AREAS_CODE
} from "@/config/pageDesign/componentConfig";
const { proxy } = getCurrentInstance();
const props = defineProps({
  areaCascaderType: {
    type: String,
    default: "area"
  },
  title: {
    type: String,
    default: "地区选择"
  },
  placeholder: {
    type: String,
    default: "请选择地区"
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
// 数据处理相关
let showCascader = ref(false);
let fieldValue = ref("");
let optionItem = computed(() => {
  const filterObject = {
    "province": PROVINCES_CODE,
    "city": CITYS_CODE,
    "area": AREAS_CODE
  };
  return filterObject[props.areaCascaderType];
});
onMounted(() => {
  // 初始化输入框数据
  if (modelValue.value) {
    const resultArray = treeFindPath(
      optionItem.value, 
      data => data.value === modelValue.value,
      "name"
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
