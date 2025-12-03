<template>
  <van-button
    ref="vanButton"
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :color="buttonColor"
    :disabled="disabled"
    :icon="icon"
    :iconPosition="iconPosition"
  >
    {{ buttonText }}
  </van-button>
</template>

<script setup>

const props = defineProps({
  size: {
    type: String,
    default: "large"
  },
  type: {
    type: String,
    default: "primary"
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  buttonColor: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  },
  iconPosition: {
    type: String,
    default: "left"
  }
});
const disabled = defineModel("disabled", {
  type: Boolean,
  default: false
});
const buttonText = defineModel("buttonText", {
  type: String,
  default: "按钮"
});
defineExpose({
  disabled,
  buttonText
});
</script>
