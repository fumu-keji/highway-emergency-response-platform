<template>
  <div class="vant-flow-record">
    <!-- 记录面板 -->
    <el-timeline>
      <el-timeline-item
        v-for="(flowRecord, flowIndex) in flowRecordData"
        placement="top"
        :timestamp="flowRecord.createTime"
        :key="flowRecord.id"
        :icon="setTimeLineItemAttr(flowRecord).icon"
        :type="setTimeLineItemAttr(flowRecord).type"
      >
        <el-card class="flow-record-card">
          <template #header>
            <div class="card-header">
              <div class="tips-text">
                <span class="tips"></span>
                <span class="text">{{ flowRecord.taskName }}</span>
              </div>
              <span class="operate-box">
                <van-button
                  type="primary"
                  size="mini"
                  @click="catInfo(flowRecord, flowIndex)"
                >
                  详 情
                </van-button>
              </span>
            </div>
          </template>
          <!-- 发起节点的记录 -->
          <template v-if="flowIndex === 0">
            <div class="record-item">
              <div class="record-item-title">发起人：</div>
              <div class="record-item-content">
                {{ flowRecord.approver || "--" }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">发起时间：</div>
              <div class="record-item-content">
                {{ flowRecord.createTime || "--" }}
              </div>
            </div>
          </template>
          <!-- 其它节点的记录 -->
          <template v-else>
            <div class="record-item">
              <div class="record-item-title">审批人：</div>
              <div class="record-item-content">
                {{ flowRecord.approver || "--" }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">审批结果：</div>
              <div class="record-item-content">
                {{ formatStatus(flowRecord.approverStatus) }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">审批意见：</div>
              <div class="record-item-content">
                <base-text-ellipsis :line="3">
                  {{ flowRecord.approverContent || "--" }}
                </base-text-ellipsis>
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">开始时间：</div>
              <div class="record-item-content">
                {{ flowRecord.createTime || "--" }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">完成时间：</div>
              <div class="record-item-content">
                {{ flowRecord.approverTime || "--" }}
              </div>
            </div>
          </template>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <!-- 详情弹出层 -->
    <van-popup
      style="width: 100%; height: 70vh"
      teleport="body"
      position="bottom"
      :round="false"
      :close-on-click-overlay="true"
      v-model:show="recordInfoData.popupShow"
    >
      <div class="title-box">
        <div class="title">{{ recordInfoData.title }}</div>
        <van-icon name="cross" @click="recordInfoData.popupShow = false" />
      </div>
      <div class="content-box">
        <component
          v-if="formKey"
          :is="`${formKey}H5`"
          :ref="setDynamicRef"
          :disabled="true"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  flowRecordData: {
    type: Array,
    require: true,
  }
});
const recordInfoData = reactive({
  popupShow: false,
  title: "",
});
const formKey = ref("");
// 设置当前节点的属性
function setTimeLineItemAttr(item) {
  let itemAttr = {
    icon: "",
    type: "",
  };
  if (item.approverTime) {
    itemAttr.icon = "Check";
    itemAttr.type = "success";
  } else {
    itemAttr.icon = "More";
    itemAttr.type = "primary";
  }
  return itemAttr;
}
const dynamicRefs = reactive({});
function setDynamicRef(el) {
  dynamicRefs[formKey.value] = el;
}
// 查看详情
function catInfo(flowRecord) {
  recordInfoData.title = flowRecord.taskName;
  recordInfoData.popupShow = true;
  formKey.value = flowRecord.formKey;
  proxy.$getDataAxios
    .getFlowInstance({ currentTaskId: flowRecord.id })
    .then(res => {
      let formData = null;
      console.log(dynamicRefs);
      
      if (res.data.formKeyList && res.data.formKeyList.length) {
        let data = res.data.formKeyList.find(
          item => item.formKey === flowRecord.formKey
        );
        if (data) {
          formData = data.formData;
          proxy.$formContainerUtils.assignHistoryFormObject(
            dynamicRefs[formKey.value].formParam,
            formData
          );
        }
      }
    })
    .catch(err => {
      proxy.$getDataAxios.notifyError(err);
    });
}
function formatStatus(value) {
  const filterObject = {
    0: "拒绝",
    1: "同意",
    2: "驳回",
  };
  return filterObject[value] || "--";
}
</script>

<style lang="less" scoped>
.el-timeline {
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
:deep(.el-timeline-item__timestamp.is-top) {
  padding-top: 0;
  font-size: 14px;
}
:deep(.el-timeline-item) {
  padding-bottom: 10px;
}
:deep(.el-timeline-item__node) {
  width: 14px;
  height: 14px;
  top: -3px;
  left: -2px;
}
:deep(.el-timeline-item__timestamp) {
  font-weight: bolder;
}
:deep(.el-timeline-item__wrapper) {
  padding-right: 0;
  padding-left: 20px;
}
.flow-record-card {
  :deep(.el-card__header) {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 15px;
  }
  :deep(.el-card__body) {
    padding: 15px 15px 10px 15px;
  }
  .tips-text {
    display: flex;
    align-items: center;
    .tips {
      display: inline-block;
      width: 4px;
      height: 15px;
      margin-right: 5px;
      background-color: #1778ff;
    }
    .text {
      font-weight: bolder;
    }
    .operate-box {
      position: absolute;
      top: 0px;
      right: 10px;
    }
  }
  .record-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .record-item-title {
      margin-right: 5px;
      text-align-last: justify;
      color: #112f4171;
    }
  }
  :deep(.van-button--mini) {
    position: relative;
    top: -1px;
    height: 22px;
    padding: 8px;
    font-size: 12px;
  }
  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 10px;
  border-bottom: 1px solid #e7e7eb;
  box-sizing: border-box;
  font-size: 18px;
  .title {
    font-size: 14px;
  }
}
.content-box {
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>