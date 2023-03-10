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
  read: protectedProcedure.query(async ({ ctx }) => {
    const budgets = await ctx.prisma.budget.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    })
    return budgets
  }),
  getTotalBudget: protectedProcedure.query(async ({ ctx }) => {
    const budgetAggregation = await ctx.prisma.budget.aggregate({
      where: {
        userId: ctx.session.user.id,
      },
      _sum: {
        maxSpending: true,
      },
    })
    return budgetAggregation._sum.maxSpending ?? 0
  }),
})
