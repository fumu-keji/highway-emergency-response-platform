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
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: ["交通", "火灾", "治安", "医疗", "其他"],
    },
    yAxis: {
      title: {
        text: "数量",
      },
    },
    series: [
      {
        name: "事件数量",
        data: [425, 312, 289, 156, 74],
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "#1989fa"],
            [1, "#66b3ff"],
          ],
        },
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
