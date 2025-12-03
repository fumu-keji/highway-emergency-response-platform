<template>
  <div class="app-toolbar-panel" :style="toolbarStyle">
    <template v-for="(item, index) in toolbarItem">
      <el-dropdown
        v-if="setButtonVisable(item.type)"
        :key="index"
        :disabled="item.type !== 'draw'"
        trigger="click"
        size="small"
        placement="left"
        @command="drawClick"
      >
        <div class="bar-item" @click="handleOnClick(item.type)">
          <div class="tool-icon" :class="item.icon"></div>
          <div class="tool-name">{{ item.name }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Point">
              <i class="fmy-mapDropPoint" />
              点
            </el-dropdown-item>
            <el-dropdown-item command="LineString">
              <i class="fmy-mapDropLine" />
              线
            </el-dropdown-item>
            <el-dropdown-item command="Polygon">
              <i class="fmy-mapDropPlane" />
              面
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <van-popup
      v-model:show="showChangeMapLayer"
      round
      position="bottom"
      :style="{ height: '15vh' }"
    >
      <vant-map-toggle-control
        :mapData="mapData"
        :baseLayer="baseLayer"
        :projection="projection"
      />
    </van-popup>
  </div>
</template>
<script setup>
import { APP_TOOLBAR_OPTION_ITEM } from "@/config/pageDesign/mapConfig";
import { Draw } from "ol/interaction";
// 矢量图层和矢量源对象
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
// 样式对象
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import VantMapToggleControl from "./VantMapToggleControl.vue";
import { computed, ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  toolBarAttr: {
    type: Object,
    require: true
  },
  baseLayer: {
    type: Object,
    require: true
  },
  mapData: {
    type: Object,
    require: true
  },
  projection: {
    type: String,
    require: true
  }
});
const emit = defineEmits(["toolBarDrawEnd"]);
const showChangeMapLayer = ref(false);
//绘制、测量等工具的图层
const drawGeoJson = ref({
  features: [],
  crs: {
    type: "name",
    properties: { name: props.projection }
  },
  type: "FeatureCollection"
});
const drawing = ref(false);
const toolbarItem = computed(() => APP_TOOLBAR_OPTION_ITEM);
// 当前工具栏的偏移量
const toolbarStyle = computed(() => {
  const right = props.toolBarAttr.right;
  const top = props.toolBarAttr.top;
  return { right: `${right}%`, top: `${top}%` };
});

let functionObj = {
  drawClick,
  positionClick,
  closeDrawClick,
  clearDrawClick,
  changeMapLayerClick
};
function handleOnClick(type) {
  functionObj[`${type}Click`]();
}
// 标绘开始
function drawClick(command) {
  if (!command) {
    return;
  }
  removeDrawInteraction();
  draw(command);
}
// 我的位置
function positionClick() {
  proxy.$vantNotify({
    message: "页面设计不支持该功能，请在导出项目操作",
    type: "warning"
  });
}
// 结束绘制
function closeDrawClick() {
  drawing.value = false;
  removeDrawInteraction();
  emit("toolBarDrawEnd", drawGeoJson.value);
}
// 清除绘制
function clearDrawClick() {
  // 清空绘制的geoJson和移除绘制画笔
  clearMapPlottingLayer();
  removeDrawInteraction();
}
// 地图切换显隐
function changeMapLayerClick() {
  showChangeMapLayer.value = true;
}
// 标绘画笔样式
const drawVar = ref(null);
function draw(command) {
  drawing.value = true;
  // 定义绘制vector图层
  let source = new VectorSource();
  let vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 0.2)"
      }),
      stroke: new Stroke({
        color: "rgba(255, 0, 0, 1)",
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "rgba(255, 0, 0, 1)"
        })
      })
    }),
    zIndex: 9999
  });
  // 添加绘制图层
  vector.name = "mapPlottingLayer";
  props.mapData.addLayer(vector);
  // 设置绘制的draw
  drawVar.value = new Draw({
    source: source,
    type: command
  });
  props.mapData.addInteraction(drawVar.value);
  drawVar.value.on("drawend", evt => {
    let featureGeoJson = JSON.parse(
      new GeoJSON().writeFeature(evt.feature)
    );
    featureGeoJson.geometry.type = command === "Circle" ? "Point" : command;
    featureGeoJson.properties = {};
    drawGeoJson.value.features.push(featureGeoJson);
  });
}
// 清除标绘图层
function clearMapPlottingLayer() {
  // 先清空地图上的标绘
  let num = drawGeoJson.value.features === null;
  num = num || drawGeoJson.value.features.length === 0;
  num = num ? 1 : drawGeoJson.value.features.length + 1;
  for (let i = 0; i < num; i++) {
    props.mapData.getLayers().getArray().forEach(layer => {
      if (layer.name === "mapPlottingLayer") {
        props.mapData.removeLayer(layer);
      }
    });
  }
  drawGeoJson.value.features = [];
  drawing.value = false;
}
// 移除绘制画笔
function removeDrawInteraction() {
  let drawExtent = props.mapData.getInteractions().getArray().find(interaction => {
    return interaction instanceof Draw;
  });
  props.mapData.removeInteraction(drawExtent);
}
// 设置toolbar按钮是否显示
function setButtonVisable(type) {
  if (type === "clearDraw") {
    return drawGeoJson.value.features.length !== 0 && !drawing.value;
  } else {
    return props.toolBarAttr[type];
  }
}
</script>

<style lang="less">
.app-toolbar-panel {
  position: absolute;
  z-index: 222;
  width: 85px;
  box-sizing: border-box;
  text-align: center;
  .el-dropdown {
    display: block;
  }
  .bar-item {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    float: left;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    border-right: 1px solid #ccc;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-family: "宋体";
    color: #666666 !important;
    font-size: 12px;
    margin-bottom: 5px;
    cursor: pointer !important;
    .tool-icon {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      color: inherit;
    }
  }
  .bar-item:hover > div {
    color: #4497f7;
  }
  .tool-icon {
    margin-right: 5px;
  }
}
</style>