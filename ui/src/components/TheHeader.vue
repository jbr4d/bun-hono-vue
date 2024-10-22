<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { userData } = storeToRefs(userStore)
</script>

<template>
  <header class="flex flex-row justify-between p-4">
    <nav class="flex space-x-4">
      <RouterLink icon-btn to="/"> Home </RouterLink>

      <RouterLink icon-btn to="/about"> About </RouterLink>

      <RouterLink icon-btn to="/expenses"> Expenses </RouterLink>

      <RouterLink icon-btn to="/create-expense"> Create Expense </RouterLink>

      <RouterLink icon-btn to="/profile"> Profile </RouterLink>
    </nav>
    {{ userData?.given_name }}
  </header>
</template>
