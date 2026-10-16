import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaClock,
  FaCalendarAlt,
  FaUserGraduate,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { MdSecurity, MdFunctions, MdArticle } from "react-icons/md";
import { FaCity, FaLightbulb, FaCode } from "react-icons/fa";
import { getLocalBlog, localBlogs } from "@/utils/data/local-blogs";
import { personalData } from "@/utils/data/personal-data";

function getCategoryIcon(iconType) {
  switch (iconType) {
    case "security":
      return <MdSecurity className="text-emerald-400" size={18} />;
    case "civic":
      return <FaCity className="text-cyan-400" size={16} />;
    case "innovation":
      return <FaLightbulb className="text-amber-400" size={16} />;
    case "code":
      return <FaCode className="text-purple-400" size={16} />;
    case "math":
      return <MdFunctions className="text-indigo-400" size={18} />;
    default:
      return <MdArticle className="text-violet-400" size={18} />;
  }
}

const formatInline = (text) => {
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-[#1a1443] px-1.5 py-0.5 font-mono text-xs md:text-sm text-[#16f2b3] border border-violet-500/30"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="text-gray-300 italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#16f2b3] hover:underline"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
};

function ArticleBody({ content }) {
  const lines = content.trim().split("\n");
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    if (line === "---") {
      blocks.push(<hr key={index} className="my-8 border-[#25213b]" />);
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2
          key={index}
          className="mt-10 mb-4 text-xl sm:text-2xl font-bold text-white border-l-4 border-violet-500 pl-3 leading-snug"
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={index} className="mt-7 mb-3 text-lg sm:text-xl font-semibold text-gray-100">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={index}
          className="my-6 border-l-4 border-[#16f2b3] bg-[#10172d]/80 p-4 rounded-r-lg text-gray-300 italic text-base leading-relaxed"
        >
          {formatInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    const isList = /^([-*]|\d+\.)\s/.test(line);
    if (isList) {
      const ordered = /^\d+\.\s/.test(line);
      const items = [];
      while (
        index < lines.length &&
        (ordered
          ? /^\d+\.\s/.test(lines[index].trim())
          : /^[-*]\s/.test(lines[index].trim()))
      ) {
        items.push(
          lines[index].trim().replace(ordered ? /^\d+\.\s/ : /^[-*]\s/, "")
        );
        index += 1;
      }
      index -= 1;
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List
          key={index}
          className={`my-5 space-y-2.5 pl-6 text-[#d3d8e8] ${
            ordered
              ? "list-decimal marker:text-[#16f2b3] marker:font-semibold"
              : "list-disc marker:text-[#16f2b3]"
          }`}
        >
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </List>
      );
      continue;
    }

    blocks.push(
      <p
        key={index}
        className="mt-4 text-base leading-relaxed text-[#d3d8e8] md:text-lg"
      >
        {formatInline(line)}
      </p>
    );
  }
  return <div className="article-body prose-invert max-w-none">{blocks}</div>;
}

export function generateStaticParams() {
  return localBlogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getLocalBlog(slug);
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-five-black-83.vercel.app";
  return blog
    ? {
        title: `${blog.title} | Atul Portfolio`,
        description: blog.description,
        alternates: {
          canonical: `${siteUrl}/blog/${slug}`,
        },
        openGraph: {
          title: blog.title,
          description: blog.description,
          url: `${siteUrl}/blog/${slug}`,
          type: "article",
          images: [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: blog.title,
          description: blog.description,
          images: ["/og-image.png"],
        },
      }
    : {};
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const blog = getLocalBlog(slug);
  if (!blog) notFound();

  const filePath = path.join(process.cwd(), "content", "blogs", `${slug}.md`);
  let content;
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch {
    notFound();
  }

  const currentIndex = localBlogs.findIndex((b) => b.slug === slug);
  const prevBlog = currentIndex > 0 ? localBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex >= 0 && currentIndex < localBlogs.length - 1
      ? localBlogs[currentIndex + 1]
      : null;

  return (
    <article className="mx-auto max-w-3xl py-8 sm:py-14">
      {/* Back button */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16f2b3] transition-colors hover:text-pink-400 focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none rounded-md px-2 py-1"
        >
          <FaArrowLeft size={12} /> Back to all articles
        </Link>
      </nav>

      {/* Article Header */}
      <header className="border-b border-[#25213b] pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold uppercase tracking-wider bg-[#10172d] border border-violet-500/40 text-violet-300">
            {getCategoryIcon(blog.iconType)}
            <span>{blog.dateLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-400">
            <FaClock size={12} className="text-[#16f2b3]" />
            <span>{blog.readTime || "4 min read"}</span>
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400">By Atul</span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-4xl">
          {blog.title}
        </h1>

        <div className="mt-4 rounded-xl border border-violet-500/20 bg-gradient-to-r from-[#10172d] to-[#1a1443]/60 p-4">
          <p className="text-sm sm:text-base leading-relaxed text-gray-300 italic">
            &ldquo;{blog.description}&rdquo;
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Markdown Body */}
      <main className="py-6">
        <ArticleBody content={content} />
      </main>

      {/* Author Card */}
      <section className="mt-12 rounded-2xl border border-[#25213b] bg-gradient-to-br from-[#10172d] via-[#121633] to-[#1a1443]/40 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#16f2b3] to-violet-600 text-white font-bold text-xl shadow-lg shadow-violet-900/30">
            AV
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-lg font-bold text-white">Atul Verma</h3>
            <p className="text-xs text-[#16f2b3] font-medium mt-0.5">
              AI/ML Engineer & Full-Stack Developer · IEEE ISCS 2025 Researcher
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
              Undergraduate engineer specializing in federated machine learning, explainable AI (XAI), and autonomous systems. Passionate about solving real-world challenges through data-driven software architecture.
            </p>
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-3 text-sm text-gray-400">
              <Link
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub size={16} />
              </Link>
              <Link
                href={personalData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={16} />
              </Link>
              <Link
                href="/#research"
                className="text-xs text-[#16f2b3] hover:underline font-mono"
              >
                IEEE Paper →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next and Previous Articles Navigation */}
      {(prevBlog || nextBlog) && (
        <nav aria-label="Adjacent Articles" className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevBlog ? (
            <Link
              href={`/blog/${prevBlog.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-[#25213b] bg-[#10172d]/70 p-4 transition-all hover:border-violet-500/60 hover:-translate-y-0.5"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1 group-hover:text-[#16f2b3]">
                <FaArrowLeft size={10} /> Previous Article
              </span>
              <p className="mt-2 text-sm font-bold text-white line-clamp-2 group-hover:text-[#16f2b3] transition-colors">
                {prevBlog.title}
              </p>
              <span className="mt-3 text-[11px] text-gray-500 font-mono">
                {prevBlog.readTime}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextBlog ? (
            <Link
              href={`/blog/${nextBlog.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-[#25213b] bg-[#10172d]/70 p-4 text-right transition-all hover:border-violet-500/60 hover:-translate-y-0.5"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 flex items-center justify-end gap-1 group-hover:text-[#16f2b3]">
                Next Article <FaArrowRight size={10} />
              </span>
              <p className="mt-2 text-sm font-bold text-white line-clamp-2 group-hover:text-[#16f2b3] transition-colors">
                {nextBlog.title}
              </p>
              <span className="mt-3 text-[11px] text-gray-500 font-mono">
                {nextBlog.readTime}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      {/* Footer / Source Post */}
      <footer className="mt-10 border-t border-[#25213b] pt-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={blog.sourcePost}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#16f2b3] transition-colors hover:text-pink-400"
        >
          <span>View original publication / source</span>
          <FaExternalLinkAlt size={11} />
        </Link>
        <Link
          href="/blog"
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Back to all articles ↑
        </Link>
      </footer>
    </article>
  );
}
