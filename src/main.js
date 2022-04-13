import { createApp } from "vue";
import App from "./App.vue";
import draggable from "vuedraggable";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "../src/style/home.scss";

const app = createApp(App);

app.component("vue-draggable", draggable);
app.use(Antd);
app.mount("#app");
