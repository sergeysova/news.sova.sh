import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function get(context: APIContext) {
  const issues = await getCollection("issues");

  return {
    body: JSON.stringify({
      issues: issues
        .sort((a, b) => b.data.number - a.data.number)
        .filter((issue) => !issue.data.draft)
        .map((issue) => ({
          number: issue.data.number,
          slug: issue.slug,
          url: new URL(`/issues/${issue.slug}`, context.site),
          image: issue.data.image,
          date: issue.data.date,
          description: issue.data.introduction,
        })),
    }),
  };
}
