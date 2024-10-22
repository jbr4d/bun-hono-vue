<script setup lang="ts">
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'

import { api } from '@/lib/api';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'


defineProps<{ msg: string }>()

async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error('server error')
  }
  const data = await res.json()
  return data
}

const queryClient = useQueryClient()

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
})
</script>

<template>

  <div class="max-w-3xl m-auto">
    <Table>
      <TableCaption>A list of all expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            ID
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead class="text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="isLoading">...</TableBody>
      <TableBody v-else>
        <TableRow v-for="expense in data?.expenses" :key="expense.id">
          <TableCell class="font-medium">
            {{ expense.id }}
          </TableCell>
          <TableCell>{{ expense.title }}</TableCell>
          <!-- <TableCell>{{ invoice.paymentMethod }}</TableCell> -->
          <TableCell class="text-right">
            {{ `$${expense.amount}` }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>