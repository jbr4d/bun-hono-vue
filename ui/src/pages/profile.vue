<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

import { userQueryOptions } from '@/lib/api';


defineProps<{ msg: string }>()

const { isLoading, isError, data, error } = useQuery(userQueryOptions)

</script>

<template>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">{{ `An error has ocurred: ${error?.message}` }}></span>

    <p>Hello {{  data?.user.given_name }}</p>
</template>