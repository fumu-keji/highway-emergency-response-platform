<template>
  <high-chart-render ref="renderRef" :options="renderOptions" />
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, getCurrentInstance } from "vue";
import { defaultHighchartAttribute } from "@/config/pageDesign/componentConfig";
import { cloneObject, setHighChartCommonOption, setChartAttribute } from "@/utils/functionUtil";
const { proxy } = getCurrentInstance();
const areaAttribute = {
  smoothLine: false,
  xTitle: "",
  yTitle: "",
  marginLeft: "35",
  marginRight: "15",
  marginTop: "70",
  marginBottom: "35",
  xyTitleFontSize: "14",
  xyTitleColor: "#333",
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultHighchartAttribute, areaAttribute);
});
let renderRef = ref(null);
let renderOptions = ref(null);
onMounted(() => {
  initChart();
});
async function initChart(resResultItem) {
  const resultAttrs = setChartAttribute(attrs, defaultAttrs.value);
  let option = {
    chart: { type: resultAttrs.smoothLine ? "areaspline" : "area" },
    legend: { floating: true, itemDistance: 5 },
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
    xAxis: { 
      title: { 
        text: resultAttrs.xTitle,
        style: {
          fontSize: resultAttrs.xyTitleFontSize,
          color: resultAttrs.xyTitleColor
        }
      },
      labels: {
        y: 15,
        style: {
          fontSize: resultAttrs.xyTitleFontSize,
          color: resultAttrs.xyTitleColor
        }
      }
    },
    yAxis: { 
      title: { 
        text: resultAttrs.yTitle,
        x: 5,
        style: {
          fontSize: resultAttrs.xyTitleFontSize,
          color: resultAttrs.xyTitleColor
        }
      },
      labels: {
        x: -5,
        y: 3,
        style: {
          fontSize: resultAttrs.xyTitleFontSize,
          color: resultAttrs.xyTitleColor
        }
      }
    },
    series: []
  };
  option = setHighChartCommonOption(resultAttrs, option);
  await setAreaData(option, resResultItem);
  renderOptions.value = option;
  renderRef.value.initRenderChart();
}
async function setAreaData(option, resResultItem) {
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
    let areaColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      areaColor = colorList[index];
    }
    // 设置y轴数据集合
    let seriesObject = {
      name: item.catalog,
      color: areaColor,
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
