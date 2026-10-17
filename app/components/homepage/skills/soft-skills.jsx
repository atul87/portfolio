"use client";

import React from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaComments,
  FaLightbulb,
  FaClock,
  FaListUl,
  FaBrain,
  FaSyncAlt,
} from "react-icons/fa";

const SOFT_SKILLS = [
  {
    id: 1,
    name: "Leadership",
    icon: FaChalkboardTeacher,
  },
  {
    id: 2,
    name: "Team Collaboration",
    icon: FaUsers,
  },
  {
    id: 3,
    name: "Public Speaking",
    icon: FaComments,
  },
  {
    id: 4,
    name: "Problem-Solving",
    icon: FaLightbulb,
  },
  {
    id: 5,
    name: "Time Management",
    icon: FaClock,
  },
  {
    id: 6,
    name: "Event Coordination",
    icon: FaListUl,
  },
  {
    id: 7,
    name: "Critical Thinking",
    icon: FaBrain,
  },
  {
    id: 8,
    name: "Adaptability",
    icon: FaSyncAlt,
  },
];

function SoftSkills() {
  return (
    <div id="soft-skills" className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-10 lg:my-16 scroll-mt-24">
      <div className="relative rounded-2xl md:rounded-3xl border border-[#1f295c]/80 bg-gradient-to-b from-[#0c1033] via-[#0e1338] to-[#0a0d26] p-6 sm:p-8 md:p-10 shadow-2xl shadow-indigo-950/50 backdrop-blur-md overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="w-[120px] h-[120px] bg-violet-600/15 rounded-full absolute -top-10 left-1/2 -translate-x-1/2 filter blur-3xl pointer-events-none" />
        <div className="w-[100px] h-[100px] bg-[#16f2b3]/10 rounded-full absolute -bottom-10 right-10 filter blur-3xl pointer-events-none" />

        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#16f2b3]/40 to-transparent" />

        {/* Section Heading */}
        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 tracking-wide">
          Soft Skills
        </h3>

        {/* 4x2 Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
          {SOFT_SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.id}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 rounded-xl bg-[#131942] border border-[#202b66] hover:border-[#16f2b3]/60 hover:bg-[#172054] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#16f2b3]/10 cursor-default"
              >
                {/* Micro-glow indicator on hover */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#16f2b3]/0 group-hover:bg-[#16f2b3]/80 transition-all duration-300" />

                {/* Skill Icon */}
                <div className="text-[#16f2b3] mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={28} className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Skill Label */}
                <span className="text-[#16f2b3] font-semibold text-xs sm:text-sm md:text-[15px] tracking-wide text-center leading-snug">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SoftSkills;
