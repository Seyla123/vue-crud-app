<script setup>
import Header from "@/components/Header.vue";
</script>
<template>
  <main class="max-w-7xl mx-auto p-4 space-y-4 font-poppins">
    <!-- Header -->
    <Header />
    <!-- Hero Section and Search bar-->
    <RouterView />
  </main>
</template>
