<script setup>
import { Search, Mic } from "lucide-vue-next";
</script>
<template>
  <section class="flex items-center text-gray-600 justify-between text-center px-6 py-4 bg-[#6c63ff]/10 rounded-full">
    <!-- search icon -->
    <div class="flex gap-1 items-center ">
      <Search size="24" />
      <span class="text-lg">Search</span>
    </div>
    <!-- voice icon -->
    <Mic size="24" />
  </section>
</template>
