<template>
  <div>
    <a-form
      :model="_props"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-form-item label="按钮文本">
        <a-input v-model:value="_props.text" />
      </a-form-item>
      <a-form-item label="按钮类型">
        <a-select ref="select" v-model:value="_props.type" style="width: 216px">
          <a-select-option value="primary">主要按钮</a-select-option>
          <a-select-option value="ghost">幽灵按钮</a-select-option>
          <a-select-option value="dashed">虚线按钮</a-select-option>
          <a-select-option value="link">链接按钮</a-select-option>
          <a-select-option value="text">文本按钮</a-select-option>
          <a-select-option value="default">默认按钮</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="按钮尺寸">
        <a-select ref="select" v-model:value="_props.size" style="width: 216px">
          <a-select-option value="large">超大尺寸</a-select-option>
          <a-select-option value="default">默认尺寸</a-select-option>
          <a-select-option value="small">小型尺寸</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="按钮形状">
        <a-select
          ref="select"
          v-model:value="_props.shape"
          style="width: 216px"
        >
          <a-select-option value="">普通按钮</a-select-option>
          <a-select-option value="circle">圆形按钮</a-select-option>
          <a-select-option value="round">椭圆按钮</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="危险按钮">
        <a-radio-group v-model:value="_props.danger">
          <a-radio-button :value="true">是</a-radio-button>
          <a-radio-button :value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="幽灵按钮">
        <a-radio-group v-model:value="_props.ghost">
          <a-radio-button :value="true">是</a-radio-button>
          <a-radio-button :value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="加载状态">
        <a-radio-group v-model:value="_props.loading">
          <a-radio-button :value="true">是</a-radio-button>
          <a-radio-button :value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否禁用">
        <a-radio-group v-model:value="_props.disabled">
          <a-radio-button :value="true">是</a-radio-button>
          <a-radio-button :value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="适应宽度">
        <a-radio-group v-model:value="_props.block">
          <a-radio-button :value="true">是</a-radio-button>
          <a-radio-button :value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { mainStore } from "../../store";
const store = mainStore();
const _props = computed(() => store.activeComponent._props);
</script>
