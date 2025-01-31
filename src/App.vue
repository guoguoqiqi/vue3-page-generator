<template>
  <div class="application-container">
    <div class="header-box">
      <div class="logo-box"></div>
      <div class="terminal-box"></div>
      <div class="tools-box">
        <a-button>预览</a-button>
        <a-button type="primary">源码</a-button>
      </div>
    </div>
    <div class="content-box">
      <div class="left-bar">
        <a-tabs type="card">
          <a-tab-pane key="baseComp">
            <template #tab>
              <a-tooltip placement="top">
                <template #title>
                  <span>基础组件</span>
                </template>
                <folder-outlined />
              </a-tooltip>
            </template>
            <div class="lf-panel-content">
              <div
                v-for="element in resources"
                :key="element.tag"
                :draggable="true"
                class="element-item"
                @dragstart="handleDragStart($event, element)"
                @click="handleAddCompClick(element)"
              >
                {{ element.name }}
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="center-box" @dragover="dragOver" @drop="drop">
        <suspense>
          <template #default>
            <vue-draggable
              item-key="id"
              id="draggable-drawing-board"
              ghostClass="draging-item-class"
              :list="componentList"
              group="dragArea"
              @dragstart="dragStart"
              @end="dragEnd"
            >
              <template #item="{ element }">
                <render-item :conf="element"></render-item>
              </template>
            </vue-draggable>
          </template>
          <template #fallback>
            <div>
              <a-image :width="200" src="../src/assets/loading.gif" />
            </div>
          </template>
        </suspense>
      </div>
      <div class="right-box">
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="props">
            <template #tab>
              <span>
                <appstore-outlined />
                属性
              </span>
            </template>
            <component :is="componentPanel" v-if="activeComponent"></component>
          </a-tab-pane>
          <a-tab-pane key="event">
            <template #tab>
              <span>
                <code-outlined />
                事件
              </span>
            </template>
            <p>Content of Tab Pane 2</p>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineAsyncComponent,
  reactive,
  shallowRef,
  ref,
  watch,
} from "vue";
import * as _Lodash from "lodash";
import { nanoid } from "nanoid";
import renderItem from "../src/render/render";
import { resources } from "./render/resources";
import { mainStore } from "./store";
import {
  AppstoreOutlined,
  CodeOutlined,
  FolderOutlined,
  PushpinOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

const componentList = reactive([]);
const store = mainStore();
let activeKey = ref("props");
let dragCompObj = reactive({});
let pointer = null;
let componentPanel = shallowRef({});

let activeComponent = computed(() => store.activeComponent);

watch(activeComponent, (val) => {
  componentPanel.value = defineAsyncComponent(() =>
    import(/* @vite-ignore */ "../src/render/" + val.resolveName + "/panel.vue")
  );
});

const handleDragStart = function (event, element) {
  dragCompObj = _Lodash.cloneDeep({
    ...element,
    id: nanoid(),
  });
};

const handleAddCompClick = function (element) {
  const comp = _Lodash.cloneDeep({
    ...element,
    id: nanoid(),
  });
  componentList.push(comp);
  store.$patch((state) => {
    state.activeComponent = comp;
  });
};

const dragOver = function (event) {
  event.preventDefault();
};

const drop = function () {
  if (dragCompObj) {
    componentList.push(dragCompObj);
    store.$patch((state) => {
      state.activeComponent = dragCompObj;
    });
  }

  dragCompObj = null;
};

const dragStart = function (event) {
  event.dataTransfer.effectAllowed = "linkMove";
  pointer = document.createElement("canvas");
  pointer.style.position = "absolute";
  pointer.style.left = "-100%";
  pointer.style.top = "-100%";
  const context = pointer.getContext("2d");
  context.height = "10px";
  context.width = "10px";
  context.fillStyle = "green";
  context.fillRect(5, 5, 10, 10);
  document.body.append(pointer);
  event.dataTransfer.setDragImage(pointer, 7.5, 7.5); // 用透明图片覆盖默认拖拽效果
};

const dragEnd = function (event) {
  document.body.removeChild(pointer);
  pointer = null;
};
</script>

<style>
.application-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.header-box {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.header-box .logo-box {
  width: 240px;
  flex-shrink: 0;
}

.header-box .terminal-box {
  flex: 1;
}

.header-box .tools-box {
  width: 600px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  padding-left: 10px;
}
.tools-box .ant-btn {
  margin-right: 10px;
}
.tools-box .ant-btn:last-child {
  margin-right: 0;
}
.content-box {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: row;
  justify-content: space-between;
}
.left-bar {
  width: 248px;
  border-right: 1px solid #eee;
  flex-shrink: 0;
}

.left-bar .lf-panel-content {
  padding-top: 0;
  padding-left: 5px;
  padding-right: 5px;
  overflow: hidden;
}
.left-bar .lf-panel-content .element-item {
  float: left;
  width: 105px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px dashed #f6f7ff;
  font-size: 12px;
  text-align: center;
  background: #f6f7ff;
  cursor: move;
  border-radius: 3px;
}
.center-box {
  flex: 1;
  overflow-y: auto;
}
.right-box {
  width: 300px;
  border-left: 1px solid #eee;
  flex-shrink: 0;
}

.right-box .ant-tabs-card-content {
  padding: 5px 10px;
}
</style>
