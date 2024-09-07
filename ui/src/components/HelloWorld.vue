<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

const url = ref('/api/expenses/total-spent')

const data = ref(null)
const error = ref(null)
const loading = ref(true)

const fetchData = async () => {
  try {
    loading.value = true
    const response = await fetch(url.value)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    data.value = await response.json()
    
    // assign totalSpent
    totalSpent.value = data.value.total

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  fetchData()
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
