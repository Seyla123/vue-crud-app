<script setup>
import axios from "axios";
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import NoteForm from "@/components/NoteForm.vue";
import { useTitle } from "@vueuse/core";

const title = useTitle("Create Note");
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
  } finally {
    isCreating.value = false;
  }
};

watch(
  () => ({ ...note.value }),
  (newNote) => {
    console.log("this is note :", newNote);
  }
);
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

    <!-- note create form -->
    <NoteForm v-model="note" @submit="handleSubmit" />
  </div>
</template>
