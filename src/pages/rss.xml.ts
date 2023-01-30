import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function get(context: APIContext) {
  const issues = await getCollection("issues");
  return rss({
    title: "Сова рассылает новости",
    description:
      "Email-рассылка с подборками статей, новостей и инструментов для web-разработчиков",
    site: context.site!.toString(),
    items: issues
      .sort((a, b) => b.data.number - a.data.number)
      .filter((issue) => !issue.data.draft)
      .map((issue) => ({
        title: `Сова рассылает выпуск #${issue.data.number}`,
        pubDate: new Date(issue.data.date.setHours(11, 0, 0, 0)),
        description: issue.data.introduction,
        link: `/issues/${issue.slug}`,
      })),
  });
}
