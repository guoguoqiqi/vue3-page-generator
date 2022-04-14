export default function (conf) {
  const { _props } = conf;

  const attrs = [
    `:block="${_props.block}"`,
    `:danger="${_props.danger}"`,
    `:disabled="${_props.disabled}"`,
    `:ghost="${_props.ghost}"`,
    `:loading="${_props.loading}"`,
    _props.href ? `href="${_props.href}"` : "",
    _props.icon ? `icon="${_props.icon}"` : "",
    _props.shape ? `shape="${_props.shape}"` : "",
    _props.size ? `size="${_props.size}"` : "",
    _props.target ? `target="${_props.target}"` : "",
    _props.type ? `type="${_props.type}"` : "",
  ];

  attrs.push(`class="draggable-render-item"`);

  return {
    template: `
      <a-button ${attrs.join(" ")} @click.native.prevent="selectItem"
        :class="{'render-item-active': this.conf.id === this.activeId}"
      >${_props.text}</a-button>`,
  };
}
