<template>
  <div id="app-toggle-container">
    <div class="map-type">
      <div class="map-type-card normal" @click="toggleBaseLayer('vector')">
        <span>矢量</span>
      </div>
      <div class="map-type-card earth" @click="toggleBaseLayer('terrain')">
        <span>地形</span>
      </div>
      <div class="map-type-card panorama" @click="toggleBaseLayer('image')">
        <span>影像</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getWidth, getTopLeft } from "ol/extent";
import { get as getProj, getTransform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import WMTS from "ol/source/WMTS";
import { ref } from "vue";

const props = defineProps({
  mapToggleAttr: {
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
    require: true,
    default: "EPSG:4490"
  }
});
// 底图切换
const currentBaseLayerType = ref("");
// 取对应的值
const layerConfig = ref({
  vector: {
    baseUrl: "vectorBaseUrl",
    baseLayerName: "vectorBaseLayerName",
    noteUrl: "vectorNoteUrl",
    noteLayerName: "vectorNoteLayerName"
  },
  terrain: {
    baseUrl: "terrainBaseUrl",
    baseLayerName: "terrainBaseLayerName",
    noteUrl: "terrainNoteUrl",
    noteLayerName: "terrainNoteLayerName"
  },
  image: {
    baseUrl: "imageBaseUrl",
    baseLayerName: "imageBaseLayerName",
    noteUrl: "imageNoteUrl",
    noteLayerName: "imageNoteLayerName"
  }
});
function toggleBaseLayer(type) {
  let layers = props.mapData.getLayers();
  if (type === currentBaseLayerType.value) {
    return;
  }
  // 点击切换找到对应的图层url和图层名称
  const layerData = layerConfig.value[type];
  const baseUrl = props.baseLayer[layerData.baseUrl];
  const baseLayerName = props.baseLayer[layerData.baseLayerName];
  const noteUrl = props.baseLayer[layerData.noteUrl];
  const noteLayerName = props.baseLayer[layerData.noteLayerName];
  // 超过2个图层就是在已有图层基础上设置图层
  if (layers.getArray().length > 2) {
    layers.setAt(1, WMTSLayer(baseUrl, baseLayerName));
    layers.setAt(2, WMTSLayer(noteUrl, noteLayerName));
  } else {
    props.mapData.addLayer(WMTSLayer(baseUrl, baseLayerName));
    props.mapData.addLayer(WMTSLayer(noteUrl, noteLayerName));
  }
  // 设置当前选中的图层类型
  currentBaseLayerType.value = type;
}
// 通过gridset计算行列号加载wmts
function WMTSLayer(layerUrl, layerName) {
  const projection = getProj(props.projection);
  const projectionExtent = projection.getExtent();
  let origin = projectionExtent ? getTopLeft(projectionExtent) : [-180, 90];
  let fromLonLat = getTransform(props.projection, projection);
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
    matrixSet: props.projection == "EPSG:4490" ? "c" : "w",
    format: "tiles",
    projection: projection,
    requestEncoding: "KVP",
    style: "default",
    tileGrid: wmtsTileGrid
  });
  return new TileLayer({
    source: wmtsSource
  });
}
defineExpose({
  toggleBaseLayer
});
</script>

<style lang="less" scoped>
#app-toggle-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.map-type {
  min-width: 280px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .map-type-card {
    height: 60px;
    width: 86px;
    position: relative;
    border-radius: 2px;
    border: 1px solid rgba(153, 153, 153, 0.42);
    background: url(../../../../assets/image/mapType.png) no-repeat 0 0;
    background-size: 86px 240px;
    box-sizing: border-box;
    span {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      padding: 3px 3px 2px 4px;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      color: #fff;
      background-color: #999;
      border-top-left-radius: 2px;
    }
  }
  .map-type-card:hover span {
    background-color: #3385ff;
  }
  .normal {
    background-position: 0 0;
  }
  .earth {
    background-position: 0 -81px;
  }
  .panorama {
    background-position: 0 -161px;
  }
}
</style>
