// @flow strict

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { personalData } from "@/utils/data/personal-data";
import BlogListClient from "./blog-list-client";
import { localBlogs } from "@/utils/data/local-blogs";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-five-black-83.vercel.app";

export const metadata = {
  title: "Articles & Blog | Atul Portfolio",
  description: "Engineering reflections, applied AI/ML research notes, and software design essays by Atul.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Articles & Blog | Atul Portfolio",
    description: "Engineering reflections, applied AI/ML research notes, and software design essays by Atul.",
    url: `${siteUrl}/blog`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atul Portfolio Articles & Insights",
      },
    ],
  },
};

async function getBlogs() {
  if (!personalData.devUsername) {
    return [];
  }

  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data.filter((item) => Boolean(item?.cover_image)) : [];
  } catch {
    return [];
  }
};

async function BlogPage() {
  const remoteBlogs = await getBlogs();
  const blogs = [...localBlogs, ...remoteBlogs];

  return (
    <div className="py-8 lg:py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16f2b3] transition-colors hover:text-pink-400 focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none rounded-md px-2 py-1"
        >
          <FaArrowLeft size={12} />
          Back to Portfolio
        </Link>
      </div>

      <div className="flex justify-center my-4 lg:py-4">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-6 text-2xl font-bold rounded-md flex items-center gap-2">
            <MdArticle className="text-violet-400" size={26} />
            All Blogs & Articles
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <p className="text-sm md:text-base text-gray-300">
          In-depth technical writing covering federated learning, cyber defence, civic systems architecture, and competitive algorithm design.
        </p>
      </div>

      <BlogListClient initialBlogs={blogs} />
    </div>
  );
};

export default BlogPage;
