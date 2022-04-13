<template>
  <div class="application-container">
    <div class="header-box"></div>
    <div class="content-box">
      <div class="left-bar">
        <div
          v-for="element in resources"
          :key="element.tag"
          :draggable="true"
          class="element-item"
          @dragstart="handleDragStart($event, element)"
        >
          {{ element.name }}
        </div>
      </div>
      <div class="center-box" @dragover="handleDragOver" @drop="handleDrop">
        <vue-draggable
          id="draggable-drawing-board"
          :list="componentList"
          item-key="id"
          group="dragArea"
        >
          <template #item="{ element }">
            <renderItem :conf="element" />
          </template>
        </vue-draggable>
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import * as _Lodash from "lodash";
import { nanoid } from "nanoid";
import renderItem from "../src/render/render";
import { resources } from "./render/index";

const componentList = reactive([]);
let dragCompObj = reactive(null);

const handleDragStart = function (event, element) {
  console.log(event, element);
  dragCompObj = _Lodash.cloneDeep({
    ...element,
    id: nanoid(),
  });
};

const handleDragOver = function (event) {
  event.preventDefault();
};

const handleDrop = function () {
  if (dragCompObj) {
    componentList.push(dragCompObj);
  }

  dragCompObj = null;
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
  height: 60px;
  border-bottom: 1px solid #eee;
  background-color: #545c64;
}

.content-box {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left-bar {
  width: 240px;
  border-right: 1px solid #eee;
  flex-shrink: 0;
  padding: 5px;
}

.left-bar .element-item {
  padding: 5px 10px;
  background: #f6f7ff;
  font-size: 12px;
  cursor: move;
  width: 105px;
  border: 1px dashed #f6f7ff;
  border-radius: 3px;
  margin-bottom: 10px;
  float: left;
  text-align: center;
  margin-left: 5px;
}

.center-box {
  flex: 1;
}

.right-box {
  width: 240px;
  flex-shrink: 0;
  border-left: 1px solid #eee;
}
</style>
