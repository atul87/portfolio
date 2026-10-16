"use client";

import { useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import BlogCard from "../components/homepage/blog/blog-card";

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "security", label: "AI & Cyber Defence", iconType: "security" },
  { id: "civic", label: "Civic Tech", iconType: "civic" },
  { id: "innovation", label: "Innovation", iconType: "innovation" },
  { id: "code", label: "Competitive Coding", iconType: "code" },
  { id: "math", label: "Math & Logic", iconType: "math" },
];

export default function BlogListClient({ initialBlogs = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (blog.iconType !== selectedCategory) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = blog.title?.toLowerCase().includes(query);
        const descMatch = blog.description?.toLowerCase().includes(query);
        const tagMatch = Array.isArray(blog.tags)
          ? blog.tags.some((t) => t.toLowerCase().includes(query))
          : false;

        return titleMatch || descMatch || tagMatch;
      }

      return true;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search and Category Filters */}
      <div className="mb-10 space-y-5">
        {/* Search bar */}
        <div className="max-w-md mx-auto relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            aria-label="Search articles"
            className="w-full pl-11 pr-10 py-3 bg-[#10172d] border border-[#25213b] rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#16f2b3] focus:ring-1 focus:ring-[#16f2b3] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
            >
              <FaTimes size={13} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? initialBlogs.length
                : initialBlogs.filter((b) => b.iconType === cat.id).length;

            if (count === 0 && cat.id !== "all") return null;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-violet-900/40"
                    : "bg-[#10172d] text-gray-300 border border-[#25213b] hover:border-violet-500/50 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-black/25 text-white" : "bg-[#1a1443] text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Reset indicator if filtered */}
      {(selectedCategory !== "all" || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-gray-400 mb-6 px-2">
          <span>
            Showing <strong className="text-white">{filteredBlogs.length}</strong> of{" "}
            {initialBlogs.length} articles
          </span>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-[#16f2b3] hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Article Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredBlogs.map((blog, i) => (
            <BlogCard blog={blog} key={blog.slug || blog.id || i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 max-w-md mx-auto bg-[#10172d]/60 rounded-xl border border-[#25213b]">
          <p className="text-gray-300 font-medium mb-2">No matching articles found</p>
          <p className="text-xs text-gray-400 mb-4">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 text-xs font-semibold bg-violet-600/30 text-violet-300 border border-violet-500/40 rounded-full hover:bg-violet-600/50 transition-colors"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}
