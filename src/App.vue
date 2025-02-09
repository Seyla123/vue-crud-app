<script setup>
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import TagCategory from "@/components/TagCategory.vue";
import NoteCard from "@/components/NoteCard.vue";
</script>
<template>
  <main class="max-w-7xl mx-auto p-4 space-y-4 font-poppins">
    <!-- Header -->
    <Header />
    <!-- Hero Section and Search bar-->
    <Search />
    <!-- Recently Notes -->
    <TagCategory />
    <!-- Notes -->
    <section class="grid sm:grid-cols-2 gap-2 ">
      <NoteCard title="This is my day" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." tag="Math" date="07 June 2024"/>
      <NoteCard title="This is my day" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." tag="Math" date="07 June 2024"/>
      <NoteCard title="This is my day" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." tag="Math" date="07 June 2024"/>
      <NoteCard title="This is my day" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." tag="Math" date="07 June 2024"/>
    </section>
  </main>
</template>
