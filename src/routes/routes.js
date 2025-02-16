import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/pages/HomeView.vue";
import NoteView from "@/pages/NoteView.vue";
import NoteCreate from "@/pages/NoteCreate.vue";
import NoteEdit from "@/pages/NoteEdit.vue";
import TestView from "@/pages/TestView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/notes", component: NoteCreate },
  { path: "/notes/:id", component: NoteView },
  { path: "/notes/:id/edit", component: NoteEdit },
  { path: "/test", component: TestView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
