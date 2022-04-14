export default function (conf) {
  return {
    template: `
      <div class="flex-container draggable-render-item" :class="{'render-item-active': this.conf.id === this.activeId}" @click.native.prevent="selectItem">
        <vue-draggable class="drag-wrapper" :list="children" item-key="id" group="dragArea">
          <template #item="{ element }">
            <renderItem :conf="element" />
          </template>
        </vue-draggable>
      </div>`,
  };
}
