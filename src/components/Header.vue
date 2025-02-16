<script setup>
import { Plus } from "lucide-vue-next";
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
    <RouterLink to="/test">
      <button class="bg-[#6c63ff] rounded-full p-2 cursor-pointer">
        <Plus size="24" color="#fff" />
      </button>
    </RouterLink>
  </nav>
</template>
