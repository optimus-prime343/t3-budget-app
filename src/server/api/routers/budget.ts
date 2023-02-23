import { BudgetSchema } from '~/schemas/budget-schema'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const budgetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(BudgetSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, maxSpending } = input
      const budget = await ctx.prisma.budget.create({
        data: {
          title,
          maxSpending,
          userId: ctx.session.user.id,
        },
      })
      return budget
    }),
})
