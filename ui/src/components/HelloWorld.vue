<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++" class="bg-secondary hover:bg-background">Up</button>
    <button type="button" @click="count--">Down</button>
    {{  count }}
  </div>
</template>
