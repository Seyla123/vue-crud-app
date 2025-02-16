<script setup>
import { useGetNote } from "@/services/noteApi";
import { useNoteStore } from "@/stores/noteStore";
import { watch } from "vue";
const { data: notes, isFetching, error, isSuccess } = useGetNote();
const noteStore = useNoteStore();

watch(
  notes,
  (newNote) => {
    if (newNote) {
      noteStore.setNote(newNote);
    }
  },
  { immediate: true }
);

console.log("this note data :", noteStore.note);
console.log("this note State :", noteStore);
</script>

<template>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div v-for="note in noteStore.note" :key="note.id">
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
    </div>
  </div>
</template>
