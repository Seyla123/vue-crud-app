<script setup>
import Search from "@/components/Search.vue";
import TagCategory from "@/components/TagCategory.vue";
import NoteCard from "@/components/NoteCard.vue";
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { useTitle, useDark } from "@vueuse/core";

const isDark = useDark();
const title = useTitle("Home");

title.value = isDark.value
  ? `🌙 Good evening : ${title.value}`
  : "☀️ Good morning " + title.value;

const isLoading = ref(true);
const data = ref([]);
const dataLimit = ref(4);
const selectedTag = ref("");

const searchData = ref([]);
const search = ref("");
const limitedData = computed(() => {
  return data.value.slice(0, dataLimit.value);
});

const handleSearch = (event) => {
  search.value = event.target.value.toLowerCase();
  searchData.value = data.value.filter((note) =>
    note.title.toLowerCase().includes(search.value)
  );
};
const handleClickTag = async (tag) => {
  try {
    isLoading.value = true;
    selectedTag.value = tag;
    const response = await axios.get("http://localhost:8000/notes?tag=" + tag);
    data.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/notes");
    data.value = response.data.reverse();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <!-- Hero Section and Search bar-->
  <Search :handleSearch="handleSearch" />
  <!-- Recently Notes -->
  <TagCategory :handleClickTag="handleClickTag" :selectedTag="selectedTag" />
  <div v-if="isLoading" class="flex justify-center items-center h-full">
    Loading...
  </div>
  <!-- Notes -->
  <div
    v-else-if="data.length == 0"
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
    v-if="data.length > dataLimit && !isLoading"
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
