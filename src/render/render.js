import { createApp, defineComponent, h } from "vue";
import { mainStore } from "../store/index.js";
import interfaces from "./interfaces";

const renderInstance = function (conf) {
  const { template } = interfaces(conf);

  // 创建组件实例
  const { _component } = createApp({
    template,
    props: ["conf"],
    computed: {
      activeId: () => mainStore().activeComponent?.id,
    },
    data() {
      return {
        children: conf.children,
      };
    },
    components: { renderItem },
    methods: {
      selectItem(evt) {
        const store = mainStore();
        store.$patch((state) => {
          state.activeComponent = this.conf;
        });

        evt.stopPropagation();
      },
    },
  });
  return _component;
};

/**
 * 单个控件渲染组件
 */
const renderItem = defineComponent({
  props: {
    conf: {
      type: Object,
      required: true,
    },
  },
  render() {
    return h(renderInstance(this.conf), {
      conf: this.conf,
    });
  },
});

export default renderItem;
