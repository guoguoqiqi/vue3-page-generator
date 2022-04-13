import { createApp, defineComponent, h } from "vue";
import flexContainer from "./flexContainer/render";

/**
 * 获取组件属性类型 静态类型 or 动态类型
 * @param {*} conf
 * @param {*} attrName
 * @returns {boolean}
 */
const isStaticAttr = function (conf, attrName) {
  const { tag } = conf;

  if (tag === "a-button") {
    // Antd 按钮组件
    return ["href", "shape", "size", "target", "type"].includes(attrName);
  }

  if (tag === "a-input") {
    // Antd 输入框组件
    return [
      "addonAfter",
      "addonBefore",
      "defaultValue",
      "placeholder",
      "id",
      "prefix",
      "size",
      "suffix",
      "type",
    ].includes(attrName);
  }

  return true;
};

const renderInstance = function (conf) {
  const { tag, _props } = conf;
  const props = [];

  if (_props) {
    for (const prop of Object.keys(_props)) {
      const isStatic = isStaticAttr(conf, prop);
      if (!(_props[prop] === "")) {
        props.push(`${!isStatic ? ":" : ""}${prop}="${_props[prop]}"`);
      }
    }
  }
  console.log(tag, "渲染");
  console.log(`<${tag} ${props.join(" ")}>确认</${tag}>`);

  if (tag === "flex-container") {
    return flexContainer(conf);
  }

  // 创建组件实例
  const { _component } = createApp({
    template: `
      <div class="draggable-render-item">
        <${tag} ${props.join(" ")}>确认</${tag}>
      </div>`,
  });

  return _component;
};

/**
 * 单个控件渲染组件
 */
export default defineComponent({
  props: {
    conf: {
      type: Object,
      required: true,
    },
  },
  render() {
    return h(renderInstance(this.conf));
  },
});
