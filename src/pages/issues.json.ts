import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function get(context: APIContext) {
  const issues = await getCollection("issues", (issue) => !issue.data.draft);

  return {
    body: JSON.stringify({
      issues: issues
        .sort((a, b) => b.data.number - a.data.number)
        .map((issue) => ({
          number: issue.data.number,
          slug: issue.slug,
          url: new URL(`/issues/${issue.slug}`, context.site),
          image: issue.data.image?.startsWith("/")
            ? new URL(issue.data.image, context.site)
            : issue.data.image,
          date: issue.data.date,
          description: issue.data.introduction,
        })),
    }),
  };
}
