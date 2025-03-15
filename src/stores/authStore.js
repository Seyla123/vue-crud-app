import { defineStore } from "pinia";
import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNoteStore } from "@/stores/noteStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: true,
    isLogging: false,
    isRegistering: false,
    isError: false,
    error: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    /**
     * Initialize the auth store by setting up an observer to the firebase auth state.
     * When the auth state changes, update the user state and initialize the note store.
     */
    init() {
      this.isLoading = true;
      const noteStores = useNoteStore();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = { id: user.uid, email: user.email };
          noteStores.init();
        } else {
          this.user = null;
        }
        this.isLoading = false;
      });
    },
    /**
     * Registers a new user to the firebase auth service.
     */
    async registerUser(credentials) {
      this.isRegistering = true;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        this.user = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
        };
        this.router.push("/");
      } catch (error) {
        this.isError = true;
        this.error = error.message;
      } finally {
        this.isRegistering = false;
      }
    },
    /**
     * Logs in an existing user to the firebase auth service.
     */
    async loginUser(credentials) {
      this.isLogging = true;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        this.user = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
        };
        this.router.push("/");
      } catch (error) {
        this.isError = true;
        this.error = error.message;
      } finally {
        this.isLogging = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        const noteStores = useNoteStore();
        this.user = null;
        noteStores.clearNotes();
        this.router.replace("/auth/signin");
      } catch (error) {
        console.log("error :", error);
        this.isError = true;
        this.error = error.message;
      }
    },
  },
});
