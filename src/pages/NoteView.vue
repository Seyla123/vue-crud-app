<script setup>
import { useDeleteNote, useGetNoteById } from "@/services/noteApi";
import { useTitle } from "@vueuse/core";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "lucide-vue-next";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// page title
useTitle("Note Detail");

const route = useRoute();
const router = useRouter();

// get note id from route parameter
const id = route.params.id;

// note detail state
const note = ref({});

// query to get note by id
const { data, isLoading } = useGetNoteById(id);

/*
  watch note data loaded from query,
  then set to note state
 */
watch(
  data,
  (newData) => {
    if (newData) {
      note.value = newData;
    }
  },
  { immediate: true }
);

// mutate to delete note
const { mutate: deleteNote, isError, error } = useDeleteNote();
//delete note
const handleDelete = () => {
  deleteNote(id, {
    onSuccess: () => {
      router.push("/");
    },
    onError: (err) => {
      console.error("Error deleting note:", err);
    },
  });
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
      <!-- note actions -->
      <div class="flex items-center space-x-2">
        <!-- go to edit -->
        <RouterLink
          :to="`/notes/${note.id}/edit`"
          class="text-gray-600 hover:text-gray-900"
        >
          <PencilIcon class="w-6 h-6" />
        </RouterLink>

        <!-- delete -->
        <button
          type="button"
          class="text-gray-600 cursor-pointer hover:text-gray-900"
          @click="handleDelete"
        >
          <TrashIcon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- loading -->
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      Loading...
    </div>

    <!-- error or not found-->
    <div
      v-else-if="isError"
      class="flex justify-center flex-col items-center h-full"
    >
      <p class="text-gray-600 text-2xl">Note not found.</p>
      <p class="text-gray-600">Erorr : {{ error }}</p>
    </div>

    <!-- note detail -->
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
