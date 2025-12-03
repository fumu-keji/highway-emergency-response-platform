<template>
  <van-field
    :label="$attrs.label"
    :label-width="$attrs.width"
    :label-align="$attrs.labelAlign"
    :input-align="$attrs.inputAlign"
    :required="$attrs.required"
    :rules="$attrs.rules"
  >
    <template #input>
      <van-switch
        :class="{ 'readonly-wrap': $attrs.compReadonly }"
        size="18"
        :disabled="$attrs.compDisabled"
        v-model="modelValue"
      />
    </template>
  </van-field>
</template>

<script setup>
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
</script>

<style lang="less" scoped>
:deep(.van-switch--disabled.readonly-wrap) {
  cursor: pointer;
  opacity: 1;
}
.van-switch {
  box-sizing: content-box !important;
}
</style>