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
      v-model="modelValue"
      @click="hanlderOnClick"
    />
    <van-popup
      :lazy-render="false"
      round
      position="bottom"
      v-model:show="showPicker"
    >
      <van-date-picker
        :min-date="minDate"
        :max-date="maxDate"
        v-model="dateValue"
        @cancel="showPicker = false"
        @confirm="hanlderOnConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const attrs = useAttrs();
const modelValue = defineModel("modelValue");
const emit = defineEmits(["update:modelValue"]);
// 弹层交互相关
const minDate = computed(() => {
  return new Date("1900-12-31");
});
const maxDate = computed(() => {
  return new Date("2050-01-01");
});
let showPicker = ref(false);
let dateValue = ref();
onMounted(() => {
  if (modelValue.value) {
    dateValue.value = modelValue.value.split("-");
  } else {
    dateValue.value = proxy.$moment().format("YYYY-MM-DD").split("-");
  }
}); 
// 点击输入框打开弹层
function hanlderOnClick() {
  if (attrs.compDisabled || attrs.compReadonly) {
    return;
  }
  showPicker.value = true;
}
// 确认选择数据
function hanlderOnConfirm({ selectedValues }) {
  emit("update:modelValue", proxy.$moment(selectedValues.join("-")).format("YYYY-MM-DD"));
  showPicker.value = false;
}
</script>