"use client";

import React from "react";
import Link from "next/link";
import { FaCode, FaBrain, FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import { personalData } from "@/utils/data/personal-data";

export default function HackerRankCard() {
  const profileUrl = personalData.hackerrank || "https://www.hackerrank.com/profile/atulverma15704";

  return (
    <div id="hackerrank-achievements" className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 lg:my-12 scroll-mt-24">
      <div className="relative rounded-2xl md:rounded-3xl border border-[#1f295c]/80 bg-gradient-to-b from-[#0c1033] via-[#0e1338] to-[#0a0d26] p-6 sm:p-8 md:p-10 shadow-2xl shadow-indigo-950/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#16f2b3]/60 group">
        {/* Subtle ambient glows */}
        <div className="w-[140px] h-[140px] bg-[#1ba94c]/15 rounded-full absolute -top-12 left-10 filter blur-3xl pointer-events-none" />
        <div className="w-[120px] h-[120px] bg-violet-600/15 rounded-full absolute -bottom-10 right-10 filter blur-3xl pointer-events-none" />

        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#1ba94c]/60 to-transparent" />

        {/* Card Header (Matches Mockup 1) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f295c]/70">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            {/* Green HackerRank Icon Badge */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1ba94c] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#1ba94c]/25 transition-transform duration-300 group-hover:scale-105">
              <SiHackerrank size={30} className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
                <span>HackerRank Achievements</span>
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                Competitive programming and coding proficiency
              </p>
            </div>
          </div>

          {/* Outbound Link Button */}
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View HackerRank Profile"
            className="inline-flex items-center gap-1.5 self-start sm:self-center px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#161d4a] hover:bg-[#1a235c] text-[#16f2b3] border border-[#222d6e] hover:border-[#16f2b3]/60 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <span>View HackerRank Profile</span>
            <FaExternalLinkAlt size={10} className="ml-0.5" />
          </Link>
        </div>

        {/* Two-Column Proficiency Badges (Matches Mockup 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8">
          {/* Badge 1: Python (Gold) */}
          <div className="flex flex-col items-start p-4 sm:p-5 rounded-xl bg-[#131942]/60 border border-[#202b66]/60 hover:border-amber-400/40 hover:bg-[#172054]/70 transition-all duration-300">
            <div className="text-amber-400 text-lg mb-2">
              <FaCode size={20} />
            </div>

            <h4 className="text-white font-bold text-base sm:text-lg tracking-wide mb-1">
              Python
            </h4>

            <div className="flex items-center gap-2 my-1">
              <span className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight">
                5 / 5
              </span>
              <FaStar className="text-amber-400 w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Gold
              </span>
              <span className="text-gray-400 text-xs">
                5-star proficiency badge
              </span>
            </div>
          </div>

          {/* Badge 2: Problem Solving (Silver) */}
          <div className="flex flex-col items-start p-4 sm:p-5 rounded-xl bg-[#131942]/60 border border-[#202b66]/60 hover:border-slate-300/40 hover:bg-[#172054]/70 transition-all duration-300">
            <div className="text-cyan-400 text-lg mb-2">
              <FaBrain size={20} />
            </div>

            <h4 className="text-white font-bold text-base sm:text-lg tracking-wide mb-1">
              Problem Solving
            </h4>

            <div className="flex items-center gap-2 my-1">
              <span className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight">
                4 / 5
              </span>
              <FaStar className="text-amber-400 w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-400/20 text-slate-200 border border-slate-400/40">
                Silver
              </span>
              <span className="text-gray-400 text-xs">
                4-star proficiency badge
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
