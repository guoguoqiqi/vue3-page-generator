import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuedraggable from "vuedraggable";

import "normalize.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/style/home.scss";

const app = createApp(App);

app.component("vue-draggable", vuedraggable);
app.use(createPinia());
app.use(Antd);
app.mount("#app");
