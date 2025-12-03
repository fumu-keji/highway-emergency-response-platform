<template>
  <van-dropdown-menu
    active-color="#1989FA"
    z-index="10"
    duration="0.2"
    :overlay="true"
    :style="{
      width: '100%',
      '--boxShadow': '0 2px 12px rgb(100 101 102 / 12%)',
      '--backgroundColor': '#ffffff',
      '--iconBackgroundColor': '#dcdee0',
    }"
  >
    <vant-dropdown-item-component
      :optionItem="dropdownItemOptionUXePMz"
      dataModelFieldLabel="basicInfoCreateUserId"
      dataModelFieldValue="basicInfoUpdateUserId"
      modelTitle="类型"
      v-model="modelOption.vantDropdownMenu2Id"
      @change="dropdownItemOption1Change"
    />
    <vant-dropdown-item-component
      :optionItem="dropdownItemOptionNXLVOi"
      dataModelFieldLabel="basicInfoCreateUserId"
      dataModelFieldValue="basicInfoUpdateUserId"
      modelTitle="质量"
      v-model="modelOption.vantDropdownMenu2CreateUserId"
      @change="dropdownItemOption2Change"
    />
  </van-dropdown-menu>
</template>

<script>
export default {
  name: "DropdownMenuTemplate",
  data() {
    return {
      modelOption: {
        vantDropdownMenu2Id: "",
        vantDropdownMenu2CreateUserId: "",
      },
      dropdownItemOptionUXePMz: [],
      dropdownItemOptionNXLVOi: []
    };
  },
  mounted() {
    this.dropdownItemOptionUXePMz = [
      { basicInfoCreateUserId: "一般", basicInfoUpdateUserId: "一般" },
      { basicInfoCreateUserId: "良好", basicInfoUpdateUserId: "良好" },
      { basicInfoCreateUserId: "优秀", basicInfoUpdateUserId: "优秀" }
    ];
    this.dropdownItemOptionNXLVOi = [
      {  basicInfoCreateUserId: "全新商品", basicInfoUpdateUserId: "全新商品" },
      {  basicInfoCreateUserId: "新款商品", basicInfoUpdateUserId: "新款商品" },
      {  basicInfoCreateUserId: "活动商品", basicInfoUpdateUserId: "活动商品" }
    ];
  },
  methods: {
    dropdownItemOption1Change(value) {
      this.getList();
    },
    dropdownItemOption2Change(value) {
      this.getList();
    },
    getList() {
      console.log(this.modelOption);
    }
  }
};
</script>

