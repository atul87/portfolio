"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryCategories, galleryData } from "@/utils/data/gallery-data";
import { FaTimes, FaExpand, FaCalendarAlt, FaMapMarkerAlt, FaFilePdf, FaArrowLeft } from "react-icons/fa";

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("ALL EVENTS");
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === "ALL EVENTS") return galleryData;
    return galleryData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen py-10 lg:py-16 text-white">
      {/* Back to Home Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-400 hover:text-[#16f2b3] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#16f2b3] rounded px-2 py-1"
        >
          <FaArrowLeft size={12} />
          <span>BACK TO PORTFOLIO</span>
        </Link>
      </div>

      {/* Header matching reference screenshot */}
      <div className="mb-10 lg:mb-12">
        <span className="text-xs sm:text-sm font-mono tracking-widest text-[#16f2b3] uppercase block mb-3">
          (GALLERY)
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-4">
          Visual log
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl leading-relaxed">
          Hackathons, research work and club events — grouped by occasion.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-[#1b2559]/60">
        {galleryCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = cat === "ALL EVENTS"
            ? galleryData.length
            : galleryData.filter((i) => i.category === cat).length;

          // If category has zero items, don't show
          if (count === 0) return null;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] ${
                isSelected
                  ? "bg-[#ccff00] text-black font-bold shadow-lg shadow-[#ccff00]/25 scale-[1.02]"
                  : "bg-[#10142e] text-gray-400 hover:text-white border border-[#1f295c] hover:border-violet-500/50"
              }`}
            >
              <span>{cat}</span>
              {isSelected ? (
                <span className="ml-1.5 font-bold">· {count}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Results Counter */}
      <div className="text-xs text-gray-500 mb-6 font-mono">
        Showing <span className="text-gray-300 font-semibold">{filteredItems.length}</span> of {galleryData.length} records
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative rounded-2xl bg-[#0e1338]/90 border border-[#1f295c] overflow-hidden hover:border-[#16f2b3]/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-950/60 cursor-pointer flex flex-col"
          >
            {/* Top gradient highlight */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index < 2}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Category pill on image */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-[#0d1224]/85 text-[#16f2b3] border border-[#16f2b3]/30 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-white bg-black/70 border border-white/20">
                  <FaExpand size={11} />
                  <span>View Details</span>
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2 group-hover:text-[#16f2b3] transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1b2559]/60 flex flex-col gap-1.5 text-xs text-gray-500 font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <FaMapMarkerAlt size={11} className="text-[#16f2b3] shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt size={11} className="text-violet-400 shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox Viewer */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0d122b] border border-[#1f295c] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/80 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#1b2559]/80 bg-[#090d24]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#16f2b3]/15 text-[#16f2b3] border border-[#16f2b3]/30">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                  {activeModalItem.date}
                </span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3]"
                aria-label="Close modal"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* High-res Image Preview */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 border border-[#1f295c]">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                  {activeModalItem.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                  {activeModalItem.description}
                </p>

                {/* Venue & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-gray-400 bg-[#121840] p-4 rounded-xl border border-[#1f295c]">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#16f2b3]" />
                    <span><strong>Venue:</strong> {activeModalItem.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-violet-400" />
                    <span><strong>Occasion / Date:</strong> {activeModalItem.date}</span>
                  </div>
                </div>

                {/* Tags */}
                {activeModalItem.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activeModalItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#161d4a] text-gray-300 border border-[#222d6e]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Credential ID badge if present */}
                {activeModalItem.credentialId && (
                  <div className="mt-4 p-3 rounded-lg bg-[#10163a] border border-[#222d6e] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-gray-400">
                      Credential / Verification ID:
                    </span>
                    <span className="text-[#16f2b3] font-semibold tracking-wide select-all bg-[#0a0f29] px-2.5 py-1 rounded border border-[#16f2b3]/20">
                      {activeModalItem.credentialId}
                    </span>
                  </div>
                )}

                {/* PDF Link if present */}
                {activeModalItem.pdfUrl && (
                  <div className="mt-5">
                    <a
                      href={activeModalItem.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-pink-500/20"
                    >
                      <FaFilePdf size={14} />
                      <span>View Official Certificate (PDF)</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
