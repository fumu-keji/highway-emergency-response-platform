<template>
  <high-chart-render ref="renderRef" :options="renderOptions" />
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, getCurrentInstance } from "vue";
import { defaultHighchartAttribute } from "@/config/pageDesign/componentConfig";
import { cloneObject, setHighChartCommonOption, setChartAttribute } from "@/utils/functionUtil";
const { proxy } = getCurrentInstance();
const pieAttribute = {
  pieInnerRadius: "30",
  pieOutSideRadius: "70",
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
  return Object.assign({}, defaultHighchartAttribute, pieAttribute);
});
let renderRef = ref(null);
let renderOptions = ref(null);
onMounted(() => {
  initChart();
});
async function initChart(resResultItem) {
  const resultAttrs = setChartAttribute(attrs, defaultAttrs.value);
  let option = {
    chart: { type: "pie" },
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
      pie: {
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
  await setPieData(option, resResultItem, resultAttrs);
  renderOptions.value = option;
  renderRef.value.initRenderChart();
}
async function setPieData(option, resResultItem, resultAttrs) {
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
  let pieDataTotal = 0;
  let resultPieData = {
    name: "",
    type: "pie",
    size: resultAttrs.pieOutSideRadius + "%",
    innerSize: resultAttrs.pieInnerRadius + "%",
    borderRadius: resultAttrs.roundedModel ? 15 : 0,
    data: []
  };
  const colorList = attrs.setting.colorList;
  // 设置每一项和计算统计
  resultItem.forEach((pie, index) => {
    let pieColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      pieColor = colorList[index];
    }
    pieDataTotal += parseFloat(pie.value);
    resultPieData.data.push({
      name: pie.name,
      y: parseFloat(pie.value),
      z: parseFloat(pie.value),
      color: pieColor
    });
  });
  option.series.push(resultPieData);
  if (resultAttrs.showTotal) {
    option.subtitle = {
      useHTML: true,
      text: `<div style='color:${resultAttrs.totalColor};font-size:${resultAttrs.totalFontSize}px'>总数</div></div>
          <div style='color:${resultAttrs.numColor};font-size:${resultAttrs.numFontSize}px'>${pieDataTotal}</div>`,
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
