import "@/assets/main.css";

import { createApp, markRaw } from "vue";
import App from "@/App.vue";
import router from "@/routes/routes";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const queryClient = new QueryClient();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
