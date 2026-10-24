"use client";

import Link from 'next/link';
import * as React from 'react';
import { FaExternalLinkAlt, FaGithub, FaStar, FaRegCopy, FaCheck } from 'react-icons/fa';

function ProjectCard({ project }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const textToCopy = `// ${project.name}\nRole: ${project.role}\nTools: ${project.tools.join(', ')}\nDescription: ${project.description}\nCode: ${project.code || 'N/A'}${project.demo ? `\nDemo: ${project.demo}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-xl border bg-gradient-to-r to-[#0a0d37] w-full overflow-hidden shadow-2xl transition-all duration-300 hover:border-violet-500/50">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      {/* Terminal Title Bar */}
      <div className="px-4 lg:px-6 py-3 flex items-center justify-between border-b border-indigo-950/60 bg-[#0d1224]/90 gap-2">
        <div className="flex items-center space-x-2 shrink-0">
          <div className="h-3 w-3 rounded-full bg-red-500/90 shadow-sm shadow-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-sm shadow-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/90 shadow-sm shadow-green-500/50" />
          <span className="hidden sm:inline-block ml-2 text-[11px] font-mono text-gray-500">
            project_{project.id || 1}.ts
          </span>
        </div>

        <div className="flex-1 px-2 text-center min-w-0">
          <span className="text-[#16f2b3] font-bold text-xs sm:text-sm lg:text-base tracking-wide truncate block">
            {project.name}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            aria-label="Copy project details"
            title={copied ? "Copied!" : "Copy project details"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-gray-400 hover:text-white bg-[#1a1443]/60 hover:bg-[#1a1443] border border-violet-500/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#16f2b3] cursor-pointer"
          >
            {copied ? (
              <>
                <FaCheck size={11} className="text-[#16f2b3]" />
                <span className="text-[#16f2b3] hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <FaRegCopy size={11} />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="overflow-hidden px-4 lg:px-8 py-5 lg:py-7">
        <code className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div className="my-1">
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2 my-1">
            <span className="text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300 hover:text-[#16f2b3] transition-colors cursor-default">
                  {tag}
                </span>
                {project.tools?.length - 1 !== i && (
                  <span className="text-gray-400">{`', '`}</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-gray-400">{`'],`}</span>
          </div>

          <div className="my-1">
            <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-orange-400">{project.role}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2 my-1">
            <span className="text-white">description:</span>
            <span className="text-gray-400">{` '`}</span>
            <span className="text-cyan-300/90 leading-relaxed">{project.description}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>
          <div><span className="text-gray-400">{`};`}</span></div>
        </code>

        {/* Action Buttons & Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-3 border-t border-[#1b2c68a0]/40">
          {project.code && (
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#16f2b3]/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#16f2b3] transition-all duration-300 hover:bg-[#16f2b3] hover:text-[#0d1224] focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none"
            >
              <FaGithub size={13} />
              <span>Code</span>
            </Link>
          )}

          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-pink-500/60 bg-pink-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-pink-400 transition-all duration-300 hover:bg-pink-500 hover:text-white focus-visible:ring-2 focus-visible:ring-pink-400 focus:outline-none shadow-sm hover:shadow-pink-500/25"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <FaExternalLinkAlt size={11} />
              <span>Live Demo</span>
            </Link>
          )}

          {project.stars && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm">
              <FaStar size={11} className="text-amber-400" />
              <span>{project.stars} Stars</span>
            </span>
          )}

          {!project.code && !project.demo && (
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-600/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-400">
              Source Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
