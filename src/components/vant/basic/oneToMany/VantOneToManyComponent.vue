<template>
  <div class="oneToMany-box">
    <van-form ref="vantOneToManyRef">
      <template v-if="formTableData.tableList.length">
        <!-- 表单项 -->
        <div
          class="form-item"
          v-for="(formItem, index) in formTableData.tableList"
          :key="index"
        >
          <div v-for="item in tableColumnData" :key="item.prop + index">
            <component
              :is="setConfigureComponent(item.compType)"
              :required="item.require"
              :label="item.label"
              :labelAlign="labelAlign"
              :inputAlign="inputAlign"
              :width="item.width || labelWidth"
              :rules="[
                {
                  required:
                    item.require && !disabledComputed && !readonlyComputed,
                  message: '字段不能为空',
                  trigger: 'onBlur',
                },
              ]"
              v-bind="item.mergeAttr"
              v-model="formItem[item.prop]"
              v-model:name="formItem[item.nameField]"
            >
            </component>
          </div>
          <!-- 操作列 -->
          <div class="operate-box" v-if="showOperateButton(index)">
            <template v-for="buttonItem in buttonData">
              <van-button
                v-if="buttonItem.show"
                :class="{ 'no-text': buttonItem.text === '' }"
                :key="buttonItem.operateType"
                :size="buttonItem.size"
                :type="buttonItem.type"
                :icon="buttonItem.icon"
                :plain="buttonItem.plain"
                :round="buttonItem.round"
                @click="
                  handleOnOperate(formItem, index, buttonItem.operateType)
                "
              >
                {{ buttonItem.text }}
              </van-button>
            </template>
          </div>
        </div>
      </template>
      <!-- 空状态 -->
      <van-empty v-else description="暂无数据" />
    </van-form>
    <!-- 添加数据 -->
    <div v-if="!disabledComputed && !readonlyComputed" class="add-box">
      <van-button
        round
        block
        type="primary"
        size="normal"
        icon="plus"
        @click="addRow"
      >
        添加一栏
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref, getCurrentInstance } from "vue";
import { cloneObject, isEmpty } from "../../../../utils/functionUtil";
/**
 * 基础相关
 */
const { proxy } = getCurrentInstance();
const props = defineProps({
  inputAlign: {
    type: String,
    default: "left"
  },
  labelAlign: {
    type: String,
    default: "left"
  },
  labelWidth: {
    type: String,
    default: "40"
  },
  oneToManyColumnData: {
    type: Array,
    require: true
  },
  tableData: {
    type: [String, Array],
    require: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  necessary: {
    type: Boolean,
    default: false
  },
  buttonData: {
    type: Array,
    require: true
  } 
});
/**
 * 配置相关
 */
// 是否显示操作按钮
function showOperateButton(index) {
  if (disabledComputed.value || readonlyComputed.value) {
    return false;
  } 
  if (props.necessary) {
    return index !== 0;
  } else {
    return true;
  }
}
// 设置动态表单配置的组件
function setConfigureComponent(type) {
  const componentNameObject = {
    "field": "VantCustomFieldComponent",
    "switch": "VantCustomSwitchComponent",
    "checkbox": "VantCustomCheckboxComponent",
    "radio": "VantCustomRadioComponent",
    "picker": "VantCustomPickerComponent",
    "date-picker": "VantCustomDatePickerComponent",
    "time-picker": "VantCustomTimePickerComponent",
    "cascader": "VantCustomCascaderComponent"
  };
  return componentNameObject[type] || "";
}
/**
 * 禁用和只读相关
 */
let disabledComponent = ref("");
let readonlyComponent = ref("");
const disabledComputed = computed(() => {
  return disabledComponent.value !== "" ? disabledComponent.value : props.disabled;
});
const readonlyComputed = computed(() => {
  return readonlyComponent.value !== "" ? readonlyComponent.value : props.readonly;
});
watch(disabledComputed, () => {
  initTableColumnData();
});
watch(readonlyComputed, () => {
  initTableColumnData();
});
/**
 * 表单数据相关
 */
let formTableData = reactive({
  tableList: []
});
let tableColumnData = ref(null);
// 监听数据变化更新对应的值
watch(() => props.tableData, val => {
  if (!isEmpty(val)) {
    if (JSON.stringify(formTableData.tableList) === JSON.stringify(val)) {
      return;
    }
    formTableData.tableList = cloneObject(val);
  } else {
    formTableData.tableList = [];
  }
}, { immediate: true, deep: true });
watch(() => props.oneToManyColumnData, val => {
  if (val) {
    initTableColumnData();
  }
}, { immediate: true, deep: true });
/**
 * 渲染相关方法
 */
// 设置组件状态
function initTableColumnData() {
  tableColumnData.value = JSON.parse(JSON.stringify(props.oneToManyColumnData));
  tableColumnData.value.forEach(async item => { 
    if (item.compType === "field") {
      item.mergeAttr = {
        readonly: readonlyComputed.value,
        disabled: disabledComputed.value
      };
    } else if (item.compType === "switch") {
      item.mergeAttr = {
        compDisabled: disabledComputed.value || readonlyComputed.value,
        compReadonly: !disabledComputed.value && readonlyComputed.value
      };
    } else if ( item.compType === "checkbox" || item.compType === "radio" || item.compType === "picker") {
      item.mergeAttr = {
        setting: item.setting,
        compDisabled: disabledComputed.value || readonlyComputed.value,
        compReadonly: !disabledComputed.value && readonlyComputed.value
      };
      await proxy.$getOptionItem(item.setting, item.mergeAttr.setting.optionItem);
    } else if ( item.compType === "cascader") {
      item.mergeAttr = {
        setting: item.setting,
        compDisabled: disabledComputed.value || readonlyComputed.value,
        compReadonly: !disabledComputed.value && readonlyComputed.value
      };
      await proxy.$getOptionItem(item.setting, item.mergeAttr.setting.optionItem, "tree");
    }
  });
}
/**
 * 操作数据相关方法
 */
// 新增一栏
function addRow() {
  let object = {};
  let defaultData = {
    "field": "",
    "switch": false,
    "radio": "",
    "checkbox": "",
    "picker": "",
    "date-picker": "",
    "time-picker": "",
    "cascader": ""
  };
  tableColumnData.value.forEach(item => {
    object[item.prop] = defaultData[item.compType];
  });
  formTableData.tableList.push(object);
}
// 按钮点击
function handleOnOperate(row, index, type) {
  if (type === "copy") {
    copyRow(row);
  } else {
    deleteRow(index);
  }
}
// 复制一栏
function copyRow(row) {
  let object = {};
  tableColumnData.value.forEach(item => {
    object[item.prop] = row[item.prop];
  });
  formTableData.tableList.push(object);
}
// 删除一栏
function deleteRow(index) {
  formTableData.tableList.splice(index, 1);
}
const vantOneToManyRef = ref(null);
defineExpose({
  vantOneToManyRef,
  formTableData,
  necessary: props.necessary,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.oneToMany-box {
  overflow: auto;
  background-color: #fff;
}
.form-item {
  margin-bottom: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding-bottom: 5px;
  box-sizing: border-box;
  .operate-box {
    width: 100%;
    text-align: right;
    padding: 3px 10px 3px 0px;
    box-sizing: border-box;
    .no-text .van-button__icon + .van-button__text {
      margin-left: 0 !important;
    }
    .van-button:nth-of-type(2) {
      margin-left: 10px;
    }
  }
}

.add-box {
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(.van-button) {
    width: 55%;
    height: 40px;
  }
}
</style>