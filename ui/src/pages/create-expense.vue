<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { useRouter } from 'vue-router/auto'
import { zodValidator } from '@tanstack/zod-form-adapter'

import { createExpenseSchema } from '@server/sharedTypes';

const router = useRouter()


const form = useForm({
  defaultValues: {
    title: '',
    amount: '0.00'
  },
  onSubmit: async ({ value }) => {
    // Do something with form data
    const res = await api.expenses.$post({ json: value })
    if (!res.ok) {
      throw new Error('server error')
    }
    router.push('/')
  },
  validatorAdapter: zodValidator,
})

</script>

<template>

  <div class="max-w-md mx-auto">
    <form @submit="(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }
      " class="space-y-2">
      <div>
        <form.Field name="title" :validators="{
          onChange: createExpenseSchema.shape.title
        }">
          <template v-slot="{ field }">
            <label :for="field.name">Title:</label>
            <Input :name="field.name" :value="field.state.value" @blur="field.handleBlur"
              @input="(e: any) => field.handleChange((e.target as HTMLInputElement).value)" />
          </template>
        </form.Field>
      </div>
      <div>
        <form.Field name="amount" :validators="{
          onChange: createExpenseSchema.shape.amount
        }">
          <template v-slot="{ field }">
            <label :for="field.name">Amount:</label>
            <Input :name="field.name" :value="field.state.value" @blur="field.handleBlur" @input="(e: any) => field.handleChange((e.target as HTMLInputElement).value)
              " />
            <em role="alert" v-if="field.state.meta.errors">{{ field.state.meta.errors.join(', ') }}</em>
          </template>
        </form.Field>
      </div>
      <form.Subscribe>
        <template v-slot="{ canSubmit, isSubmitting }">
          <Button type="submit" :disabled="!canSubmit">{{ isSubmitting ? '...' : 'Submit' }}</Button>
        </template>
      </form.Subscribe>
    </form>
  </div>
</template>