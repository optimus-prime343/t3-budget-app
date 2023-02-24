import { Button, NumberInput, Select, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import { type ExpenseFormData, ExpenseSchema } from '~/schemas/expense-schema'
import { api } from '~/utils/api'

export type ExpenseFormProps = {
  budgetId?: string
}
export function ExpenseForm({ budgetId }: ExpenseFormProps) {
  const { data: budgets } = api.budget.read.useQuery()
  const createExpense = api.expense.create.useMutation()

  const form = useForm<ExpenseFormData>({
    initialValues: {
      title: '',
      amount: 0,
      budgetId: budgetId ?? '',
    },
    validate: zodResolver(ExpenseSchema),
  })
  const selectBudetData =
    budgets !== undefined
      ? budgets.map(budget => ({ label: budget.title, value: budget.id }))
      : []

  const handleSubmit = (values: ExpenseFormData) => {
    createExpense.mutate(values, {
      onSuccess: () => {
        showNotification({
          title: 'Expense added',
          message: 'Expense has been added successfully',
        })
        form.reset()
      },
      onError: error => {
        showNotification({
          title: 'Error',
          message: error.message ?? 'Something went wrong',
        })
      },
      onSettled: () => closeAllModals(),
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label='Title'
          placeholder='Enter expense title'
          withAsterisk
          {...form.getInputProps('title')}
        />
        <NumberInput
          label='Amount'
          placeholder='Enter spending amount'
          withAsterisk
          {...form.getInputProps('amount')}
        />
        {budgetId === undefined ? (
          <Select
            data={selectBudetData}
            label='Budget category'
            placeholder='Select budget category'
            withAsterisk
            {...form.getInputProps('budgetId')}
          />
        ) : null}
        <Button
          disabled={!form.isValid()}
          loading={createExpense.isLoading}
          type='submit'
        >
          Add Expense
        </Button>
      </Stack>
    </form>
  )
}
