// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

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
    })

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
};

async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {
            blogs.map((blog, i) => (
              blog?.cover_image &&
              <BlogCard blog={blog} key={i} />
            ))
          }
        </div>
      ) : (
        <p className="text-center text-gray-300">
          No blog posts are connected yet. Please check back later.
        </p>
      )}
    </div>
  );
};

export default BlogPage;
