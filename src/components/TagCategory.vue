<script setup>
import Tag from '@/components/Tag.vue';
import { ref } from 'vue';

const tags = ["Khmer", "Math", "Kimi"];
const selectedTag = ref("");
const handleTagClick = (tag) => {
    selectedTag.value = tag;
}
</script>
<template>
    <section class="flex gap-2">
        <Tag v-for="tag in tags" :key="tag" :tag="tag" :isActive="selectedTag===tag" @click="handleTagClick(tag)"/>
    </section>
</template>