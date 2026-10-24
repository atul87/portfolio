"use client";

import React from "react";
import { FaCode, FaBolt, FaUsers, FaBullseye } from "react-icons/fa";

const CORE_VALUES = [
  {
    id: 1,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code that stands the test of time.",
    icon: FaCode,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15 border-blue-500/30",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    id: 2,
    title: "Innovation",
    description: "Constantly exploring new technologies and approaches to solve complex problems.",
    icon: FaBolt,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/15 border-violet-500/30",
    hoverBorder: "hover:border-violet-500/50",
  },
  {
    id: 3,
    title: "Collaboration",
    description: "Building strong relationships and working effectively with diverse teams.",
    icon: FaUsers,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    hoverBorder: "hover:border-emerald-500/50",
  },
  {
    id: 4,
    title: "Impact",
    description: "Focusing on creating solutions that make a real difference in people's lives.",
    icon: FaBullseye,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/15 border-pink-500/30",
    hoverBorder: "hover:border-pink-500/50",
  },
];

export default function WhatIValueSection() {
  return (
    <section id="values" className="relative z-40 my-12 lg:my-20 scroll-mt-24">
      {/* Decorative center ambient glow */}
      <div className="w-[180px] h-[180px] bg-violet-600/15 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10 lg:mb-14">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          What I Value
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2.5 max-w-xl mx-auto leading-relaxed">
          The principles that guide my work and professional relationships.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {CORE_VALUES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative rounded-2xl border border-[#1b2c68a0] bg-gradient-to-b from-[#0d1224]/90 to-[#0a0d37]/90 p-6 sm:p-7 shadow-xl shadow-indigo-950/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-950/40 group overflow-hidden ${item.hoverBorder}`}
            >
              {/* Top Accent Gradient Border on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16f2b3]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-transform duration-300 group-hover:scale-110 ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={22} />
              </div>

              {/* Card Title */}
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-2.5 group-hover:text-[#16f2b3] transition-colors">
                {item.title}
              </h3>

              {/* Card Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
