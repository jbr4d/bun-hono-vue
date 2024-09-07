<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './ui/button';

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <Button type="button" @click="count++">Up</Button>
    <Button type="button" @click="count--">Down</Button>
    {{  count }}
  </div>
</template>
