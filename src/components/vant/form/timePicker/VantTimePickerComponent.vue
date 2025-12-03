<template>
  <div v-if="showComponent">
    <van-field
      readonly
      clickable
      is-link
      :label="label"
      :labelAlign="labelAlign"
      :labelWidth="labelWidth"
      :inputAlign="inputAlign"
      :placeholder="placeholder"
      :disabled="effectDisabled"
      :name="prop"
      :required="required"
      :rules="rules"
      v-model="filedValue"
      @click="hanlderOnClick"
    />
    <van-popup v-model:show="showTimePicker" round position="bottom">
      <van-time-picker
        show-toolbar
        :columns-type="columnsType"
        :title="title"
        :maxTime="maxDate"
        :minTime="minDate"
        :confirmButtonText="confirmButtonText"
        :cancelButtonText="cancelButtonText"
        v-model="currentTime"
        @cancel="showTimePicker = false"
        @confirm="hanlderOnConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "hour,minute,second"
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  title: {
    type: String,
    default: "时间选择"
  },
  confirmButtonText: {
    type: String,
    default: "确认"
  },
  cancelButtonText: {
    type: String,
    default: "取消"
  }, 
  minTime: {
    type: String,
    default: "00:00:00"
  },
  maxTime: {
    type: String,
    default: "23:59:59"
  },
  label: {
    type: String,
    default: ""
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
const emit = defineEmits(["change", "update:value"]);
const maxDate = computed(() => {
  if (props.maxTime) {
    return props.maxTime;
  } else {
    return "23:59:59";
  }
});
const minDate = computed(() => {
  if (props.minTime) {
    return props.minTime;
  } else {
    return "00:00:00";
  }
});
const columnsType = computed(() => {
  return props.type.split(",");
});
let showTimePicker = ref(false);
let currentTime = ref([]);
let filedValue = ref("");
onMounted(() => {
  // 初始化输入框数据
  if (props.value) {
    currentTime.value = props.value.split(":");
    filedValue.value = props.value;
  } else {
    currentTime.value = proxy.$moment().format("HH:mm:ss").split(":");
    filedValue.value = "";
  }
});
watch(() => props.value, val => {
  if (val === "") {
    currentTime.value = [];
    filedValue.value = "";
  }
});
function hanlderOnClick() {
  if (!effectDisabled.value && !effectReadonly.value) {
    showTimePicker.value = true;
    // 初始化输入框数据
    if (props.value) {
      currentTime.value = props.value.split(":");
      filedValue.value = props.value;
    } else {
      currentTime.value = proxy.$moment().format("HH:mm:ss").split(":");
      filedValue.value = "";
    }
  }
}
function hanlderOnConfirm({ selectedValues }) {
  const resultValue = selectedValues.join(":"); 
  filedValue.value = resultValue;
  emit("update:value", resultValue);
  emit("change", resultValue);
  showTimePicker.value = false;      
}
// 控制组件属性
const {
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

