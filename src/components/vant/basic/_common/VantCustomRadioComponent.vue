<template>
  <van-field
    :label="$attrs.label"
    :label-width="$attrs.width"
    :label-align="$attrs.labelAlign"
    :input-align="$attrs.inputAlign"
    :rules="$attrs.rules"
    :required="$attrs.required"
  >
    <template #input>
      <van-radio-group
        :class="{ 'readonly-wrap': $attrs.compReadonly }"
        direction="horizontal"
        :disabled="$attrs.compDisabled"
        v-model="modelValue"
      >
        <van-radio
          v-for="(item, index) in optionItem"
          :key="index"
          :name="item.value"
        >
          {{ item.name }}
        </van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script setup>
import { useAttrs, computed } from "vue";
const attrs = useAttrs();
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
</script>

<style lang="less" scoped>
.readonly-wrap {
  :deep(.van-radio--disabled) {
    cursor: pointer;
    .van-radio__icon {
      cursor: pointer;
    }
    .van-radio__label {
      color: #323233;
      cursor: pointer;
    }
    .van-radio__icon--checked .van-icon {
      color: #fff;
      background-color: var(--checkedColor);
      border-color: var(--checkedColor);
    }
    .van-icon {
      background-color: #ffffff;
      border-color: #c8c9cc;
    }
  }
}
</style>