<script setup>
import { Search, Mic } from "lucide-vue-next";
</script>
<template>
  <section class="flex items-center text-gray-600 justify-between text-center px-6 py-4 bg-[#6c63ff]/5 rounded-full">
    <!-- search icon -->
      <Search size="24" />
      <input class="w-full px-2 text-lg placeholder:opacity-50 focus:outline-none focus:ring-0" placeholder="Search"/>
    <!-- voice icon -->
    <Mic size="24" />
  </section>
</template>
