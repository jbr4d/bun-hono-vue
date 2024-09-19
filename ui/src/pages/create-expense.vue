<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input'

const form = useForm({
  defaultValues: {
    title: '',
    amount: 0
  },
  onSubmit: async ({ value }) => {
    // Do something with form data
    console.log(value)
  },
})

</script>

<template>
    <div class="py-4">Create an Expense</div>

    <div>
    <form @submit="
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }
    "
    class="space-y-2">
      <div>
        <form.Field name="title">
          <template v-slot="{ field }">
            <label :for="field.name">Title:</label>
            <Input
              :name="field.name"
              :value="field.state.value"
              :placeholder="field.name"
              @blur="field.handleBlur"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </template>
        </form.Field>
      </div>
      <div>
        <form.Field name="amount"
        :validators="{
            onChange: ({ value }) => value < 200 ? 'Must be more than 200' : undefined,
        }">
          <template v-slot="{ field }">
            <label :for="field.name">Amount:</label>
            <Input
              :name="field.name"
              :value="field.state.value"
              @blur="field.handleBlur"
              @input="(e) => field.handleChange(e.target.value)"
            />
            <em role="alert" v-if="field.state.meta.errors">{{ field.state.meta.errors.join(', ') }}</em>
          </template>
        </form.Field>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  </div>
</template>