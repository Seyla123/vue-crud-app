<script setup>
import Tag from "@/components/Tag.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const tags = ref([]);
const selectedTag = ref("");
const handleTagClick = (tag) => {
  selectedTag.value = tag;
};
const isLoading = ref(true);
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/tags");
    tags.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <p v-if="isLoading">Loading...</p>
  <section v-else class="flex gap-2">
    <Tag
      v-for="tag in tags"
      :key="tag"
      :tag="tag.name"
      :isActive="selectedTag === tag.id"
      @click="handleTagClick(tag.id)"
    />
  </section>
</template>
