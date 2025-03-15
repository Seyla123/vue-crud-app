<script setup>
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import NoteForm from "@/components/NoteForm.vue";
import { useTitle } from "@vueuse/core";
import { useNoteStore } from "@/stores/noteStore";
import { storeToRefs } from "pinia";
const router = useRouter();

// page title
useTitle("Create Note");

const noteStore = useNoteStore();
const { isCreating } = storeToRefs(noteStore);

// note create form state
const note = ref({
  title: "",
  content: "",
  tag: "",
});

// create note
const handleSubmit = async () => {
  try {
    // createNote(note.value);
    await noteStore.addNote(note.value);
    router.push("/");
  } catch (err) {
    console.log(err);
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

    <!-- note create form -->
    <NoteForm v-model="note" @submit="handleSubmit" :isLoading="isCreating" />
  </div>
</template>
