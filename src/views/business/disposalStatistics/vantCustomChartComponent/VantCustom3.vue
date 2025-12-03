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
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    series: [
      {
        name: "状态分布",
        data: [
          {
            name: "已完成",
            y: 1156,
            color: "#07c160",
          },
          {
            name: "处理中",
            y: 75,
            color: "#ff976a",
          },
          {
            name: "待处理",
            y: 25,
            color: "#1989fa",
          },
        ],
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
