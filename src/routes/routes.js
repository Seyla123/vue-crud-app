import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/pages/HomeView.vue";
import NoteView from "@/pages/NoteView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/notes/:id", component: NoteView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
