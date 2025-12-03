<template>
  <div class="app-skeleton-container">
    <!-- 页面-->
    <router-view class="main-container" :style="mainStyle" />
    <!-- 底部导航栏 -->
    <van-tabbar
      v-if="showBottomNav"
      :style="bottomStyle"
      class="app-bottom-menu"
      v-model="activeNav"
      @change="tabbarOnChange"
    >
      <van-tabbar-item
        v-for="(item, index) in menuList"
        :key="index"
        :name="item.label"
      >
        <template #icon="props">
          <i
            :class="item.icon"
            :style="{ color: props.active ? '#1989fa' : '#646566' }"
          />
        </template>
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
// 是否显示底部导航
const showBottomNav = computed(()=> {
  const identify = "bottom";
  const exitFlag = menuList.value.some(menu => {
    return menu.label === route.name;
  });
  return identify === "bottom" && exitFlag;
});
// 中间内容样式
const mainStyle = computed(() => {
  if (showBottomNav.value) {
    return { width: "100%", height: "calc(100% - 45px) !important" };
  } else {
    return { width: "100%", height: "100%" };
  }
});
// 底部导航样式
const bottomStyle = computed(()=> {
  return { width: "100%", height: "45px" };
});
// 选中的菜单
const activeNav = computed(() => {
  return route.meta.activeMenuIndex;
});
// 菜单相关
const menuList = ref([]);
// 初始化加载
onMounted(() => {
  getMenuList();
});
function getMenuList() {
  menuList.value = [{"icon":"menu-histogram","pid":0,"label":"disposalStatistics","pageId":8333155159245638,"pageName":"处置统计","children":[],"name":"处置统计","alias":"处置统计","id":8333155161341990},{"icon":"menu-tasksShow","pid":0,"label":"taskReceiving","pageId":8333155159245702,"pageName":"任务接收","children":[],"name":"任务接收","alias":"任务接收","id":8333155161342022},{"icon":"menu-manage","pid":0,"label":"onSiteHandling","pageId":8333155159245766,"pageName":"现场处置","children":[],"name":"现场处置","alias":"现场处置","id":8333155161342054},{"icon":"menu-camera","pid":0,"label":"eventCollection","pageId":8333155159245830,"pageName":"事件采集","children":[],"name":"事件采集","alias":"事件采集","id":8333155161342086}];
  // 默认路由的跳转
  if (route.path === "/") {
    router.push({ name: findChildRouteLabel(menuList.value[0]) });
    return;
  }
}
// 找到第一个菜单
function findChildRouteLabel(menu) {
  if (menu.children.length === 0) {
    return menu.label;
  } else {
    findChildRouteLabel(menu.children[0]);
  }
}
// 菜单切换
function tabbarOnChange(label) {
  if (route.name === label) {
      return;
  }
  router.push({ name: label });
}
</script>

<style lang="less" scoped>
.app-skeleton-container {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
}
:deep(.app-bottom-menu) {
  border-top: 1px solid #e7e7e8;
  box-sizing: border-box;
  .van-tabbar-item__icon {
    margin-bottom: 2px;
    i {
      font-size: 20px;
    }
  }
}
</style>
