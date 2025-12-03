<template>
  <van-field
    v-if="showComponent"
    readonly
    :label="label"
    :labelAlign="labelAlign"
    :labelWidth="labelWidth"
    :inputAlign="inputAlign"
    :disabled="effectDisabled"
    :name="prop"
    :required="required"
    :rules="rules"
  >
    <template #input>
      <van-slider
        :style="sliderButtonStyle"
        :class="customClass"
        :step="step"
        :min="min"
        :max="max"
        :barHeight="barHeight"
        :buttonSize="buttonSize"
        :activeColor="activeColor"
        :inactiveColor="inactiveColor"
        :disabled="effectDisabled || effectReadonly"
        v-model="modelValue"
        @change="emit('change', $event)"
      >
        <template v-if="showValueButton" #button>
          <div class="custom-button">
            {{ modelValue }}
          </div>
        </template>
      </van-slider>
    </template>
  </van-field>
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
const props = defineProps({
  step: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  barHeight: {
    type: Number,
    default: 3
  },
  buttonSize: {
    type: Number,
    default: 20
  },
  showValueButton: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: "#1989fa"
  },
  inactiveColor: {
    type: String,
    default: "#e5e5e5"
  },
  label: {
    type: String,
    default: "标签"
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
const sliderButtonStyle = computed(() => {
  return { "--sliderButtonBackColor": props.activeColor };
});
const sliderStyle = computed(() => {
  return { "--sliderPadding": `${props.buttonSize / 2 }px` };
});
// 控制组件属性
const {
  customClass,
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

<style lang="less" scoped>
:deep(.van-slider--disabled.readonly-wrap) {
  cursor: pointer;
  opacity: 1;
  .van-slider__button {
    cursor: pointer;
  }
}
:deep(.custom-button) {
  width: 23px;
  color: #fff;
  font-size: 10px;
  line-height: 23px;
  text-align: center;
  background-color: var(--sliderButtonBackColor);
  border-radius: 100%;
}
</style>
