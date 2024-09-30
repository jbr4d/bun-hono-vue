<script setup lang="ts">
import { useRoute } from 'vue-router/auto';
const route = useRoute('/[...path]')
</script>

<template>
    <div>
        <h1>404 Not Found:</h1>
        <p>{{  route.params.path }}</p>
    </div>
</template>