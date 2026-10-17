import { localBlogs } from "@/utils/data/local-blogs";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-five-black-83.vercel.app";

  const pages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [
    ...pages,
    ...localBlogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
