<template>
  <van-field
    clearable
    :label="$attrs.label"
    :label-width="$attrs.width"
    :label-align="$attrs.labelAlign"
    :input-align="$attrs.inputAlign"
    :disabled="$attrs.disabled"
    :readonly="$attrs.readonly"
    :required="$attrs.required"
    :rules="$attrs.rules"
    v-model="modelValue"
  />
</template>

<script setup>
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
</script>