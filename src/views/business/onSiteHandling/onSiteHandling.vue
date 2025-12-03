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
          text="现场处置"
          rowAlign="center"
        />
        <vant-flex-component
          id="vant_flex_1"
          ref="vant_flex_1"
          class="vant_flex_1"
        >
          <vant-normal-component
            id="vant_normal_3"
            ref="vant_normal_3"
            class="vant_normal_3"
          >
            <vant-text-component
              id="vant_text_2"
              class="vant_text_2"
              ref="vant_text_2"
              text="事件类型：火灾事故"
            />
            <vant-text-component
              id="vant_text_3"
              class="vant_text_3"
              ref="vant_text_3"
              text="位置：XX市XX区XX街道"
            />
          </vant-normal-component>
          <vant-image-component
            id="vant_image_1"
            class="vant_image_1"
            ref="vant_image_1"
            fit="cover"
            src="8290554823573539.png"
          />
        </vant-flex-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_4"
        ref="vant_normal_4"
        class="vant_normal_4"
      >
        <vant-text-component
          id="vant_text_4"
          class="vant_text_4"
          ref="vant_text_4"
          text="快速上报"
        />
        <vant-flex-component
          id="vant_flex_2"
          ref="vant_flex_2"
          class="vant_flex_2"
        >
          <vant-button-component
            id="vant_button_1"
            class="vant_button_1"
            ref="vant_button_1"
            size="small"
            buttonText="已到达"
          />
          <vant-button-component
            id="vant_button_2"
            class="vant_button_2"
            ref="vant_button_2"
            size="small"
            type="success"
            buttonText="开始处置"
          />
          <vant-button-component
            id="vant_button_3"
            class="vant_button_3"
            ref="vant_button_3"
            size="small"
            type="warning"
            buttonText="遇到困难"
          />
        </vant-flex-component>
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_5"
        ref="vant_normal_5"
        class="vant_normal_5"
      >
        <vant-text-component
          id="vant_text_5"
          class="vant_text_5"
          ref="vant_text_5"
          text="位置信息"
        />
        <vant-map-component
          id="vant_map_1"
          class="vant_map_1"
          ref="vant_map_1"
          :mapAttribute="vantMap1VantMapAttribute"
          :baseLayer="vantMap1VantBaseLayer"
        />
      </vant-normal-component>
      <vant-normal-component
        id="vant_normal_7"
        ref="vant_normal_7"
        class="vant_normal_7"
      >
        <vant-text-component
          id="vant_text_7"
          class="vant_text_7"
          ref="vant_text_7"
          text="处置报告"
        />
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
            <vant-field-component
              id="vant_field_1"
              class="vant_field_1"
              ref="vant_field_1"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              :required="false"
              label="处置结果"
              prop="vant_field_1"
              labelWidth="90px"
              placeholder="请输入处置结果"
              :clearable="false"
              v-model="modelOption.vant_field_1"
            />
            <vant-field-component
              id="vant_field_2"
              class="vant_field_2"
              ref="vant_field_2"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              :required="false"
              label="损失情况"
              prop="vant_field_2"
              labelWidth="90px"
              placeholder="请描述损失情况"
              :clearable="false"
              v-model="modelOption.vant_field_2"
            />
            <vant-field-component
              id="vant_field_3"
              class="vant_field_3"
              ref="vant_field_3"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              :required="false"
              label="遗留问题"
              prop="vant_field_3"
              labelWidth="90px"
              placeholder="请输入遗留问题"
              :clearable="false"
              v-model="modelOption.vant_field_3"
            />
            <vant-file-upload-form-component
              id="vant_file_upload_1"
              class="vant_file_upload_1"
              ref="vant_file_upload_1"
              :required="false"
              :formDisabled="formDisabled"
              :formReadonly="formReadonly"
              label="现场照片"
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
      <vant-flex-component
        id="vant_flex_3"
        ref="vant_flex_3"
        class="vant_flex_3"
      >
        <vant-button-component
          id="vant_button_4"
          class="vant_button_4"
          ref="vant_button_4"
          size="normal"
          buttonText="通讯"
        />
        <vant-button-component
          id="vant_button_5"
          class="vant_button_5"
          ref="vant_button_5"
          size="normal"
          type="success"
          buttonText="完成并提交"
        />
      </vant-flex-component>
    </vant-normal-component>
  </div>
</template>
<script>
import mixin from "./onSiteHandling";
import mixinConfig from "./onSiteHandlingConfig";
export default {
  mixins: [mixin, mixinConfig],
  name: "onSiteHandling",
  components: {},
  data() {
    return {
      modelOption: {
        vant_field_3: "",
        vant_field_1: "",
        vant_field_2: "",
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
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      background: linear-gradient(to bottom, #f2f9fe, #e6f4fe);
      .vant_text_1 {
        margin: 0px 0px 12px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 20px;
        margin-bottom: 12px;
        font-weight: bold;
      }
      .vant_flex_1 {
        box-sizing: border-box;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
        display: flex;
        .vant_normal_3 {
          flex: 1;
          box-sizing: border-box;
          .vant_text_2 {
            margin: 0px 0px 4px 0px;
            color: #666;
            display: flex;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 4px;
          }
          .vant_text_3 {
            font-size: 14px;
            box-sizing: border-box;
            color: #666;
            display: flex;
          }
        }
        .vant_image_1 {
          width: 50px;
          box-sizing: border-box;
          border-radius: 50%;
          height: 50px;
        }
      }
    }
    .vant_normal_4 {
      padding: 16px;
      margin: 0px 0px 8px 0px;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      .vant_text_4 {
        margin: 0px 0px 12px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: bold;
      }
      .vant_flex_2 {
        box-sizing: border-box;
        flex-wrap: nowrap;
        justify-content: flex-start;
        display: flex;
        gap: 8px;
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
    .vant_normal_5 {
      padding: 16px;
      margin: 0px 0px 8px 0px;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      .vant_text_5 {
        margin: 0px 0px 12px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: bold;
      }
      .vant_map_1 {
        width: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        height: 200px;
      }
    }
    .vant_normal_7 {
      padding: 16px;
      margin: 0px 0px 8px 0px;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      .vant_text_7 {
        margin: 0px 0px 12px 0px;
        color: #333333;
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: bold;
      }
      .vant_form_1 {
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_field_1 {
          box-sizing: border-box;
        }
        .vant_field_2 {
          box-sizing: border-box;
        }
        .vant_field_3 {
          box-sizing: border-box;
        }
        .vant_file_upload_1 {
          box-sizing: border-box;
        }
      }
    }
    .vant_flex_3 {
      padding: 16px;
      flex-wrap: nowrap;
      background: #fff;
      display: flex;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      justify-content: flex-start;
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
</style>
