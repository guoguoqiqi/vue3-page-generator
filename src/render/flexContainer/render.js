import { createApp } from "vue";
import renderItem from "../render";

export default function (conf) {
  const { _component } = createApp({
    template: `
      <div class="flex-container draggable-render-item">
        <vue-draggable class="drag-wrapper" :list="children" item-key="id" group="dragArea">
          <template #item="{ element }">
            <renderItem :conf="element" />
          </template>
        </vue-draggable>
      </div>`,
    data() {
      return {
        children: conf.children,
      };
    },
    components: { renderItem },
  });

  return _component;
}
