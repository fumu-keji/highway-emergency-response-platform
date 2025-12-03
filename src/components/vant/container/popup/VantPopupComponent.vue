<template>
  <van-popup
    :position="showPosition"
    :round="showRound"
    close-on-click-overlay
    v-model:show="popupVisible"
  >
    <slot />
  </van-popup>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  showPosition: {
    type: String,
    default: "bottom"
  },
  showRound: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["update:show"]);
let popupVisible = ref(true);
watch(()=>props.show, val => {
  popupVisible.value = val;
}, { immediate: true });
watch(()=>popupVisible.value, val => {
  emit("update:show", val);
});
</script>