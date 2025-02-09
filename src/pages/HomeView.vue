<script setup>
import Search from "@/components/Search.vue";
import TagCategory from "@/components/TagCategory.vue";
import NoteCard from "@/components/NoteCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const isLoading = ref(true);
const data = ref([]);
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("http://localhost:8000/notes");
    data.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <!-- Hero Section and Search bar-->
  <Search />
  <!-- Recently Notes -->
  <TagCategory />
  <p v-if="isLoading">Loading...</p>
  <!-- Notes -->
  <section v-else-if="data.length > 0" class="grid sm:grid-cols-2 gap-2">
    <NoteCard
      v-for="note in data"
      :key="note.id"
      :note="note"
    />
  </section>
</template>
