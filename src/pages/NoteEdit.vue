<script setup>
import axios from "axios";
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoteForm from "@/components/NoteForm.vue";

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

    <!-- loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      Loading...
    </div>

    <!-- error state -->
    <div
      v-else-if="isError"
      class="flex justify-center flex-col items-center h-full"
    >
      <p class="text-gray-600 text-2xl">Note not found.</p>
      <p class="text-gray-600">Erorr : {{ error }}</p>
    </div>

    <!-- note edit form -->
    <NoteForm v-else v-model="note" @submit="handleSubmit" />
  </div>
</template>
