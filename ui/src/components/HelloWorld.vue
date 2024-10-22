<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'

import { api } from '@/lib/api'

defineProps<{ msg: string }>()

async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get()
  if (!res.ok) {
    throw new Error('server error')
  }
  const data = await res.json()
  return data
}

const queryClient = useQueryClient()

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['get-total-spent'],
  queryFn: getTotalSpent,
})
</script>

<template>
  <Card class="w-96 mx-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>Total amount you've spent</CardDescription>
    </CardHeader>
    <CardContent>
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="isError"
        >{{ `An error has ocurred: ${error?.message}` }}></span
      >
      {{ data?.total }}
    </CardContent>
  </Card>

  <h1>{{ msg }}</h1>
</template>
