<script setup>
import { Plus } from 'lucide-vue-next';
</script>
<template>
    <nav class="flex justify-between items-center">
        <!-- My Notes -->
        <h1 class="text-3xl font-semibold text-[#6c63ff]">
            Seyla Notes
        </h1>
        <!-- Add Note -->
        <button class="bg-[#6c63ff] rounded-full p-2">
            <Plus size="24" color="#fff"/>
        </button>
    </nav>
</template>