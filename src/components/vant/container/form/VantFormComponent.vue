<template>
  <van-form
    ref="formRef"
    v-if="showComponent"
    :label-width="labelWidth"
    :input-align="inputAlign"
    :label-align="labelAlign"
  >
    <slot :formDisabled="childDisabled" :formReadonly="childReadonly" />
  </van-form>
</template>

<script setup>
import { getCurrentInstance, ref, watch } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  labelWidth: {
    type: String,
    default: ""
  },
  inputAlign: {
    type: String,
    default: "left"
  },
  labelAlign: {
    type: String,
    default: "left"
  }
});
let formRef = ref(null);
let showComponent = ref(true);
let disabledComponent = ref(false);
let childDisabled = ref("");
watch(disabledComponent, value => {
  childDisabled.value = value;
});
let readonlyComponent = ref("");
let childReadonly = ref("");
watch(readonlyComponent, value => {
  childReadonly.value = value;
});
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent,
  formRef
});
</script>