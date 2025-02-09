<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>
<template>
    Notes View {{ route.params.id }}
</template>