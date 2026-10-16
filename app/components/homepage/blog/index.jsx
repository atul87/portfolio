// @flow strict
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';
import BlogCard from './blog-card';

function Blog({ blogs = [] }) {
  return (
    <div id="blogs" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[120px] h-[120px] bg-violet-600/20 rounded-full absolute top-6 left-[40%] translate-x-1/2 filter blur-3xl opacity-30 pointer-events-none"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md font-semibold tracking-wide flex items-center gap-2">
            <MdArticle className="text-violet-400" size={22} />
            Articles & Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <p className="text-sm md:text-base text-gray-400">
          Reflections on applied AI/ML research, civic-tech product design, algorithmic resilience, and software engineering.
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.slice(0, 6).map((blog, i) => (
            <BlogCard blog={blog} key={blog.slug || blog.id || i} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-10">
          No articles are available yet. Explore the projects above for the latest work.
        </p>
      )}

      {blogs.length > 0 && (
        <div className="flex justify-center mt-10 lg:mt-14">
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-900/30 focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none"
            role="button"
            href="/blog"
          >
            <span>Explore All Articles</span>
            <FaArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Blog;
