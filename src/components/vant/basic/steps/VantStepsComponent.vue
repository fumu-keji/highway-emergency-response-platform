<template>
  <van-steps
    :active="active"
    :active-color="activeColor"
    :active-icon="activeIcon"
    :inactive-color="inactiveColor"
    :inactive-icon="inactiveIcon"
    :finish-icon="finishIcon"
  >
    <van-step
      v-for="(item, index) in stepsItem"
      :key="item.id"
      @click="stepsClick(item, index)"
    >
      {{ item.name }}
    </van-step>
  </van-steps>
</template>

<script setup>
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/utils/functionUtil";
const props = defineProps({
  activeIcon: {
    type: String,
    default: "checked"
  },
  inactiveIcon: {
    type: String,
    default: ""
  },
  finishIcon: {
    type: String,
    default: ""
  },
  activeColor: {
    type: String,
    default: "#07c160"
  },
  inactiveColor: {
    type: String,
    default: "#969799"
  },
  stepsItem: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(["stepsClick"]);
let active = ref(0);
//步骤条点击事件
function stepsClick(item, index) {
  active.value = index;
  const clickId = capitalizeFirstLetter(item.id);
  emit("stepsClick", clickId);
}
</script>
