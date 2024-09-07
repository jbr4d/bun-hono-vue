<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

defineProps<{ msg: string }>()

const count = ref(0)

const totalSpent = ref(0)

</script>

<template>

  <Card class="w-96 mx-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>Total amount you've spent</CardDescription>
    </CardHeader>
    <CardContent>
      {{ totalSpent }}
    </CardContent>
  </Card>

  <h1>{{ msg }}</h1>

  <div class="card">
    <Button type="button" @click="count++">Up</Button>
    <Button type="button" @click="count--">Down</Button>
    {{ count }}
  </div>
</template>
