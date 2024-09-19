<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
router.push('')

</script>
<template>
    about
    <button
        m="3 t6" text-sm btn
        @click="router.push('/')"
      >
        <!-- {{ t('button.back') }} -->
      </button>
</template>