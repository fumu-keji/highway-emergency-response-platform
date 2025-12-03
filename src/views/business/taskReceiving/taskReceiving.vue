<template>
  <div id="vant_page_1" class="vant_page_1">
    <vant-normal-component
      id="vant_normal_1"
      ref="vant_normal_1"
      class="vant_normal_1"
    >
      <vant-navbar-component
        id="vant_navbar_1"
        class="vant_navbar_1"
        title="我的任务"
        leftText=""
        rightText=""
        :leftArrow="false"
        :border="true"
      />
      <!-- 选项卡 -->
      <van-tabs
        id="vant_tabs_1"
        class="vant_tabs_1 vant_tabs_render-box"
        v-model:active="vantTabs1ActiveName"
        :lazy-render="false"
        color="#1989fa"
      >
        <van-tab title="待接收" name="Flhisv" label="待接收">
          <div id="vant_list_1" class="vant_list_1 list-render-box">
            <van-pull-refresh
              v-model="vantList1Refreshing"
              @refresh="vantList1OnRefresh"
            >
              <van-list
                v-model:loading="vantList1Loading"
                :finished="vantList1Finished"
                :immediate-check="false"
                :offset="0"
                finished-text="没有更多了"
                @load="vantList1OnLoad"
              >
                <van-cell>
                  <vant-normal-component
                    id="vant_normal_2"
                    ref="vant_normal_2"
                    class="vant_normal_2"
                  >
                    <vant-flex-component
                      id="vant_flex_1"
                      ref="vant_flex_1"
                      class="vant_flex_1"
                    >
                      <vant-tag-component
                        id="vant_tag_1"
                        class="vant_tag_1"
                        ref="vant_tag_1"
                        type="danger"
                        tagName="紧急"
                      />
                      <vant-text-component
                        id="vant_text_1"
                        class="vant_text_1"
                        ref="vant_text_1"
                        text="火灾事故"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_2"
                      ref="vant_flex_2"
                      class="vant_flex_2"
                    >
                      <vant-text-component
                        id="vant_text_2"
                        class="vant_text_2"
                        ref="vant_text_2"
                        text="位置：朝阳区建国路88号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_3"
                      ref="vant_flex_3"
                      class="vant_flex_3"
                    >
                      <vant-text-component
                        id="vant_text_3"
                        class="vant_text_3"
                        ref="vant_text_3"
                        text="发布时间：2024-01-15 14:30"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_4"
                      ref="vant_flex_4"
                      class="vant_flex_4"
                    >
                      <vant-button-component
                        id="vant_button_1"
                        class="vant_button_1"
                        ref="vant_button_1"
                        size="small"
                        buttonText="接单"
                      />
                      <vant-button-component
                        id="vant_button_2"
                        class="vant_button_2"
                        ref="vant_button_2"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                  <vant-normal-component
                    id="vant_normal_3"
                    ref="vant_normal_3"
                    class="vant_normal_3"
                  >
                    <vant-flex-component
                      id="vant_flex_5"
                      ref="vant_flex_5"
                      class="vant_flex_5"
                    >
                      <vant-tag-component
                        id="vant_tag_2"
                        class="vant_tag_2"
                        ref="vant_tag_2"
                        type="warning"
                        tagName="一般"
                      />
                      <vant-text-component
                        id="vant_text_4"
                        class="vant_text_4"
                        ref="vant_text_4"
                        text="交通事故"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_6"
                      ref="vant_flex_6"
                      class="vant_flex_6"
                    >
                      <vant-text-component
                        id="vant_text_5"
                        class="vant_text_5"
                        ref="vant_text_5"
                        text="位置：海淀区中关村大街1号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_7"
                      ref="vant_flex_7"
                      class="vant_flex_7"
                    >
                      <vant-text-component
                        id="vant_text_6"
                        class="vant_text_6"
                        ref="vant_text_6"
                        text="发布时间：2024-01-15 14:25"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_8"
                      ref="vant_flex_8"
                      class="vant_flex_8"
                    >
                      <vant-button-component
                        id="vant_button_3"
                        class="vant_button_3"
                        ref="vant_button_3"
                        size="small"
                        buttonText="接单"
                      />
                      <vant-button-component
                        id="vant_button_4"
                        class="vant_button_4"
                        ref="vant_button_4"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                  <vant-normal-component
                    id="vant_normal_4"
                    ref="vant_normal_4"
                    class="vant_normal_4"
                  >
                    <vant-flex-component
                      id="vant_flex_9"
                      ref="vant_flex_9"
                      class="vant_flex_9"
                    >
                      <vant-tag-component
                        id="vant_tag_3"
                        class="vant_tag_3"
                        ref="vant_tag_3"
                        tagName="普通"
                      />
                      <vant-text-component
                        id="vant_text_7"
                        class="vant_text_7"
                        ref="vant_text_7"
                        text="设备故障"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_10"
                      ref="vant_flex_10"
                      class="vant_flex_10"
                    >
                      <vant-text-component
                        id="vant_text_8"
                        class="vant_text_8"
                        ref="vant_text_8"
                        text="位置：东城区王府井大街255号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_11"
                      ref="vant_flex_11"
                      class="vant_flex_11"
                    >
                      <vant-text-component
                        id="vant_text_9"
                        class="vant_text_9"
                        ref="vant_text_9"
                        text="发布时间：2024-01-15 14:20"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_12"
                      ref="vant_flex_12"
                      class="vant_flex_12"
                    >
                      <vant-button-component
                        id="vant_button_5"
                        class="vant_button_5"
                        ref="vant_button_5"
                        size="small"
                        buttonText="接单"
                      />
                      <vant-button-component
                        id="vant_button_6"
                        class="vant_button_6"
                        ref="vant_button_6"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="进行中" name="Enkdio" label="进行中">
          <div id="vant_list_2" class="vant_list_2 list-render-box">
            <van-pull-refresh
              v-model="vantList2Refreshing"
              @refresh="vantList2OnRefresh"
            >
              <van-list
                v-model:loading="vantList2Loading"
                :finished="vantList2Finished"
                :immediate-check="false"
                :offset="0"
                finished-text="没有更多了"
                @load="vantList2OnLoad"
              >
                <van-cell>
                  <vant-normal-component
                    id="vant_normal_5"
                    ref="vant_normal_5"
                    class="vant_normal_5"
                  >
                    <vant-flex-component
                      id="vant_flex_13"
                      ref="vant_flex_13"
                      class="vant_flex_13"
                    >
                      <vant-tag-component
                        id="vant_tag_4"
                        class="vant_tag_4"
                        ref="vant_tag_4"
                        type="success"
                        tagName="处理中"
                      />
                      <vant-text-component
                        id="vant_text_10"
                        class="vant_text_10"
                        ref="vant_text_10"
                        text="燃气泄漏"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_14"
                      ref="vant_flex_14"
                      class="vant_flex_14"
                    >
                      <vant-text-component
                        id="vant_text_11"
                        class="vant_text_11"
                        ref="vant_text_11"
                        text="位置：西城区金融街33号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_15"
                      ref="vant_flex_15"
                      class="vant_flex_15"
                    >
                      <vant-text-component
                        id="vant_text_12"
                        class="vant_text_12"
                        ref="vant_text_12"
                        text="接单时间：2024-01-15 13:45"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_16"
                      ref="vant_flex_16"
                      class="vant_flex_16"
                    >
                      <vant-button-component
                        id="vant_button_7"
                        class="vant_button_7"
                        ref="vant_button_7"
                        size="small"
                        buttonText="导航"
                      />
                      <vant-button-component
                        id="vant_button_8"
                        class="vant_button_8"
                        ref="vant_button_8"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                  <vant-normal-component
                    id="vant_normal_6"
                    ref="vant_normal_6"
                    class="vant_normal_6"
                  >
                    <vant-flex-component
                      id="vant_flex_17"
                      ref="vant_flex_17"
                      class="vant_flex_17"
                    >
                      <vant-tag-component
                        id="vant_tag_5"
                        class="vant_tag_5"
                        ref="vant_tag_5"
                        type="success"
                        tagName="处理中"
                      />
                      <vant-text-component
                        id="vant_text_13"
                        class="vant_text_13"
                        ref="vant_text_13"
                        text="人员被困"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_18"
                      ref="vant_flex_18"
                      class="vant_flex_18"
                    >
                      <vant-text-component
                        id="vant_text_14"
                        class="vant_text_14"
                        ref="vant_text_14"
                        text="位置：丰台区南三环西路16号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_19"
                      ref="vant_flex_19"
                      class="vant_flex_19"
                    >
                      <vant-text-component
                        id="vant_text_15"
                        class="vant_text_15"
                        ref="vant_text_15"
                        text="接单时间：2024-01-15 13:30"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_20"
                      ref="vant_flex_20"
                      class="vant_flex_20"
                    >
                      <vant-button-component
                        id="vant_button_9"
                        class="vant_button_9"
                        ref="vant_button_9"
                        size="small"
                        buttonText="导航"
                      />
                      <vant-button-component
                        id="vant_button_10"
                        class="vant_button_10"
                        ref="vant_button_10"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="已完成" name="Uhfrpz" label="已完成">
          <div id="vant_list_3" class="vant_list_3 list-render-box">
            <van-pull-refresh
              v-model="vantList3Refreshing"
              @refresh="vantList3OnRefresh"
            >
              <van-list
                v-model:loading="vantList3Loading"
                :finished="vantList3Finished"
                :immediate-check="false"
                :offset="0"
                finished-text="没有更多了"
                @load="vantList3OnLoad"
              >
                <van-cell>
                  <vant-normal-component
                    id="vant_normal_7"
                    ref="vant_normal_7"
                    class="vant_normal_7"
                  >
                    <vant-flex-component
                      id="vant_flex_21"
                      ref="vant_flex_21"
                      class="vant_flex_21"
                    >
                      <vant-tag-component
                        id="vant_tag_6"
                        class="vant_tag_6"
                        ref="vant_tag_6"
                        type="default"
                        tagName="已完成"
                      />
                      <vant-text-component
                        id="vant_text_16"
                        class="vant_text_16"
                        ref="vant_text_16"
                        text="道路积水"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_22"
                      ref="vant_flex_22"
                      class="vant_flex_22"
                    >
                      <vant-text-component
                        id="vant_text_17"
                        class="vant_text_17"
                        ref="vant_text_17"
                        text="位置：石景山区石景山路68号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_23"
                      ref="vant_flex_23"
                      class="vant_flex_23"
                    >
                      <vant-text-component
                        id="vant_text_18"
                        class="vant_text_18"
                        ref="vant_text_18"
                        text="完成时间：2024-01-15 12:00"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_24"
                      ref="vant_flex_24"
                      class="vant_flex_24"
                    >
                      <vant-button-component
                        id="vant_button_11"
                        class="vant_button_11"
                        ref="vant_button_11"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                  <vant-normal-component
                    id="vant_normal_8"
                    ref="vant_normal_8"
                    class="vant_normal_8"
                  >
                    <vant-flex-component
                      id="vant_flex_25"
                      ref="vant_flex_25"
                      class="vant_flex_25"
                    >
                      <vant-tag-component
                        id="vant_tag_7"
                        class="vant_tag_7"
                        ref="vant_tag_7"
                        type="default"
                        tagName="已完成"
                      />
                      <vant-text-component
                        id="vant_text_19"
                        class="vant_text_19"
                        ref="vant_text_19"
                        text="噪音扰民"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_26"
                      ref="vant_flex_26"
                      class="vant_flex_26"
                    >
                      <vant-text-component
                        id="vant_text_20"
                        class="vant_text_20"
                        ref="vant_text_20"
                        text="位置：通州区新华大街199号"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_27"
                      ref="vant_flex_27"
                      class="vant_flex_27"
                    >
                      <vant-text-component
                        id="vant_text_21"
                        class="vant_text_21"
                        ref="vant_text_21"
                        text="完成时间：2024-01-15 11:30"
                      />
                    </vant-flex-component>
                    <vant-flex-component
                      id="vant_flex_28"
                      ref="vant_flex_28"
                      class="vant_flex_28"
                    >
                      <vant-button-component
                        id="vant_button_12"
                        class="vant_button_12"
                        ref="vant_button_12"
                        size="small"
                        type="default"
                        buttonText="详情"
                      />
                    </vant-flex-component>
                  </vant-normal-component>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </vant-normal-component>
  </div>
</template>
<script>
import mixin from "./taskReceiving";
import mixinConfig from "./taskReceivingConfig";
export default {
  mixins: [mixin, mixinConfig],
  name: "taskReceiving",
  components: {},
  data() {
    return {
      modelOption: {},
      vantTabs1ActiveName: "Flhisv",
      vantList3Refreshing: false,
      vantList3Loading: false,
      vantList3Finished: false,
      vantList3ListData: [],
      vantList3PageNumber: 1,
      vantList3PageSize: 5,
      vantList3TotalPages: 0,
      vantList2Refreshing: false,
      vantList2Loading: false,
      vantList2Finished: false,
      vantList2ListData: [],
      vantList2PageNumber: 1,
      vantList2PageSize: 5,
      vantList2TotalPages: 0,
      vantList1Refreshing: false,
      vantList1Loading: false,
      vantList1Finished: false,
      vantList1ListData: [],
      vantList1PageNumber: 1,
      vantList1PageSize: 5,
      vantList1TotalPages: 0,
    };
  },
  created() {},
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.vantList3OnRefresh();
      this.vantList2OnRefresh();
      this.vantList1OnRefresh();
    },
    vantList1OnLoad() {
      if (this.vantList1Refreshing) {
        this.vantList1Refreshing = false;
      }
      this.vantList1Loading = false;
      this.vantList1Finished = true;
    },
    vantList1OnRefresh() {
      this.vantList1Finished = false;
      this.vantList1Loading = true;
      this.vantList1OnLoad();
    },
    vantList2OnLoad() {
      if (this.vantList2Refreshing) {
        this.vantList2Refreshing = false;
      }
      this.vantList2Loading = false;
      this.vantList2Finished = true;
    },
    vantList2OnRefresh() {
      this.vantList2Finished = false;
      this.vantList2Loading = true;
      this.vantList2OnLoad();
    },
    vantList3OnLoad() {
      if (this.vantList3Refreshing) {
        this.vantList3Refreshing = false;
      }
      this.vantList3Loading = false;
      this.vantList3Finished = true;
    },
    vantList3OnRefresh() {
      this.vantList3Finished = false;
      this.vantList3Loading = true;
      this.vantList3OnLoad();
    },
  },
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
    .vant_navbar_1 {
      background-color: #ffffff;
      box-sizing: border-box;
      height: 46px;
    }
    .vant_tabs_1 {
      background-color: #ffffff;
      box-sizing: border-box;
      .vant_list_1 {
        width: 100%;
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_normal_2 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_1 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_1 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_1 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_2 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_2 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_3 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_3 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_4 {
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
          }
        }
        .vant_normal_3 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_5 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_2 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_4 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_6 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_5 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_7 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_6 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_8 {
            box-sizing: border-box;
            flex-wrap: nowrap;
            justify-content: flex-start;
            display: flex;
            gap: 8px;
            .vant_button_3 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
            .vant_button_4 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
          }
        }
        .vant_normal_4 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_9 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_3 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_7 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_10 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_8 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_11 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_9 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_12 {
            box-sizing: border-box;
            flex-wrap: nowrap;
            justify-content: flex-start;
            display: flex;
            gap: 8px;
            .vant_button_5 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
            .vant_button_6 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
          }
        }
      }
      .vant_list_2 {
        width: 100%;
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_normal_5 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_13 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_4 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_10 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_14 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_11 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_15 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_12 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_16 {
            box-sizing: border-box;
            flex-wrap: nowrap;
            justify-content: flex-start;
            display: flex;
            gap: 8px;
            .vant_button_7 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
            .vant_button_8 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
          }
        }
        .vant_normal_6 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_17 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_5 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_13 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_18 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_14 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_19 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_15 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_20 {
            box-sizing: border-box;
            flex-wrap: nowrap;
            justify-content: flex-start;
            display: flex;
            gap: 8px;
            .vant_button_9 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
            .vant_button_10 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
          }
        }
      }
      .vant_list_3 {
        width: 100%;
        padding: 0px 0px 0px 0px;
        box-sizing: border-box;
        .vant_normal_7 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_21 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_6 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_16 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_22 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_17 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_23 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_18 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_24 {
            box-sizing: border-box;
            flex-wrap: nowrap;
            justify-content: flex-start;
            display: flex;
            gap: 8px;
            .vant_button_11 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
          }
        }
        .vant_normal_8 {
          padding: 12px;
          box-sizing: border-box;
          background-color: #ffffff;
          margin: 8px 16px;
          border-radius: 8px;
          .vant_flex_25 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_tag_7 {
              margin-right: 8px;
              margin: 0px 8px 0px 0px;
              box-sizing: border-box;
              display: inline-flex;
            }
            .vant_text_19 {
              font-size: 14px;
              box-sizing: border-box;
              color: #333333;
              flex: 1;
              font-weight: bold;
            }
          }
          .vant_flex_26 {
            margin: 0px 0px 8px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 8px;
            justify-content: flex-start;
            .vant_text_20 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_27 {
            margin: 0px 0px 12px 0px;
            align-items: center;
            flex-wrap: nowrap;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 12px;
            justify-content: flex-start;
            .vant_text_21 {
              font-size: 14px;
              box-sizing: border-box;
              color: #666666;
            }
          }
          .vant_flex_28 {
            box-sizing: border-box;
            flex-wrap: nowrap;
            justify-content: flex-start;
            display: flex;
            gap: 8px;
            .vant_button_12 {
              box-sizing: border-box;
              position: relative;
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
