<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import Header from "@/components/Header.vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLoading,user,isAuthenticated } = storeToRefs(authStore);
onMounted(() => {
  authStore.init();
});

console.log('this is app : ', user );
console.log('this is app : ', isAuthenticated );


</script>
<template>
  <main class="max-w-7xl mx-auto p-4 space-y-4 font-poppins">
    <!-- Header -->
    <Header />
    <!-- Hero Section and Search bar-->
    <div
      v-if="isLoading"
      class="flex justify-center items-center h-full"
    >
      App Loading...
    </div>
    <RouterView v-else />
  </main>
</template>
