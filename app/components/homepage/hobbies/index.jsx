import React from "react";
import { hobbiesData } from "@/utils/data/hobbies-data";

function HobbiesSection() {
  return (
    <div id="hobbies" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] scroll-mt-20">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20 pointer-events-none"></div>

      {/* Top Gradient Divider */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md font-semibold tracking-wide">
            Hobbies
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-6 lg:my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {hobbiesData.map((hobby) => (
            <div
              key={hobby.id}
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#11163a]/90 border border-[#1f285c]/80 hover:border-violet-500/60 hover:bg-[#151c4a] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-900/20 text-center cursor-default min-h-[190px]"
            >
              {/* Subtle top border gradient accent */}
              <div className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent absolute top-0" />

              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 select-none">
                {hobby.icon}
              </div>

              {/* Title */}
              <h4 className="text-white font-bold text-base sm:text-lg mb-2 tracking-wide">
                {hobby.title}
              </h4>

              {/* Description */}
              <p className="text-gray-300/80 text-xs sm:text-sm leading-relaxed max-w-xs">
                {hobby.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HobbiesSection;
