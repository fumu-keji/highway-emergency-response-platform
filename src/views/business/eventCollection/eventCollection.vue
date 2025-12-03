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
          text="事件上报"
          rowAlign="center"
        />
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_3"
        ref="vant_normal_3"
        class="vant_normal_3"
      >
        <vant-flex-component
          id="vant_flex_1"
          ref="vant_flex_1"
          class="vant_flex_1"
        >
          <vant-button-component
            id="vant_button_1"
            class="vant_button_1"
            ref="vant_button_1"
            size="small"
            buttonText="视频抓拍"
            icon="video-o"
          />
          <vant-button-component
            id="vant_button_2"
            class="vant_button_2"
            ref="vant_button_2"
            size="small"
            buttonText="人工上报"
            icon="edit"
          />
          <vant-button-component
            id="vant_button_3"
            class="vant_button_3"
            ref="vant_button_3"
            size="small"
            buttonText="设备监测"
            icon="phone-o"
          />
        </vant-flex-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_4"
        ref="vant_normal_4"
        class="vant_normal_4"
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
            <vant-picker-component
              id="vant_picker_1"
              class="vant_picker_1"
              ref="vant_picker_1"
              :required="false"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label="事件类型"
              prop="vant_picker_1"
              labelWidth="90px"
              :optionItem="vantPicker1OptionItemsList"
              placeholder="请选择事件类型"
              v-model:value="modelOption.vant_picker_1"
            />
            <vant-textarea-component
              id="vant_textarea_1"
              class="vant_textarea_1"
              ref="vant_textarea_1"
              :required="false"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label="事件描述"
              prop="vant_textarea_1"
              labelWidth="90px"
              placeholder="请描述事件详情"
              maxlength="20"
              :showWordLimit="false"
              :clearable="false"
              v-model="modelOption.vant_textarea_1"
            />
            <vant-picker-component
              id="vant_picker_2"
              class="vant_picker_2"
              ref="vant_picker_2"
              :required="false"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label="严重程度"
              prop="vant_picker_2"
              labelWidth="90px"
              :optionItem="vantPicker2OptionItemsList"
              placeholder="请选择严重程度"
              v-model:value="modelOption.vant_picker_2"
            />
          </template>
        </vant-form-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_5"
        ref="vant_normal_5"
        class="vant_normal_5"
      >
        <!-- 表单组件 -->
        <vant-form-component
          id="vant_form_2"
          class="vant_form_2"
          ref="vant_form_2"
          label-width="90px"
          input-align="left"
          label-align="left"
        >
          <template v-slot="{ formDisabled, formReadonly }">
            <vant-file-upload-form-component
              id="vant_file_upload_1"
              class="vant_file_upload_1"
              ref="vant_file_upload_1"
              :required="false"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label="上传证据"
              labelWidth="90px"
              prop="vant_file_upload_1"
              labelAlign="left"
              inputAlign="left"
              uploadType="default"
              v-model:staticFiles="modelOption.vant_file_upload_1"
            />
          </template>
        </vant-form-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_6"
        ref="vant_normal_6"
        class="vant_normal_6"
      >
        <vant-normal-component
          id="vant_normal_7"
          ref="vant_normal_7"
          class="vant_normal_7"
        >
          <vant-text-component
            id="vant_text_2"
            class="vant_text_2"
            ref="vant_text_2"
            text="事件位置"
          />
          <vant-map-component
            id="vant_map_1"
            class="vant_map_1"
            ref="vant_map_1"
            :mapAttribute="vantMap1VantMapAttribute"
            :baseLayer="vantMap1VantBaseLayer"
          />
          <vant-normal-component
            id="vant_normal_8"
            ref="vant_normal_8"
            class="vant_normal_8"
          >
            <vant-button-component
              id="vant_button_4"
              class="vant_button_4"
              ref="vant_button_4"
              size="small"
              buttonText="重新定位"
              icon="location-o"
            />
          </vant-normal-component>
        </vant-normal-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_9"
        ref="vant_normal_9"
        class="vant_normal_9"
      >
        <vant-button-component
          id="vant_button_5"
          class="vant_button_5"
          ref="vant_button_5"
          size="small"
          buttonText="提交上报"
        />
      </vant-normal-component>
    </vant-normal-component>
  </div>
</template>
<script>
import mixin from "./eventCollection";
import mixinConfig from "./eventCollectionConfig";
export default {
  mixins: [mixin, mixinConfig],
  name: "eventCollection",
  components: {},
  data() {
    return {
      modelOption: {
        vant_textarea_1: "",
        vant_picker_2: "",
        vant_picker_1: "",
        vant_file_upload_1: "[]",
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
      padding: 0 16px 16px;
      box-sizing: border-box;
      .vant_flex_1 {
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
    }
    .vant_normal_4 {
      padding: 0 16px 16px;
      box-sizing: border-box;
      .vant_form_1 {
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_picker_1 {
          box-sizing: border-box;
        }
        .vant_textarea_1 {
          box-sizing: border-box;
        }
        .vant_picker_2 {
          box-sizing: border-box;
        }
      }
    }
    .vant_normal_5 {
      padding: 0 16px 16px;
      box-sizing: border-box;
      .vant_form_2 {
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_file_upload_1 {
          box-sizing: border-box;
        }
      }
    }
    .vant_normal_6 {
      padding: 0 16px 16px;
      box-sizing: border-box;
      .vant_normal_7 {
        padding: 12px;
        box-sizing: border-box;
        border-radius: 8px;
        background: linear-gradient(to bottom, #f2f9fe, #e6f4fe);
        .vant_text_2 {
          margin: 0px 0px 12px 0px;
          color: #333333;
          display: flex;
          font-size: 14px;
          box-sizing: border-box;
          margin-bottom: 12px;
        }
        .vant_map_1 {
          width: 100%;
          box-sizing: border-box;
          height: 200px;
        }
        .vant_normal_8 {
          margin: 12px 0px 0px 0px;
          box-sizing: border-box;
          margin-top: 12px;
          .vant_button_4 {
            width: 100%;
            box-sizing: border-box;
            position: relative;
          }
        }
      }
    }
    .vant_normal_9 {
      padding: 16px;
      box-sizing: border-box;
      .vant_button_5 {
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }
    }
  }
}
</style>
