import React from "react";
import { BsJournalCode } from "react-icons/bs";
import { FaAward, FaLayerGroup } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

const stats = [
  {
    label: "Public Repositories",
    value: "13",
    subtext: "GitHub projects & experiments",
    icon: <BsJournalCode className="text-[#16f2b3]" size={24} />,
    borderColor: "hover:border-[#16f2b3]/60",
  },
  {
    label: "IEEE Research Papers",
    value: "2",
    subtext: "ISCS 2025 & SCEECS 2026",
    icon: <MdOutlineScience className="text-pink-500" size={24} />,
    borderColor: "hover:border-pink-500/60",
  },
  {
    label: "DSA Problems Solved",
    value: "500+",
    subtext: "LeetCode, GFG & Code360",
    icon: <SiLeetcode className="text-amber-400" size={24} />,
    borderColor: "hover:border-amber-400/60",
  },
  {
    label: "Coding Competitions",
    value: "Top 20%",
    subtext: "NCAT & TCS CodeVita 7,007",
    icon: <FaLayerGroup className="text-violet-400" size={24} />,
    borderColor: "hover:border-violet-400/60",
  },
  {
    label: "Idea Sprint 2025",
    value: "Runner-Up",
    subtext: "MyCity Help Smart City",
    icon: <FaAward className="text-cyan-400" size={24} />,
    borderColor: "hover:border-cyan-400/60",
  },
];

export default function StatsSection() {
  return (
    <div className="my-6 lg:my-10 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl bg-gradient-to-br from-[#10172d]/90 to-[#0a0d37]/90 border border-[#1b2c68a0] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-900/20 ${stat.borderColor} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <div className="p-2 rounded-lg bg-[#0d1224] border border-[#252a48]">
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-200">
                {stat.label}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
