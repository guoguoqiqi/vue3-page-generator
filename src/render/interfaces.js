import button from "./button/render";
import input from "./input/render";
import flexContainer from "./flexContainer/render";

const templates = {
  "a-button": button,
  "a-input": input,
  "flex-container": flexContainer,
};
export default function (conf) {
  return templates[conf.tag](conf);
}
