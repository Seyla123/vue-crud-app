<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const { isLogging: isLoading, isError, error } = storeToRefs(authStore);

const { loginUser } = authStore;

const router = useRouter();

const email = ref("");
const password = ref("");

const handleSignin = async () => {
  try {
    // Handle signup logic here
    console.log("Signing up with:", email.value, password.value);
    loginUser({ email: email.value, password: password.value });
    // You can add API calls or validation here
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
      <form @submit.prevent="handleSignin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6c63ff] focus:border-[#6c63ff]"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6c63ff] focus:border-[#6c63ff]"
            required
          />
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          class="bg-[#6c63ff] w-full text-white px-4 py-2 rounded-lg hover:bg-[#6c63ff]/90 transition duration-300 ease-in-out"
          :disabled="isLoading"
        >
          {{ isLoading ? "Signing In..." : "Sign In" }}
        </button>
      </form>
    </div>
  </div>
</template>
