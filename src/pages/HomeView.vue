<script setup>
import Search from "@/components/Search.vue";
import TagCategory from "@/components/TagCategory.vue";
import NoteCard from "@/components/NoteCard.vue";
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useTitle, useDark } from "@vueuse/core";
import { useGetNote } from "@/services/noteApi";
import { useGetTag } from "@/services/tagApi";
import { useNoteStore } from "@/stores/noteStore";
import { storeToRefs } from "pinia";

const noteStore = useNoteStore();
const { notes: data, isLoading } = storeToRefs(noteStore);
const { getNotes, deleteNote } = noteStore;

// query to get notes by tag name
const selected = reactive({
  tag: null,
});

// query to get tags
const { data: tags, isLoading: isTagLoading, error: tagError } = useGetTag();

// query to get notes
// const { isLoading } = useGetNote(selected);

onMounted(async () => {
  await getNotes();
  console.log("this is data getNotes ");
});
console.log("loading : ", isLoading.value);

// handle click tag
const handleClickTag = async (tag) => {
  selected.tag = tag;
};
/* 
 this is for check if dark mode or not,
 then say good morning or good evening base on that
*/
const isDark = useDark();
const title = useTitle("Home");
title.value = isDark.value
  ? `'🌙 Good evening : ${title.value}`
  : "☀️ Good morning " + title.value;

const dataLimit = ref(4);

const searchData = ref([]);
const search = ref("");
const limitedData = computed(() => {
  return data?.value?.reverse().slice(0, dataLimit.value);
});

/**
 * Handles the search input to filter notes based on the search query.
 * Updates the searchData with notes whose titles include the input value.
 *
 * @param {Event} event - The input event containing the search query.
 */

const handleSearch = (event) => {
  search.value = event.target.value.toLowerCase();
  searchData.value = data.value.filter((note) =>
    note.title.toLowerCase().includes(search.value)
  );
};
</script>
<template>
  <!-- Hero Section and Search bar-->
  <Search :handleSearch="handleSearch" />

  <!-- if note is laoding -->
  <div v-if="isLoading" class="flex justify-center items-center h-full">
    Loading...
  </div>
  <!-- Notes -->
  <div
    v-else-if="data?.length == 0"
    class="flex justify-center items-center h-full"
  >
    No Notes
  </div>

  <section v-else-if="search != ''" class="grid sm:grid-cols-2 gap-2">
    <NoteCard v-for="note in searchData" :key="note.id" :note="note" />
  </section>
  <section v-else-if="data.length > 0" class="grid sm:grid-cols-2 gap-2">
    <NoteCard v-for="note in limitedData" :key="note.id" :note="note" />
  </section>
  <div
    v-if="data?.length > dataLimit && !isLoading"
    class="flex justify-center w-full"
  >
    <button
      @click="dataLimit += 4"
      class="bg-[#6c63ff] cursor-pointer text-white px-4 py-2 rounded-full hover:bg-[#6c63ff]/90 transition duration-300 ease-in-out"
    >
      more
    </button>
  </div>
</template>
