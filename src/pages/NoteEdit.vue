<script setup>
import axios from "axios";
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const note = ref({
  title: "",
  content: "",
  tag: "",
  date: "",
});

const isLoading = ref(true);
const isError = ref(false);
const error = ref("");
const handleSubmit = async () => {
  try {
    const response = await axios.put("http://localhost:8000/notes/" + id, {
      title: note.value.title,
      content: note.value.content,
      tag: note.value.tag,
      date: note.value.date,
    });
    router.push("/notes/" + id);
  } catch (err) {
    console.log(err);
  }
};
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/notes/" + id);
    note.value = response.data;
  } catch (err) {
    isError.value = true;
    error.value = err?.message;
    console.log(err);
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
    <form @submit.prevent="handleSubmit" v-else action="" class="space-y-4">
      <div class="flex flex-col">
        <label for="title" class="text-sm font-semibold">Title</label>
        <input
          type="text"
          placeholder="Title"
          v-model="note.title"
          class="border-1 p-2 rounded-lg focus:outline-none"
        />
      </div>
      <div class="flex flex-col">
        <label for="content" class="text-sm font-semibold">Content</label>
        <textarea
          placeholder="Content"
          class="border-1 p-2 rounded-lg focus:outline-none"
          rows="5"
          v-model="note.content"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <label for="tag" class="text-sm font-semibold">Tag</label>
        <input
          type="text"
          placeholder="Tag"
          class="border-1 p-2 rounded-lg focus:outline-none"
          v-model="note.tag"
        />
      </div>
      <div class="flex flex-col">
        <label for="date" class="text-sm font-semibold">Date</label>
        <input
          type="date"
          class="border-1 p-2 rounded-lg focus:outline-none"
          v-model="note.date"
        />
      </div>
      <button
        type="submit"
        class="bg-[#6c63ff] text-white px-4 py-2 rounded-lg hover:bg-[#6c63ff]/90 transition duration-300 ease-in-out"
      >
        Update
      </button>
    </form>
  </div>
</template>
