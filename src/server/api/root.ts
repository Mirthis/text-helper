import { createTRPCRouter } from "./trpc";
import { aiBotRouter } from "./routers/aibot";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  aibot: aiBotRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
