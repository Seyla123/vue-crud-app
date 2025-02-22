<script setup>
import Tag from "@/components/Tag.vue";
defineProps({
  handleClickTag: Function,
  selectedTag: String,
  tags: Array,
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: String,
});
</script>
<template>
  <p v-if="isLoading">Loading...</p>

  <p v-else-if="error">Error: {{ error }}></p>
  <section v-else class="flex gap-2">
    <Tag
      v-for="tag in tags"
      :key="tag.id"
      :tag="tag.name"
      :isActive="selectedTag === tag.name"
      @click="handleClickTag(tag.name)"
    />
    <Tag
      :tag="'All'"
      :isActive="selectedTag === ''"
      @click="handleClickTag('')"
    />
  </section>
</template>
