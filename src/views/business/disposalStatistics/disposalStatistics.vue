<template>
  <div id="vant_page_1" class="vant_page_1">
    <vant-normal-component
      id="vant_normal_1"
      ref="vant_normal_1"
      class="vant_normal_1"
    >
      <vant-normal-component
        id="vant_normal_2"
        ref="vant_normal_2"
        class="vant_normal_2"
      >
        <vant-text-component
          id="vant_text_1"
          class="vant_text_1"
          ref="vant_text_1"
          text="处置统计"
          rowAlign="center"
        />
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_3"
        ref="vant_normal_3"
        class="vant_normal_3"
      >
        <!-- 表单组件 -->
        <vant-form-component
          id="vant_form_1"
          class="vant_form_1"
          ref="vant_form_1"
          label-width="90px"
          input-align="left"
          label-align="left"
        >
          <template v-slot="{ formDisabled, formReadonly }">
            <!-- 日期选择 -->
            <vant-date-picker-component
              id="vant_date_picker_1"
              class="vant_date_picker_1"
              ref="vant_date_picker_1"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label="时间范围"
              prop="vant_date_picker_1"
              :required="false"
              labelWidth="90px"
              title="选择时间范围"
              placeholder="请选择时间范围"
              maxYear="2099"
              v-model:value="modelOption.vant_date_picker_1"
            />
            <vant-picker-component
              id="vant_picker_1"
              class="vant_picker_1"
              ref="vant_picker_1"
              :required="false"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label=""
              prop="vant_picker_1"
              labelWidth="90px"
              :optionItem="vantPicker1OptionItemsList"
              title="选择区域"
              placeholder="请选择区域"
              v-model:value="modelOption.vant_picker_1"
            />
            <vant-checkbox-form-component
              id="vant_checkbox_1"
              class="vant_checkbox_1"
              ref="vant_checkbox_1"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              :required="false"
              label="事件类型"
              labelWidth="90px"
              labelAlign="left"
              inputAlign="left"
              prop="vant_checkbox_1"
              :optionItem="vantCheckbox1OptionItemsList"
              :max="0"
              v-model:value="modelOption.vant_checkbox_1"
            />
          </template>
        </vant-form-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_4"
        ref="vant_normal_4"
        class="vant_normal_4"
      >
        <vant-flex-component
          id="vant_flex_1"
          ref="vant_flex_1"
          class="vant_flex_1"
        >
          <vant-normal-component
            id="vant_normal_5"
            ref="vant_normal_5"
            class="vant_normal_5"
          >
            <vant-text-component
              id="vant_text_2"
              class="vant_text_2"
              ref="vant_text_2"
              text="总处置数"
            />
            <vant-text-component
              id="vant_text_3"
              class="vant_text_3"
              ref="vant_text_3"
              text="1,256"
            />
          </vant-normal-component>
          <vant-normal-component
            id="vant_normal_6"
            ref="vant_normal_6"
            class="vant_normal_6"
          >
            <vant-text-component
              id="vant_text_4"
              class="vant_text_4"
              ref="vant_text_4"
              text="平均响应时长"
            />
            <vant-text-component
              id="vant_text_5"
              class="vant_text_5"
              ref="vant_text_5"
              text="12.5分钟"
            />
          </vant-normal-component>
        </vant-flex-component>
        <vant-flex-component
          id="vant_flex_2"
          ref="vant_flex_2"
          class="vant_flex_2"
        >
          <vant-normal-component
            id="vant_normal_7"
            ref="vant_normal_7"
            class="vant_normal_7"
          >
            <vant-text-component
              id="vant_text_6"
              class="vant_text_6"
              ref="vant_text_6"
              text="按时完成率"
            />
            <vant-text-component
              id="vant_text_7"
              class="vant_text_7"
              ref="vant_text_7"
              text="92.3%"
            />
          </vant-normal-component>
          <vant-normal-component
            id="vant_normal_8"
            ref="vant_normal_8"
            class="vant_normal_8"
          >
            <vant-text-component
              id="vant_text_8"
              class="vant_text_8"
              ref="vant_text_8"
              text="超时率"
            />
            <vant-text-component
              id="vant_text_9"
              class="vant_text_9"
              ref="vant_text_9"
              text="7.7%"
            />
          </vant-normal-component>
        </vant-flex-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_9"
        ref="vant_normal_9"
        class="vant_normal_9"
      >
        <vant-text-component
          id="vant_text_10"
          class="vant_text_10"
          ref="vant_text_10"
          text="事件类型分布"
        />
        <vant-custom-1 class="vant_custom_1" />
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_10"
        ref="vant_normal_10"
        class="vant_normal_10"
      >
        <vant-text-component
          id="vant_text_11"
          class="vant_text_11"
          ref="vant_text_11"
          text="处置趋势"
        />
        <vant-custom-2 class="vant_custom_2" />
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_11"
        ref="vant_normal_11"
        class="vant_normal_11"
      >
        <vant-text-component
          id="vant_text_12"
          class="vant_text_12"
          ref="vant_text_12"
          text="状态分布"
        />
        <vant-custom-3 class="vant_custom_3" />
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_12"
        ref="vant_normal_12"
        class="vant_normal_12"
      >
        <vant-text-component
          id="vant_text_13"
          class="vant_text_13"
          ref="vant_text_13"
          text="报表生成"
        />
        <vant-flex-component
          id="vant_flex_3"
          ref="vant_flex_3"
          class="vant_flex_3"
        >
          <vant-button-component
            id="vant_button_1"
            class="vant_button_1"
            ref="vant_button_1"
            size="small"
            buttonText="生成日报"
          />
          <vant-button-component
            id="vant_button_2"
            class="vant_button_2"
            ref="vant_button_2"
            size="small"
            buttonText="生成周报"
          />
          <vant-button-component
            id="vant_button_3"
            class="vant_button_3"
            ref="vant_button_3"
            size="small"
            buttonText="生成月报"
          />
        </vant-flex-component>
        <vant-flex-component
          id="vant_flex_4"
          ref="vant_flex_4"
          class="vant_flex_4"
        >
          <vant-button-component
            id="vant_button_4"
            class="vant_button_4"
            ref="vant_button_4"
            size="small"
            type="success"
            buttonText="导出Excel"
            icon="down"
          />
          <vant-button-component
            id="vant_button_5"
            class="vant_button_5"
            ref="vant_button_5"
            size="small"
            type="warning"
            buttonText="导出PDF"
            icon="down"
          />
        </vant-flex-component>
      </vant-normal-component>
    </vant-normal-component>
  </div>
</template>
<script>
import mixin from "./disposalStatistics";
import mixinConfig from "./disposalStatisticsConfig";
import VantCustom3 from "./vantCustomChartComponent/VantCustom3.vue";
import VantCustom2 from "./vantCustomChartComponent/VantCustom2.vue";
import VantCustom1 from "./vantCustomChartComponent/VantCustom1.vue";
export default {
  mixins: [mixin, mixinConfig],
  name: "disposalStatistics",
  components: {
    VantCustom3,
    VantCustom2,
    VantCustom1,
  },
  data() {
    return {
      modelOption: {
        vant_picker_1: "",
        vant_date_picker_1: "",
        vant_checkbox_1: "",
      },
    };
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.vant_page_1 {
  position: relative;
  overflow: auto;
  background-color: rgba(244, 245, 247, 1);
  box-sizing: border-box;
  overflow: auto;
  .vant_normal_1 {
    background-color: rgba(244, 245, 247, 1);
    overflow-x: auto;
    overflow-y: auto;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    .vant_normal_2 {
      padding: 16px;
      background-color: #fff;
      box-sizing: border-box;
      .vant_text_1 {
        font-size: 18px;
        box-sizing: border-box;
        color: #333333;
        font-weight: bold;
        display: flex;
      }
    }
    .vant_normal_3 {
      padding: 16px;
      background-color: #fff;
      margin: 0px 0px 12px 0px;
      box-sizing: border-box;
      margin-bottom: 12px;
      .vant_form_1 {
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_date_picker_1 {
          box-sizing: border-box;
        }
        .vant_picker_1 {
          box-sizing: border-box;
        }
        .vant_checkbox_1 {
          box-sizing: border-box;
        }
      }
    }
    .vant_normal_4 {
      padding: 16px;
      background-color: #fff;
      margin: 0px 0px 12px 0px;
      box-sizing: border-box;
      margin-bottom: 12px;
      .vant_flex_1 {
        margin: 0px 0px 12px 0px;
        flex-wrap: nowrap;
        display: flex;
        box-sizing: border-box;
        margin-bottom: 12px;
        justify-content: space-between;
        .vant_normal_5 {
          width: 48%;
          padding: 12px;
          box-sizing: border-box;
          border-radius: 8px;
          background: linear-gradient(to bottom, #f2f9fe, #e6f4fe);
          .vant_text_2 {
            margin: 0px 0px 8px 0px;
            color: #666;
            display: flex;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 8px;
          }
          .vant_text_3 {
            font-size: 20px;
            box-sizing: border-box;
            color: #1989fa;
            font-weight: bold;
            display: flex;
          }
        }
        .vant_normal_6 {
          width: 48%;
          padding: 12px;
          box-sizing: border-box;
          border-radius: 8px;
          background: linear-gradient(to bottom, #f4fef2, #e7feee);
          .vant_text_4 {
            margin: 0px 0px 8px 0px;
            color: #666;
            display: flex;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 8px;
          }
          .vant_text_5 {
            font-size: 20px;
            box-sizing: border-box;
            color: #07c160;
            font-weight: bold;
            display: flex;
          }
        }
      }
      .vant_flex_2 {
        box-sizing: border-box;
        flex-wrap: nowrap;
        justify-content: space-between;
        display: flex;
        .vant_normal_7 {
          width: 48%;
          padding: 12px;
          box-sizing: border-box;
          border-radius: 8px;
          background: linear-gradient(to bottom, #f6f6ff, #ededff);
          .vant_text_6 {
            margin: 0px 0px 8px 0px;
            color: #666;
            display: flex;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 8px;
          }
          .vant_text_7 {
            font-size: 20px;
            box-sizing: border-box;
            color: #7232dd;
            font-weight: bold;
            display: flex;
          }
        }
        .vant_normal_8 {
          width: 48%;
          padding: 12px;
          box-sizing: border-box;
          border-radius: 8px;
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
          .vant_text_8 {
            margin: 0px 0px 8px 0px;
            color: #666;
            display: flex;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 8px;
          }
          .vant_text_9 {
            font-size: 20px;
            box-sizing: border-box;
            color: #969799;
            font-weight: bold;
            display: flex;
          }
        }
      }
    }
    .vant_normal_9 {
      padding: 16px;
      background-color: #fff;
      margin: 0px 0px 12px 0px;
      box-sizing: border-box;
      margin-bottom: 12px;
      .vant_text_10 {
        margin: 0px 0px 16px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .vant_custom_1 {
        width: 100%;
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        height: 250px;
      }
    }
    .vant_normal_10 {
      padding: 16px;
      background-color: #fff;
      margin: 0px 0px 12px 0px;
      box-sizing: border-box;
      margin-bottom: 12px;
      .vant_text_11 {
        margin: 0px 0px 16px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .vant_custom_2 {
        width: 100%;
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        height: 250px;
      }
    }
    .vant_normal_11 {
      padding: 16px;
      background-color: #fff;
      margin: 0px 0px 12px 0px;
      box-sizing: border-box;
      margin-bottom: 12px;
      .vant_text_12 {
        margin: 0px 0px 16px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .vant_custom_3 {
        width: 100%;
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        height: 250px;
      }
    }
    .vant_normal_12 {
      padding: 16px;
      background-color: #fff;
      margin: 0px 0px 20px 0px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .vant_text_13 {
        margin: 0px 0px 16px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .vant_flex_3 {
        box-sizing: border-box;
        flex-wrap: nowrap;
        justify-content: flex-start;
        display: flex;
        gap: 12px;
        .vant_button_1 {
          box-sizing: border-box;
          position: relative;
          flex: 1;
        }
        .vant_button_2 {
          box-sizing: border-box;
          position: relative;
          flex: 1;
        }
        .vant_button_3 {
          box-sizing: border-box;
          position: relative;
          flex: 1;
        }
      }
      .vant_flex_4 {
        margin: 12px 0px 0px 0px;
        flex-wrap: nowrap;
        display: flex;
        gap: 12px;
        box-sizing: border-box;
        justify-content: flex-start;
        margin-top: 12px;
        .vant_button_4 {
          box-sizing: border-box;
          position: relative;
          flex: 1;
        }
        .vant_button_5 {
          box-sizing: border-box;
          position: relative;
          flex: 1;
        }
      }
    }
  }
}
</style>
