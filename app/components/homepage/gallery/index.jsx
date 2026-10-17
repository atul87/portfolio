import React from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryData } from "@/utils/data/gallery-data";
import { FaArrowRight, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function GallerySection() {
  // Highlight top 4 real photos on the homepage
  const featuredGlimpses = galleryData.slice(0, 4);

  return (
    <div id="gallery" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] scroll-mt-20">
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
            Visual Log & Glimpses
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="text-center max-w-xl mx-auto mb-10 px-4">
        <p className="text-sm md:text-base text-gray-400">
          Hackathons, research work, and campus events — captured on stage and in the lab.
        </p>
      </div>

      {/* Featured Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredGlimpses.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative rounded-2xl bg-[#0e1338]/90 border border-[#1f295c] overflow-hidden hover:border-[#16f2b3]/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-950/60 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase bg-[#0d1224]/85 text-[#16f2b3] border border-[#16f2b3]/30">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h4 className="text-white font-bold text-sm mb-2 group-hover:text-[#16f2b3] transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <div className="pt-2 border-t border-[#1b2559]/60 text-[11px] text-gray-400 font-mono flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <FaMapMarkerAlt size={10} className="text-[#16f2b3] shrink-0" />
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt size={10} className="text-violet-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-900/30 focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none"
          >
            <span>Explore All Events & Visual Log ({galleryData.length})</span>
            <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GallerySection;
