<script setup>
import Navbar from '@/components/Navbar.vue';
import HeroSection from '@/components/HeroSection.vue';
import RecentlyNotes from '@/components/RecentlyNotes.vue';
import NoteCard from '@/components/NoteCard.vue';
</script>
<template>
  <main>
  <!-- Navbar -->
  <Navbar />
  <!-- Hero Section and Search bar-->
  <HeroSection/>
  <!-- Recently Notes -->
  <RecentlyNotes/>
  <!-- Notes -->
  <NoteCard/>
  </main>
</template>