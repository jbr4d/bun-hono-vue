<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { api } from '@/lib/api';


defineProps<{ msg: string }>()

const count = ref(0)

const totalSpent = ref(0)

const url = ref('/api/expenses/total-spent')

const fetchTotal = async () => {
    const res = await api.expenses['total-spent'].$get()
    const data = await res.json()
    
    totalSpent.value = data.total
}


onMounted(() => {
  fetchTotal()
})

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
