<script setup>
defineProps({
  title: String,
  content: String,
  date: String,
  tag: String,
});
</script>
<template>
  <div
    class="bg-[#6c63ff]/10 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer hover:bg-[#6c63ff]/20 hover:scale-110 transition duration-300 ease-in-out"
  >
    <!-- tag -->
    <div>
      <span
        class="text-sm bg-[#6c63ff]/25 text-[black]/60 px-4 lowercase py-1 rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    <!-- title -->
    <h1 class="text-xl font-semibold">{{ title }}</h1>
    <!-- content -->
    <p class="line-clamp-2">
    <p class=""></p>
      {{ content }}
    </p>
    <!-- date -->
    <div class="flex justify-end">
      <span class="text-sm text-[#6c63ff]/60"> {{ date }}</span>
    </div>
  </div>
</template>
