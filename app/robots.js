export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-five-black-83.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
