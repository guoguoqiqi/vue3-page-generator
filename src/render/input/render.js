export default function (conf) {
  const { _props } = conf;

  const attrs = [
    `:disabled="${_props.disabled}"`,
    `:maxlength="${_props.maxlength}"`,
    `:allowClear="${_props.allowClear}"`,
    _props.addonAfter ? `addonAfter="${_props.addonAfter}"` : "",
    _props.addonBefore ? `addonBefore="${_props.addonBefore}"` : "",
    _props.defaultValue ? `defaultValue="${_props.defaultValue}"` : "",
    _props.placeholder ? `placeholder="${_props.placeholder}"` : "",
    _props.prefix ? `prefix="${_props.prefix}"` : "",
    _props.size ? `size="${_props.size}"` : "",
    _props.suffix ? `suffix="${_props.suffix}"` : "",
    _props.type ? `type="${_props.type}"` : "",
  ];

  attrs.push(`class="draggable-render-item"`);

  return {
    template: `
      <a-input ${attrs.join(" ")} @click.native.prevent="selectItem"
        :class="{'render-item-active': this.conf.id === this.activeId}">
      </a-input>`,
  };
}
