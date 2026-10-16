// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";
import { localBlogs } from "@/utils/data/local-blogs";

export const metadata = {
  title: "Blog | Atul Portfolio",
  description: "Blog posts by Atul on AI/ML, web development, and data science.",
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
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {
            blogs.map((blog, i) => (
              <BlogCard blog={blog} key={blog.id || i} />
            ))
          }
        </div>
      ) : (
        <div className="text-center py-12 px-4 max-w-lg mx-auto">
          <p className="text-gray-300 text-base mb-2">
            No blog posts are connected yet. Please check back later.
          </p>
          <p className="text-sm text-gray-500">
            Explore the projects and open-source contributions on the homepage in the meantime.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
