<template>
  <high-chart-render ref="renderRef" :options="renderOptions" />
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, getCurrentInstance } from "vue";
import { defaultHighchartAttribute } from "@/config/pageDesign/componentConfig";
import { cloneObject, setHighChartCommonOption, setChartAttribute } from "@/utils/functionUtil";
const { proxy } = getCurrentInstance();
const roseAttribute = {
  roseInnerRadius: "30",
  roseOutSideRadius: "70",
  roundedModel: true,
  showLabel: true,
  labelDistance: "10",
  labelFontSize: "12",
  labelColor: "#464646",
  showTotal: true,
  totalAlign: "center",
  totalVerticalAlign: "middle",
  totalX: "0",
  totalY: "40",
  centerLeft: "50",
  centerTop: "60",
  numColor: "#a9a9a9",
  numFontSize: "14",
  totalColor: "#000",
  totalFontSize: "12"
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultHighchartAttribute, roseAttribute);
});
let renderRef = ref(null);
let renderOptions = ref(null);
onMounted(() => {
  initChart();
});
async function initChart(resResultItem) {
  const resultAttrs = setChartAttribute(attrs, defaultAttrs.value);
  let option = {
    chart: { type: "variablepie" },
    legend: { floating: true },
    title: { floating: true },
    tooltip: {
      headerFormat: "",
      pointFormat: "<span style='color:{point.color}'>\u25CF</span> <b>{point.name}</b><br/><b>{point.y}</b>"
    },
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
    plotOptions: {
      variablepie: {
        dataLabels: {
          enabled: resultAttrs.showLabel,
          distance: resultAttrs.labelDistance ? parseInt(resultAttrs.labelDistance) : 0,
          style: {
            fontWeight: "bold",
            fontSize: resultAttrs.labelFontSize,
            color: resultAttrs.labelColor,
          },
          format: "{point.y}",
        },
        center: [`${resultAttrs.centerLeft}%`, `${resultAttrs.centerTop}%`],
        showInLegend: true
      }
    },
    series: []
  };
  option = setHighChartCommonOption(resultAttrs, option);
  await setRoseData(option, resResultItem, resultAttrs);
  renderOptions.value = option;
  renderRef.value.initRenderChart();
}
async function setRoseData(option, resResultItem, resultAttrs) {
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
  option.series = [];
  if (resultItem.length === 0) {
    return;
  }
  let roseDataTotal = 0;
  let resultRoseData = {
    name: "",
    type: "variablepie",
    size: resultAttrs.roseOutSideRadius + "%",
    innerSize: resultAttrs.roseInnerRadius + "%",
    borderRadius: resultAttrs.roundedModel ? 15 : 0,
    data: []
  };
  const colorList = attrs.setting.colorList;
  // 设置每一项和计算统计
  resultItem.forEach((rose, index) => {
    let roseColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      roseColor = colorList[index];
    }
    roseDataTotal += parseFloat(rose.value);
    resultRoseData.data.push({
      name: rose.name,
      y: parseFloat(rose.value),
      z: parseFloat(rose.value),
      color: roseColor
    });
  });
  option.series.push(resultRoseData);
  if (resultAttrs.showTotal) {
    option.subtitle = {
      useHTML: true,
      text: `<div style='color:${resultAttrs.totalColor};font-size:${resultAttrs.totalFontSize}px'>总数</div></div>
          <div style='color:${resultAttrs.numColor};font-size:${resultAttrs.numFontSize}px'>${roseDataTotal}</div>`,
      align: resultAttrs.totalAlign,
      verticalAlign: resultAttrs.totalVerticalAlign,
      y: parseInt(resultAttrs.totalY),
      x: parseInt(resultAttrs.totalX),
    };
  }
}
defineExpose({
  initChart
});
</script>
