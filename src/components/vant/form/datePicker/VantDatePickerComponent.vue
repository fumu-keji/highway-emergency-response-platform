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
    <van-popup v-model:show="showDatePicker" round position="bottom">
      <van-date-picker
        show-toolbar
        :columns-type="columnsType"
        :title="title"
        :max-date="maxDate"
        :min-date="minDate"
        :confirmButtonText="confirmButtonText"
        :cancelButtonText="cancelButtonText"
        v-model="currentDate"
        @cancel="showDatePicker = false"
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
    default: "year,month,day"
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
  minYear: {
    type: String,
    default: "1900"
  },
  maxYear: {
    type: String,
    default: "2050"
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
  if (props.maxYear) {
    return new Date(`${props.maxYear}-01-01`);
  } else {
    return new Date("2050-01-01");
  }
});
const minDate = computed(() => {
  if (props.minYear) {
    return new Date(`${props.minYear}-12-31`);
  } else {
    return new Date("1900-12-31");
  }
});
const columnsType = computed(() => {
  return props.type.split(",");
});
let showDatePicker = ref(false);
let currentDate = ref([]);
let filedValue = ref("");
onMounted(() => {
  formatDate();
});
watch(
  () => props.value,
  val => {
    formatDate();
    if (val === "") {
      currentDate.value = [];
      filedValue.value = "";
    }
  }
);
function formatDate() {
  // 初始化输入框数据
  if (props.value) {
    currentDate.value = props.value.split("-");
    filedValue.value = props.value;
  } else {
    currentDate.value = proxy.$moment().format("YYYY-MM-DD").split("-");
    filedValue.value = "";
  }
}
function hanlderOnClick() {
  if (!effectDisabled.value && !effectReadonly.value) {
    showDatePicker.value = true;
    formatDate();
  }
}
function hanlderOnConfirm({ selectedValues }) {
  const formatObject = {
    "year,month,day": "YYYY-MM-DD",
    "year,month": "YYYY-MM",
    "month,day": "MM-DD",
    "year": "YYYY",
    "month": "MM"
  };
  let resultValue = "";
  resultValue = proxy.$moment(selectedValues.join("-")).format(formatObject[props.type]);
  filedValue.value = resultValue;
  emit("update:value", resultValue);
  emit("change", resultValue);
  showDatePicker.value = false;
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
