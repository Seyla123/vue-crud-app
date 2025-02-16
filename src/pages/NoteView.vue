<script setup>
import { useTitle } from "@vueuse/core";
import axios from "axios";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const title = useTitle("Note Detail");

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const id = route.params.id;
const note = ref({});
const isError = ref(false);
const error = ref("");
const handleDelete = async () => {
  try {
    await axios.delete("http://localhost:8000/notes/" + id);
    router.push("/");
  } catch (err) {
    isError.value = true;
    error.value = err?.message;
  }
};
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/notes/" + id);
    note.value = response.data;
  } catch (err) {
    isError.value = true;
    error.value = err?.message;
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <RouterLink to="/" class="text-gray-600 hover:text-gray-900">
        <span class="flex items-center space-x-2">
          <ArrowLeftIcon class="w-6 h-6" />
          <span>Back</span>
        </span>
      </RouterLink>

      <div class="flex items-center space-x-2">
        <RouterLink
          :to="`/notes/${note.id}/edit`"
          class="text-gray-600 hover:text-gray-900"
        >
          <PencilIcon class="w-6 h-6" />
        </RouterLink>
        <button
          type="button"
          class="text-gray-600 cursor-pointer hover:text-gray-900"
          @click="handleDelete"
        >
          <TrashIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      Loading...
    </div>
    <div
      v-else-if="isError"
      class="flex justify-center flex-col items-center h-full"
    >
      <p class="text-gray-600 text-2xl">Note not found.</p>
      <p class="text-gray-600">Erorr : {{ error }}</p>
    </div>
    <div v-else class="space-y-2">
      <h1 class="text-3xl font-semibold">{{ note.title }}</h1>
      <p class="text-gray-600">{{ note.content }}</p>
      <p class="text-gray-600">
        <span class="font-semibold">Tag:</span> {{ note.tag }}
      </p>
      <p class="text-gray-600">
        <span class="font-semibold">Date:</span> {{ note.date }}
      </p>
    </div>
  </div>
</template>
