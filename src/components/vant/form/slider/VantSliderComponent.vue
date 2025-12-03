<template>
  <div v-if="showComponent" :style="sliderStyle" class="vant-slider-style">
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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useItemAttr } from "@/hooks/VantFormItemHooks.js";
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
  compDisabled: {
    type: Boolean,
    default: false
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
} = useItemAttr(props);
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
.vant-slider-style {
  display: flex;
  align-items: center;
  padding-left: var(--sliderPadding, 10px);
  padding-right: var(--sliderPadding, 10px);
  overflow: auto;
}
</style>
