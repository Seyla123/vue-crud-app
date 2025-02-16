<script setup>
import { defineProps, defineEmits, computed } from "vue";

defineEmits(["submit", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  btnTitle:{
    type: String,
    default: "Create",
  }
});
const note = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

</script>
<template>
  <form @submit.prevent="$emit('submit')" action="" class="space-y-4">
    <div class="flex flex-col">
      <label for="title" class="text-sm font-semibold">Title</label>
      <input
        type="text"
        placeholder="Title"
        v-model="note.title"
        class="border-1 p-2 rounded-lg focus:outline-none"
      />
    </div>
    <div class="flex flex-col">
      <label for="content" class="text-sm font-semibold">Content</label>
      <textarea
        placeholder="Content"
        class="border-1 p-2 rounded-lg focus:outline-none"
        rows="5"
        v-model="note.content"
      ></textarea>
    </div>
    <div class="flex flex-col">
      <label for="tag" class="text-sm font-semibold">Tag</label>
      <input
        type="text"
        placeholder="Tag"
        class="border-1 p-2 rounded-lg focus:outline-none"
        v-model="note.tag"
      />
    </div>
    <div class="flex flex-col">
      <label for="date" class="text-sm font-semibold">Date</label>
      <input
        type="date"
        class="border-1 p-2 rounded-lg focus:outline-none"
        v-model="note.date"
      />
    </div>
    <button
      type="submit"
      class="bg-[#6c63ff] text-white px-4 py-2 rounded-lg hover:bg-[#6c63ff]/90 transition duration-300 ease-in-out"
    >
      {{ btnTitle }}
    </button>
  </form>
</template>
