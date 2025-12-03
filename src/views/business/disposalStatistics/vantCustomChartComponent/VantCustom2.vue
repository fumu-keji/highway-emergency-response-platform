<template>
  <high-chart-render ref="renderRef" :options="renderOptions" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import variablePie from "highcharts/modules/variable-pie";
import HighchartsMore from "highcharts/highcharts-more";
let renderRef = ref(null);
let renderOptions = ref(null);
onMounted(() => {
  initChart();
});
function initChart() {
  let optionRow = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {
      title: {
        text: "处置数量",
      },
    },
    series: [
      {
        name: "处置数量",
        data: [98, 112, 125, 108, 142, 156, 168, 145, 132, 128, 115, 102],
        color: "#07c160",
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  };
  if (optionRow) {
    renderOptions.value = optionRow;
    renderRef.value.initRenderChart();
  }
}
defineExpose({
  initChart,
});
</script>
