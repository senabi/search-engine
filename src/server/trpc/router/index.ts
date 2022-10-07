// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { queryRouter } from "./query";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  query: queryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
