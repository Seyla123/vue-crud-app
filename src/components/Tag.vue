<script setup>
defineProps({
  tag: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    :class="[
      isActive ? 'bg-[#6c63ff] text-white ' : 'bg-gray-100 hover:bg-[#6c63ff]/50 hover:text-white',
      ['text-gray-500 px-4 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out'],
    ]"
  >
    {{ tag }}
  </button>
</template>
