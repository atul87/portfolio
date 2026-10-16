// @flow strict
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  const isLocalPost = Boolean(blog.slug);
  const href = isLocalPost ? `/blog/${blog.slug}` : blog.url;

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group"
    >
      <Link href={href} target={isLocalPost ? undefined : "_blank"} rel={isLocalPost ? undefined : "noopener noreferrer"} className="block">
        {isLocalPost ? (
          <div className="flex h-44 items-end overflow-hidden rounded-t-lg bg-gradient-to-br from-[#121a3b] via-[#1a1443] to-[#2a1649] p-5">
            <div className="h-px w-full bg-gradient-to-r from-[#16f2b3] via-pink-500 to-transparent" />
          </div>
        ) : (
          <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg">
            <Image
              src={blog?.cover_image}
              height={1080}
              width={1920}
              alt={blog?.title || "Blog post cover"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className='h-full w-full group-hover:scale-110 transition-all duration-300'
            />
          </div>
        )}
      </Link>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{isLocalPost ? blog.dateLabel : timeConverter(blog.published_at)}</p>
          {!isLocalPost && <div className="flex items-center gap-3">
              <p className="flex items-center gap-1"><BsHeartFill /><span>{blog.public_reactions_count}</span></p>
              {blog.comments_count > 0 && <p className="flex items-center gap-1"><FaCommentAlt /><span>{blog.comments_count}</span></p>}
            </div>}
        </div>
        <Link target={isLocalPost ? undefined : "_blank"} rel={isLocalPost ? undefined : "noopener noreferrer"} href={href}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
            {blog.title}
          </p>
        </Link>
        {isLocalPost ? <div className="mb-3 flex flex-wrap gap-2">{blog.tags.map((tag) => <span key={tag} className="rounded-full border border-[#16f2b3]/30 px-2 py-0.5 text-xs text-[#16f2b3]">{tag}</span>)}</div> : <p className='mb-2 text-sm text-[#16f2b3]'>{`${blog.reading_time_minutes} Min Read`}</p>}
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
          {blog.description}
        </p>
        {/* <div className="">
          <Link target='_blank' href={blog.url}>
            <button className='bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs'>
              Read More
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default BlogCard;
