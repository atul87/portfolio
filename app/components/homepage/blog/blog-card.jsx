// @flow strict
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill, BsClock } from 'react-icons/bs';
import { FaCommentAlt, FaArrowRight, FaCity, FaLightbulb, FaCode } from 'react-icons/fa';
import { MdSecurity, MdFunctions, MdArticle } from 'react-icons/md';

function getBlogTheme(iconType) {
  switch (iconType) {
    case 'security':
      return {
        gradient: 'from-emerald-950/70 via-teal-900/50 to-[#0d1224]',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        icon: <MdSecurity size={40} className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" />,
      };
    case 'civic':
      return {
        gradient: 'from-cyan-950/70 via-sky-900/50 to-[#0d1224]',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        icon: <FaCity size={36} className="text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]" />,
      };
    case 'innovation':
      return {
        gradient: 'from-amber-950/70 via-orange-900/50 to-[#0d1224]',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        icon: <FaLightbulb size={36} className="text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]" />,
      };
    case 'code':
      return {
        gradient: 'from-purple-950/70 via-violet-900/50 to-[#0d1224]',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        icon: <FaCode size={36} className="text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]" />,
      };
    case 'math':
      return {
        gradient: 'from-indigo-950/70 via-blue-900/50 to-[#0d1224]',
        border: 'border-indigo-500/30',
        text: 'text-indigo-400',
        icon: <MdFunctions size={40} className="text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]" />,
      };
    default:
      return {
        gradient: 'from-[#121a3b] via-[#1a1443] to-[#2a1649]',
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        icon: <MdArticle size={36} className="text-violet-400" />,
      };
  }
}

function BlogCard({ blog }) {
  const isLocalPost = Boolean(blog.slug);
  const href = isLocalPost ? `/blog/${blog.slug}` : blog.url;
  const theme = getBlogTheme(blog.iconType);

  return (
    <div className="border border-[#1d293a] hover:border-violet-500/60 transition-all duration-300 bg-[#10172d]/90 rounded-xl relative group flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-violet-900/20 hover:-translate-y-1">
      <div>
        <Link
          href={href}
          target={isLocalPost ? undefined : "_blank"}
          rel={isLocalPost ? undefined : "noopener noreferrer"}
          className="block"
        >
          {isLocalPost ? (
            <div className={`relative flex h-48 flex-col justify-between overflow-hidden bg-gradient-to-br ${theme.gradient} p-5 border-b border-[#1b2c68a0]`}>
              <div className="flex items-center justify-between z-10">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0d1224]/80 ${theme.border} border ${theme.text}`}>
                  {blog.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-gray-300 bg-[#0d1224]/60 border border-gray-700/60">
                  <BsClock size={11} />
                  {blog.readTime || "4 min read"}
                </span>
              </div>

              <div className="flex items-center justify-center my-2 z-10 transition-transform duration-300 group-hover:scale-110">
                {theme.icon}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#16f2b3]/60 to-transparent z-10" />
            </div>
          ) : (
            <div className="h-48 w-auto cursor-pointer overflow-hidden relative border-b border-[#1b2c68a0]">
              <Image
                src={blog?.cover_image}
                height={1080}
                width={1920}
                alt={blog?.title || "Blog post cover"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
              />
            </div>
          )}
        </Link>

        <div className="p-5 flex flex-col">
          {!isLocalPost && (
            <div className="flex justify-between items-center text-[#16f2b3] text-xs mb-2">
              <p>{timeConverter(blog.published_at)}</p>
              <div className="flex items-center gap-3">
                <p className="flex items-center gap-1">
                  <BsHeartFill size={12} className="text-pink-500" />
                  <span>{blog.public_reactions_count}</span>
                </p>
                {blog.comments_count > 0 && (
                  <p className="flex items-center gap-1">
                    <FaCommentAlt size={12} />
                    <span>{blog.comments_count}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          <Link
            target={isLocalPost ? undefined : "_blank"}
            rel={isLocalPost ? undefined : "noopener noreferrer"}
            href={href}
          >
            <h3 className="my-1 cursor-pointer text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#16f2b3] transition-colors">
              {blog.title}
            </h3>
          </Link>

          {isLocalPost && Array.isArray(blog.tags) && (
            <div className="my-3 flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed mt-1">
            {blog.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[#1b2c68a0]/40 flex items-center justify-between">
        <Link
          href={href}
          target={isLocalPost ? undefined : "_blank"}
          rel={isLocalPost ? undefined : "noopener noreferrer"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#16f2b3] group-hover:text-pink-400 transition-colors"
        >
          <span>Read Article</span>
          <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <span className="text-[11px] font-mono text-gray-500">
          {isLocalPost ? "Essay" : `${blog.reading_time_minutes} min read`}
        </span>
      </div>
    </div>
  );
}

export default BlogCard;
