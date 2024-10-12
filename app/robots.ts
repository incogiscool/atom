import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    host: "https://atomcms.vercel.app",
    sitemap: "https://atomcms.vercel.app/sitemap.xml",
  };
}
