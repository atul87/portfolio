import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { getLocalBlog, localBlogs } from "@/utils/data/local-blogs";

const formatInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
};

function ArticleBody({ content }) {
  const lines = content.trim().split("\n");
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={index} className="mt-10 text-2xl font-semibold text-white">{line.slice(3)}</h2>);
      continue;
    }

    const isList = /^([-*]|\d+\.)\s/.test(line);
    if (isList) {
      const ordered = /^\d+\.\s/.test(line);
      const items = [];
      while (index < lines.length && (ordered ? /^\d+\.\s/.test(lines[index].trim()) : /^[-*]\s/.test(lines[index].trim()))) {
        items.push(lines[index].trim().replace(ordered ? /^\d+\.\s/ : /^[-*]\s/, ""));
        index += 1;
      }
      index -= 1;
      const List = ordered ? "ol" : "ul";
      blocks.push(<List key={index} className={`my-5 space-y-3 pl-6 text-[#d3d8e8] ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{formatInline(item)}</li>)}</List>);
      continue;
    }

    blocks.push(<p key={index} className="mt-5 text-base leading-8 text-[#d3d8e8] md:text-lg">{formatInline(line)}</p>);
  }
  return <div>{blocks}</div>;
}

export function generateStaticParams() {
  return localBlogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getLocalBlog(slug);
  return blog ? { title: `${blog.title} | Atul Portfolio`, description: blog.description } : {};
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

  return (
    <article className="mx-auto max-w-3xl py-10 sm:py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#16f2b3] transition-colors hover:text-pink-400">
        <FaArrowLeft /> All blogs
      </Link>
      <header className="mt-8 border-b border-[#25213b] pb-8">
        <p className="text-sm text-[#16f2b3]">{blog.dateLabel}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{blog.title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#d3d8e8]">{blog.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{blog.tags.map((tag) => <span key={tag} className="rounded-full border border-pink-500/40 px-3 py-1 text-sm text-pink-300">{tag}</span>)}</div>
      </header>
      <ArticleBody content={content} />
      <footer className="mt-12 border-t border-[#25213b] pt-6">
        <Link href={blog.sourcePost} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#16f2b3] transition-colors hover:text-pink-400">
          View the source post <FaExternalLinkAlt size={12} />
        </Link>
      </footer>
    </article>
  );
}
