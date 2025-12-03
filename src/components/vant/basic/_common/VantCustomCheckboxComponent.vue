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
      <van-checkbox-group
        :class="{ 'readonly-wrap': $attrs.compReadonly }"
        direction="horizontal"
        :disabled="$attrs.compDisabled"
        v-model="checkedValue"
      >
        <van-checkbox
          v-for="(item, index) in optionItem"
          :key="index"
          :name="item.value"
        >
          {{ item.name }}
        </van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script setup>
import { ref, useAttrs, watch, computed } from "vue";
const modelValue = defineModel("modelValue");
const emit = defineEmits(["update:modelValue"]);
const checkedValue = ref([]);
const attrs = useAttrs();
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
watch(() => modelValue, newValue => {
  checkedValue.value = newValue.value !== "" ? newValue.value.split(",") : [];
}, { immediate: true });
watch(checkedValue, newArray => {
  emit("update:modelValue", newArray.join(","));
});
</script>

<style lang="less" scoped>
.readonly-wrap {
  :deep(.van-checkbox--disabled) {
    cursor: pointer;
    .van-checkbox__icon {
      cursor: pointer;
    }
    .van-checkbox__label {
      color: #323233;
      cursor: pointer;
    }
    .van-checkbox__icon--checked .van-icon {
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