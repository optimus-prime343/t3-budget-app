import { Button, NumberInput, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import { type BudgetFormData, BudgetSchema } from '~/schemas/budget-schema'
import { api } from '~/utils/api'

export function BudgetForm() {
  const utils = api.useContext()
  const createBudget = api.budget.create.useMutation()
  const form = useForm<BudgetFormData>({
    initialValues: {
      title: '',
      maxSpending: 0,
    },
    validate: zodResolver(BudgetSchema),
  })
  const handleSubmit = (values: BudgetFormData) => {
    createBudget.mutate(values, {
      onSuccess: async () => {
        await utils.budget.read.invalidate()
        form.reset()
      },
      onError: error => {
        showNotification({ message: error.message, color: 'red' })
      },
      onSettled: () => closeAllModals(),
    })
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
        <Button
          disabled={!form.isValid()}
          loading={createBudget.isLoading}
          type='submit'
        >
          Add Budget
        </Button>
      </Stack>
    </form>
  )
}
