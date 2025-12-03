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
      <van-time-picker
        :columns-type="['hour', 'minute', 'second']"
        v-model="timeValue"
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
let showPicker = ref(false);
let timeValue = ref();
onMounted(() => {
  if (modelValue.value) {
    timeValue.value = modelValue.value.split(":");
  } else {
    timeValue.value = proxy.$moment().format("HH:mm:ss").split(":");
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
  emit("update:modelValue", selectedValues.join(":"));
  showPicker.value = false;
}
</script>