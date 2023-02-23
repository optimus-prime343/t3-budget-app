import { Button, NumberInput, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { type BudgetFormData, BudgetSchema } from '~/schemas/budget-schema'

export function BudgetForm() {
  const form = useForm<BudgetFormData>({
    initialValues: {
      title: '',
      maxSpending: 0,
    },
    validate: zodResolver(BudgetSchema),
  })
  const handleSubmit = (values: BudgetFormData) => {
    console.log(values)
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label='Title'
          placeholder='Enter budget title'
          withAsterisk
          {...form.getInputProps('title')}
        />
        <NumberInput
          label='Maximum spending'
          placeholder='Enter max spending amount'
          withAsterisk
          {...form.getInputProps('maxSpending')}
        />
        <Button disabled={!form.isValid()} type='submit'>
          Add Budget
        </Button>
      </Stack>
    </form>
  )
}
