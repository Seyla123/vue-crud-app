<script setup>
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import RecentlyNotes from '@/components/RecentlyNotes.vue';
import NoteCard from '@/components/NoteCard.vue';
</script>
<template>
  <main class="max-w-7xl mx-auto p-4 font-poppins">
  <!-- Header -->
  <Header />
  <!-- Hero Section and Search bar-->
  <Search/>
  <!-- Recently Notes -->
  <RecentlyNotes/>
  <!-- Notes -->
  <NoteCard/>
  </main>
</template>