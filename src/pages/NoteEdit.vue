<script setup>
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoteForm from "@/components/NoteForm.vue";
import { useTitle } from "@vueuse/core";
import { useUpdateNote, useGetNoteById } from "@/services/noteApi";
import { useNoteStore } from "@/stores/noteStore";
import { storeToRefs } from "pinia";

// page title
const title = useTitle("Edit Note");

const route = useRoute();
const router = useRouter();

// get note id from route parameter
const id = route.params.id;

// note update form state
const note = ref({
  title: "",
  content: "",
  tag: "",
});

// query to get note by id
const noteStore = useNoteStore();
const { note: data, isLoading, isError, error } = storeToRefs(noteStore);
const { getOneNote, updateNote } = noteStore;

// query to get note by id
onMounted(async () => {
  await getOneNote(id);
});

watch(
  data,
  (newData) => {
    if (newData?.date) {
      note.value = newData;
    }
  },
  { immediate: true }
);

// handle note update
const handleSubmit = async () => {
  try {
    updateNote(id, note.value);
    router.push("/");
  } catch (error) {
    console.log("this error : ", error);
  }
};
</script>
<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      
      <!-- go back -->
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
    <NoteForm v-else v-model="note" @submit="handleSubmit" btnTitle="Update" />
  </div>
</template>
