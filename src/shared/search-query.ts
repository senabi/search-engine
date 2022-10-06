import { z } from "zod";

export const searchQueryValidator = z.object({
  query: z.string().min(1),
});
export type SearchQueryType = z.infer<typeof searchQueryValidator>;
