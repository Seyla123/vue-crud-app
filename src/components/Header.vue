<script setup>
import { useAuthStore } from "@/stores/authStore";
import { Plus } from "lucide-vue-next";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { logoutUser } = authStore;
const { user, isLoading,isAuthenticated } = storeToRefs(authStore);
</script>
<template>
  <nav class="flex justify-between items-center">
    <!-- My Notes -->
    <RouterLink to="/">
      <span class="text-3xl font-semibold text-[#6c63ff] cursor-pointer">
        Seyla Notes
      </span>
    </RouterLink>
    <!-- Add Note -->
    <button
      v-if="!isLoading && user?.email"
      @click="logoutUser"
      class="bg-[#6c63ff] text-white rounded-full px-4 p-2 cursor-pointer"
    >
      {{ user.email }}
      {{ isAuthenticated }}

      Signout
    </button>
    <RouterLink to="/notes">
      <button class="bg-[#6c63ff] rounded-full p-2 cursor-pointer">
        <Plus size="24" color="#fff" />
      </button>
    </RouterLink>
  </nav>
</template>
