<script setup>
import axios from "axios";
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const note = ref({
  title: "",
  content: "",
  tag: "",
  date: "",
});
const isCreating = ref(false);
const error = ref("");

const handleSubmit = async () => {
  try {
    isCreating.value = true;
    const response = await axios.post("http://localhost:8000/notes/", {
      title: note.value.title,
      content: note.value.content,
      tag: note.value.tag,
      date: note.value.date,
    });
    router.push("/");
  } catch (err) {
    console.log(err);
    error.value = err?.message;
  }finally {
    isCreating.value = false;
  }
};
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
    <form @submit.prevent="handleSubmit"  action="" class="space-y-4">
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
        class="bg-[#6c63ff] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#6c63ff]/90 transition duration-300 ease-in-out"
      >
        {{isCreating ? "Creating..." : "Create"}}
      </button>
    </form>
  </div>
</template>
