import { z } from 'zod'

import { ExpenseSchema } from '~/schemas/expense-schema'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, amount, budgetId } = input
      const expense = await ctx.prisma.expense.create({
        data: {
          title,
          amount,
          budgetId,
        },
      })
      return expense
    }),
  read: protectedProcedure
    .input(z.object({ budgetId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { budgetId } = input
      const expenses = await ctx.prisma.expense.findMany({
        where: {
          Budget: {
            id: budgetId,
            userId: ctx.session.user.id,
          },
        },
      })
      return expenses
    }),
})
