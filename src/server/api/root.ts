import { budgetRouter } from '~/server/api/routers/budget'
import { exampleRouter } from '~/server/api/routers/example'
import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  budget: budgetRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
