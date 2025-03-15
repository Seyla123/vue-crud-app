import { createWebHistory, createRouter } from "vue-router";
import { auth } from "@/config/firebase";
import { useAuthStore } from "@/stores/authStore";

import HomeView from "@/pages/HomeView.vue";
import NoteView from "@/pages/NoteView.vue";
import NoteCreate from "@/pages/NoteCreate.vue";
import NoteEdit from "@/pages/NoteEdit.vue";
import TestView from "@/pages/TestView.vue";

// auth
import SignUpView from "@/pages/auth/SignUpView.vue";
import SignInView from "@/pages/auth/SignInView.vue";
import { storeToRefs } from "pinia";

const routes = [
  { path: "/", component: HomeView, meta: { requiresAuth: true } },
  { path: "/notes", component: NoteCreate, meta: { requiresAuth: true } },
  { path: "/notes/:id", component: NoteView, meta: { requiresAuth: true } },
  {
    path: "/notes/:id/edit",
    component: NoteEdit,
    meta: { requiresAuth: true },
  },
  { path: "/test", component: TestView },
  { path: "/auth/signup", component: SignUpView },
  { path: "/auth/signin", component: SignInView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Protected Routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authStore = useAuthStore();
  const { isAuthenticated } = authStore;

  console.log("this route : ", isAuthenticated);

  if (requiresAuth && !isAuthenticated) {
    next("/auth/signin"); // Redirect to signin if not authenticated
  } else {
    next(); // Allow navigation
  }
});
export default router;
