<script setup>
import Tag from "@/components/Tag.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
defineProps({
  handleClickTag: Function,
  selectedTag: String,
});
const tags = ref([]);
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
      :key="tag.id"
      :tag="tag.name"
      :isActive="selectedTag === tag.name"
      @click="handleClickTag(tag.name)"
    />
  </section>
</template>
