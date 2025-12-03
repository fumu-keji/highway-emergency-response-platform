<template>
  <div class="vant-online-map">
    <!-- 地图容器 -->
    <div class="map-container" :id="getMapId" />
    <!-- 工具栏 -->
    <vant-map-toolbar-control
      ref="mapToolbarControl"
      :toolBarAttr="mapAttribute.toolBarAttr"
      :baseLayer="baseLayer"
      :mapData="mapData"
      :projection="projection"
      @toolBarDrawEnd="handleOnDrawEnd"
    />
  </div>
</template>

<script setup>
import { get as getProj, getTransform } from "ol/proj";
import { getWidth, getTopLeft } from "ol/extent";
import { ScaleLine } from "ol/control";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileLayer from "ol/layer/Tile";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import WMTS from "ol/source/WMTS";
import "ol/ol.css";
import { Fill, Stroke, Style } from "ol/style.js";
import Register from "@/utils/registerProjUtil";
import GeoJSON from "ol/format/GeoJSON";
import { generateShortStr } from "@/utils/functionUtil";
import { mapEventArrangeHooks } from "./common/mapEventArrangeHooks";
import VantMapToolbarControl from "./component/VantMapToolbarControl.vue";
import { computed, onMounted, ref, nextTick, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  baseLayer: {
    type: Object,
    require: true
  },
  mapAttribute: {
    type: Object,
    require: true
  }
});
const emit = defineEmits(["drawEnd", "featureClick", "mounted"]);

// map的zoom等级
const mapZoom = ref(props.mapAttribute.defaultZoom || 3.5);
// 当前map的绘制geoJson集合
const drawGeoJson = ref({});

const getMapId = computed(() => `map-${generateShortStr()}`);
const projection = computed(() => {
  if (!props.mapAttribute.projection) { return "EPSG:4490"; }
  return props.mapAttribute.projection;
});

onMounted(async () => {
  await nextTick();
  initMapData();
});

//获取hooks函数
const {
  mapData,
  initMap,
  addStaticImgLayer,
  fitLayerPosition,
  setMapcenterAndZoom,
  createPointVectorLayer,
  addWmsLayer,
  addWmtsLayer,
  addVertorLayer,
  addFeatureCollection,
  getLayerByLayerName,
  getGeoJsonArea,
  getGeoJsonLength,
  highLightLayerByLayerName,
  set2DMapCenter,
  set2DMapZoom,
  focus2DMapLayer,
  focus2DMapFeature,
  add2DMapLayer,
  delete2DMapLayer,
  clear2DMapLayer,
  add2DMapOverlay,
  delete2DMapOverlay,
  clear2DMapOverlay,
  add2DMapMarkPoint,
  delete2DMapMarkPoint,
  calculate2DMapFeaturesArea,
  calculate2DMapFeaturesLength,
  overlayLayers2DMapAnalysis
} = mapEventArrangeHooks();
// 初始化地图
function initMapData() {
  // 注册自定义坐标系
  if (mapData.value == null) {
    Register.registerProjection();
  } else {
    mapData.value.destroy();
    mapData.value = null;
  }
  // 移除所有的绘制geojson
  drawGeoJson.value = {};
  // 控制工具的集合
  const resultControl = setControlLine();
  // 基本图层的集合
  const resultLayer = setInitMapLayer();
  // 地图中心点
  const defaultValue = props.mapAttribute.defaultCenterPoint;
  const defaultArray = defaultValue && defaultValue.split(",");
  let mapCenter = "";
  if (defaultArray.length <= 1) {
    mapCenter = projection.value === "EPSG:4490" ? [91.076298, 42.500263] : [12192758.010932, 3909689.336326];
  } else {
    mapCenter = [parseFloat(defaultArray[0]), parseFloat(defaultArray[1])];
  }
  // 初始化地图
  initMap(getMapId.value, mapZoom.value, mapCenter, projection.value, props.mapAttribute.minZoom, props.mapAttribute.maxZoom, resultControl);
  // 加入底图
  if (props.mapAttribute.showBaseLayer) {
    mapData.value.addLayer(WMTSLayer(props.baseLayer.imageBaseUrl, props.baseLayer.imageBaseLayerName));
    mapData.value.addLayer(WMTSLayer(props.baseLayer.imageNoteUrl, props.baseLayer.imageNoteLayerName));
  } else {
    addStaticImgLayer(props.mapAttribute.staticImgUrl, "staticImgLayer");
  }
  // 加入基础图层
  mapData.value.addLayer(resultLayer.highlightLayer);
  setInitMapEvent();
  // 设置比列尺的位置
  setScalePosition();
  emit("mounted");
}
// 通过gridset计算行列号加载wmts
function WMTSLayer(layerUrl, layerName) {
  const projectionData = getProj(props.mapAttribute.projection || "EPSG:4490");
  const projectionExtent = projectionData.getExtent();
  let origin = projectionExtent ? getTopLeft(projectionExtent) : [-180, 90];
  let fromLonLat = getTransform(props.mapAttribute.projection || "EPSG:4490", projectionData);
  let width = projectionExtent ? getWidth(projectionExtent) : getWidth(applyTransform([-180.0, -90.0, 180.0, 90.0], fromLonLat));
  let resolutions = [];
  let matrixIds = [];
  for (let z = 1; z < 19; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z));
    matrixIds[z] = z;
  }
  let wmtsTileGrid = new WMTSTileGrid({
    origin: origin,
    resolutions: resolutions,
    matrixIds: matrixIds
  });
  let wmtsSource = new WMTS({
    url: layerUrl,
    layer: layerName,
    version: "1.0.0",
    matrixSet: projection.value == "EPSG:4490" ? "c" : "w",
    format: "tiles",
    projection: projectionData,
    requestEncoding: "KVP",
    style: "default",
    tileGrid: wmtsTileGrid
  });
  return new TileLayer({
    source: wmtsSource
  });
}
// 设置地图基本的控件
function setControlLine() {
  // 比例尺
  let scaleLine = new ScaleLine({
    units: "metric",
    target: "scalebar",
    className: props.mapAttribute.scaleAttr.show ? "ol-scale-line" : "hidden"
  });
  return { scaleLine };
}
// 设置比例尺的偏移量
function setScalePosition() {
  const scale = document.getElementsByClassName("ol-scale-line")[0];
  if (!scale) {
    return;
  }
  const left = props.mapAttribute.scaleAttr.left;
  const bottom = props.mapAttribute.scaleAttr.bottom;
  scale.style.left = `${left}%`;
  scale.style.bottom = `${bottom}%`;
}
// 设置需要初始化添加的图层
function setInitMapLayer() {
  // 要素点击高亮的图层
  let highlightLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      stroke: new Stroke({
        color: "rgba(255, 255, 0, 1",
        width: 2
      }),
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.5)"
      }),
    }),
    zIndex: 999
  });
  highlightLayer.name = "highlightLayer";
  // 返回生成的图层实例
  return { highlightLayer };
}

// 初始地图后的默认监听方法
const mapToolbarControl = ref(null);
//map的点击事件
const clickEvent = ref(null);
function setInitMapEvent() {
  // 监听地图要素点击事件
  clickEvent.value = mapData.value.on("singleclick", e => {
    // 还在标绘的时候点击事件无效
    if (mapToolbarControl.value.drawing) {
      return;
    }
    // 区分要素点击和非要素点击
    const featureClickFlag = mapData.value.hasFeatureAtPixel(e.pixel);
    // 如果是要素点击
    if (featureClickFlag) {
      getLayerByLayerName("highlightLayer").getSource().clear();
      // 先获取feature和layer
      const featureLayerData = mapData.value.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        return { feature, layer };
      });
      if (!featureLayerData) {
        return;
      }
      // 如果点击的是其他要素高亮该要素的图层
      getLayerByLayerName("highlightLayer").getSource().addFeature(featureLayerData.feature);
      // 对外传递点击的GeoJson
      const resultGeoJson = new GeoJSON().writeFeature(featureLayerData.feature);
      emit("featureClick", JSON.parse(resultGeoJson));
    }
    // 如果不是要素点击
    if (!featureClickFlag) {
      // 目前只作高亮手动添加的图层并抛出对应的GeoJson
      const coordinate = mapData.value.getCoordinateFromPixel(e.pixel);
      const viewResolution = (mapData.value.getView().getResolution());
      getLayerByLayerName("highlightLayer").getSource().clear();
      let layerData = [];
      mapData.value.forEachLayerAtPixel(e.pixel, layer => {
        if (layer.tag === "addLayer") {
          layerData.push(layer);
        }
      });
      if (!layerData.length) {
        return;
      }
      const url = layerData[0].getSource().getFeatureInfoUrl(
        coordinate,
        viewResolution,
        projection.value,
        { INFO_FORMAT: "application/json" }
      );
      if (url) {
        fetch(url).then(response => response.text()).then(geoJson => {
          try {
            const feature = new GeoJSON().readFeatures(geoJson);
            getLayerByLayerName("highlightLayer").getSource().addFeatures(feature);
            // 对外传递点击的GeoJson
            emit("featureClick", JSON.parse(geoJson));
          } catch (err) {
            proxy.$vantNotify({ message: err, type: "danger" });
          }
        });
      }
    }
  });
}
// 结束绘制事件
function handleOnDrawEnd(drawGeoJson) {
  let geoJson = JSON.parse(JSON.stringify(drawGeoJson));
  console.log(geoJson);
  drawGeoJson.value = geoJson;
  emit("drawEnd", geoJson);
}

//往外暴露方法
defineExpose({
  mapData,
  fitLayerPosition,
  setMapcenterAndZoom,
  createPointVectorLayer,
  addWmsLayer,
  addWmtsLayer,
  addVertorLayer,
  addFeatureCollection,
  getLayerByLayerName,
  getGeoJsonArea,
  getGeoJsonLength,
  highLightLayerByLayerName,
  set2DMapCenter,
  set2DMapZoom,
  focus2DMapLayer,
  focus2DMapFeature,
  add2DMapLayer,
  delete2DMapLayer,
  clear2DMapLayer,
  add2DMapOverlay,
  delete2DMapOverlay,
  clear2DMapOverlay,
  add2DMapMarkPoint,
  delete2DMapMarkPoint,
  calculate2DMapFeaturesArea,
  calculate2DMapFeaturesLength,
  overlayLayers2DMapAnalysis,
  addStaticImgLayer
});
</script>

<style lang="less">
.vant-online-map {
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  .map-container {
    width: 100%;
    height: 100%;
  }
}
.ol-scale-line {
  position: absolute;
  width: 100px;
  padding: 2px;
  background-color: transparent;
  border-radius: 4px;
  text-align: center;
  .ol-scale-line-inner {
    display: inline-block;
    width: 100px !important;
    line-height: 1.1;
    overflow: hidden;
    padding: 2px 5px 1px;
    border: 2px solid #777;
    border-top: none;
    color: #333333;
    font-size: 13px;
    white-space: nowrap;
    box-sizing: border-box;
  }
}
</style>