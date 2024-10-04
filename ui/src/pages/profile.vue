<script setup lang="ts">
import { useCurrentUser } from '@/composables/useUser';


defineProps<{ msg: string }>()

const { isLoading, isError, data, error } = useCurrentUser()

</script>

<template>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">{{ `An error has ocurred: ${error?.message}` }}</span>

    <p v-else>Hello {{ data?.user.given_name }}</p>
</template>