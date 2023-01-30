import { z, defineCollection } from "astro:content";

export const collections = {
  issues: defineCollection({
    schema: z.object({
      draft: z.boolean().optional(),
      number: z.number(),
      introduction: z.string(),
      date: z.date(),
      image: z.string().optional(),
    }),
  }),
};
