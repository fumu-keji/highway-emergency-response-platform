<template>
  <div class="highchart-box" ref="highchartRef" />
</template>

<script setup>
import { ref, onMounted, watch, nextTick, toRaw } from "vue";
import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
import exportingInit from "highcharts/modules/exporting";
import variablePie from "highcharts/modules/variable-pie";
import HighchartsMore from "highcharts/highcharts-more";
import { generateShortStr } from "@/utils/functionUtil";
exportingInit(Highcharts);
variablePie(Highcharts);
HighchartsMore(Highcharts);
Highcharts.setOptions({
  lang: {
    viewFullscreen: "全屏",
    exitFullscreen: "退出全屏",
    printChart: "打印图表",
    downloadPNG: "下载PNG文件",
    downloadPDF: "下载PDF文件",
    downloadJPEG: "下载JPEG文件"
  }
});
const props = defineProps({
  options: {
    type: Object,
    require: true
  }
});
let chartInstance = null;
let highchartRef = ref(null);
async function initRenderChart() {
  try {
    await nextTick();
    if (chartInstance) {
      chartInstance.destroy();
    }
    const options = { 
      ...props.options, 
      accessibility: {
        enabled: false
      }
    };
    chartInstance = Highcharts.chart(highchartRef.value, options);
  } catch {}
}
defineExpose({
  initRenderChart
});
</script>
