<script setup>
import { useRouter } from "vue-router";
import { useDateFormat, useNow } from "@vueuse/core";
import { computed } from "vue";

const router = useRouter();

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// convert firestore timestamp to readable date
const formattedDate = (timestamp) => {
  if (!timestamp) return "No date";
  const date = timestamp.toDate();
  return useDateFormat(date, "YYYY-MM-DD HH:mm:ss").value;
};

const date = computed(() => {
  return formattedDate(props.note.date);
});
</script>
<template>
  <div
    class="bg-[#6c63ff]/10 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer hover:bg-[#6c63ff]/20 hover:scale-110 transition duration-300 ease-in-out"
    @click="router.push(`/notes/${note.id}`)"
  >
    <!-- tag -->
    <div>
      <span
        class="text-sm bg-[#6c63ff]/25 text-[black]/60 px-4 lowercase py-1 rounded-full"
      >
        {{ note.tag }}
      </span>
    </div>
    <!-- title -->
    <h1 class="text-xl font-semibold">{{ note.title }}</h1>
    <!-- content -->
    <p class="line-clamp-2">
      {{ note.content }}
    </p>
    <!-- date -->
    <div class="flex justify-end">
      <span class="text-sm text-[#6c63ff]/60"> {{ date }}</span>
    </div>
  </div>
</template>
