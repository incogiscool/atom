import { MetadataRoute } from "next";
import { generateSitemap } from "atom-nextjs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const routes = await generateSitemap(
  //   process.env.ATOM_PROJECT_KEY!,
  //   "https://atomcms.vercel.app/blog"
  // );

  return [
    {
      url: "https://atomcms.vercel.app",
      lastModified: new Date(),
      priority: 0.7,
    },
    // ...routes,
  ];
}
