<template>
  <high-chart-render ref="renderRef" :options="renderOptions" />
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, getCurrentInstance } from "vue";
import { defaultHighchartAttribute } from "@/config/pageDesign/componentConfig";
import { cloneObject, setHighChartCommonOption, setChartAttribute } from "@/utils/functionUtil";
const { proxy } = getCurrentInstance();
const radarAttribute = {
  shape: "polygon",
  radarRadius: "55",
  centerLeft: "50",
  centerTop: "55"
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultHighchartAttribute, radarAttribute);
});
let renderRef = ref(null);
let renderOptions = ref(null);
onMounted(() => {
  initChart();
});
async function initChart(resResultItem) {
  const resultAttrs = setChartAttribute(attrs, defaultAttrs.value);
  let option = {
    chart: { polar: true, type: "line" },
    legend: { floating: true },
    title: { floating: true },
    tooltip: {},
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "exitFullscreen",
            "downloadPNG",
            "downloadPDF",
            "downloadJPEG"
          ]
        }
      }
    },
    credits: { enabled: false },
    pane: {
      size: resultAttrs.radarRadius + "%",
      center: [resultAttrs.centerLeft + "%", resultAttrs.centerTop + "%"]
    },
    xAxis: { 
      lineWidth: 0,
      tickmarkPlacement: "on"
    },
    yAxis: {
      gridLineInterpolation: resultAttrs.shape,
      lineWidth: 0,
      min: 0,
    },
    series: []
  };
  option = setHighChartCommonOption(resultAttrs, option);
  await setRadarData(option, resResultItem);
  renderOptions.value = option;
  renderRef.value.initRenderChart();
}
async function setRadarData(option, resResultItem) {
  let resultItem = [];
  if (resResultItem) {
    resultItem = resResultItem;
  } else {
    if (attrs.setting.bindType === "static") {
      resultItem = attrs.setting.optionItem.length ? cloneObject(attrs.setting.optionItem)  : [];
    }  else {
      await proxy.$getChartOptionItem(attrs.setting, resultItem);
    }
  }
  // 初始化x，y轴数据
  option.xAxis.categories = [];
  option.series = [];
  if (resultItem.length === 0) {
    return;
  }
  // 处理相同的数据混合
  let dataInfo = {};
  resultItem.forEach(item => {
    const { catalog } = item;
    if (!dataInfo[catalog]) {
      dataInfo[catalog] = {
        catalog,			
        data: []
      };
    }
    dataInfo[catalog].data.push({ name: item.name, value: item.value });
  });
  let optionItem = Object.values(dataInfo);
  // 处理x轴数据
  optionItem[0].data.forEach(item => {
    option.xAxis.categories.push(item.name);
  });
  // 处理y轴数据
  const colorList = attrs.setting.colorList;
  optionItem.forEach((item, index) => {
    let radarColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      radarColor = colorList[index];
    }
    // 设置y轴数据集合
    let seriesObject = {
      name: item.catalog,
      color: radarColor,
      data: []
    };
    item.data.forEach(child => {
      seriesObject.data.push(parseFloat(child.value));
    });
    // 添加所有的分类到series
    option.series.push(seriesObject);
  });
}
defineExpose({
  initChart
});
</script>

