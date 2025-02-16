import "./assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/routes/routes";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { createPinia } from "pinia";

const pinia = createPinia();
const queryClient = new QueryClient();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
