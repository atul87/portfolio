"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsNewspaper } from "react-icons/bs";
import { FaExpand, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

export default function PressCoverageCard() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Press Coverage Card in Experience Section */}
      <div className="w-full rounded-2xl border border-[#2a2e5a] bg-[#101123]/90 hover:border-[#16f2b3]/60 transition-all duration-300 p-4 sm:p-5 relative overflow-hidden shadow-2xl shadow-indigo-950/40">
        {/* Ambient background glow */}
        <Image
          src="/blur-23.svg"
          alt="Ambient Glow"
          width={1080}
          height={200}
          loading="lazy"
          className="absolute bottom-0 right-0 opacity-70 pointer-events-none -z-10"
        />

        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1f295c]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#16f2b3]/10 text-[#16f2b3]">
              <BsNewspaper size={18} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#16f2b3]">
                National Press Coverage
              </span>
              <p className="text-[11px] text-gray-400 font-mono">
                Hindustan Daily (हिन्दुस्तान)
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-pink-500/10 text-pink-400 border border-pink-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Media Spotlight
          </span>
        </div>

        {/* Main Card Content */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Newspaper Image Thumbnail with Zoom Overlay */}
          <div
            onClick={() => setIsOpen(true)}
            className="sm:col-span-5 relative group/img cursor-pointer rounded-xl overflow-hidden border border-[#2a2e5a] hover:border-[#16f2b3] transition-all duration-300 bg-black/40 shadow-inner aspect-[4/5] max-h-[260px] sm:max-h-[300px] flex items-center justify-center"
            title="Click to view full newspaper clipping"
          >
            <Image
              src="/image/press-coverage-hindustan.png"
              alt="Hindustan Newspaper Coverage - Atul IEEE Defense Research"
              fill
              sizes="(max-width: 640px) 100vw, 220px"
              className="object-contain object-top group-hover/img:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-center">
              <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16f2b3] text-black font-semibold text-xs shadow-lg">
                <FaExpand size={11} />
                <span>Read Full Article</span>
              </span>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="sm:col-span-7 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#16f2b3] transition-colors">
                Featured in Hindustan: IEEE Defense Research
              </h3>
              <p className="text-xs text-[#16f2b3] font-medium mt-1">
                एलेनहाउस के डिफेंस से जुड़े शोधपत्र राष्ट्रीय स्तर पर प्रकाशित
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2.5">
                Recognized in national daily <strong className="text-white">Hindustan</strong> for co-authoring IEEE research on <em className="text-violet-300 not-italic">Federated Generative Intelligence for Autonomous Cyber Defence in Critical Infrastructures</em> at Allenhouse Institute.
              </p>

              {/* Red-dot highlights from newspaper */}
              <ul className="mt-3 space-y-1.5 text-xs text-gray-400 pl-3 border-l-2 border-[#16f2b3]/40">
                <li className="leading-tight">
                  <span className="text-gray-200 font-medium">National Praise:</span> Applauded by defense engineers and academic leadership for proactive zero-day SCADA defense.
                </li>
                <li className="leading-tight">
                  <span className="text-gray-200 font-medium">Decentralized AI:</span> Preserves privacy by analyzing distributed threat patterns without centralizing sensitive logs.
                </li>
              </ul>
            </div>

            {/* Tags & Action Button */}
            <div className="mt-4 pt-3 border-t border-[#1f295c]/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d4a] text-gray-300 border border-[#222d6e]">
                  #IEEE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d4a] text-[#16f2b3] border border-[#222d6e]">
                  #DefenseCyber
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d4a] text-gray-300 border border-[#222d6e]">
                  #HindustanDaily
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 border border-violet-500/40 hover:border-violet-400 transition-all cursor-pointer"
              >
                <FaExpand size={10} />
                <span>Enlarge Clipping</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Full Article Reading Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hindustan Newspaper Coverage - IEEE Defense Research"
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c102b] border border-[#1f295c] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1f295c] bg-[#090d24]/90">
              <div className="flex items-center gap-2.5">
                <BsNewspaper className="text-[#16f2b3]" size={20} />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Hindustan Newspaper (हिन्दुस्तान) — Press Coverage
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Publication Feature · IEEE Defense Research Recognition
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-[#141a45] text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Full Newspaper Image Preview */}
                <div className="md:col-span-6 relative w-full aspect-[448/965] min-h-[420px] max-h-[70vh] rounded-xl overflow-hidden bg-black/60 border border-[#1f295c]">
                  <Image
                    src="/image/press-coverage-hindustan.png"
                    alt="Original Hindustan Newspaper Article Clipping"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Article Transcription & Context */}
                <div className="md:col-span-6 space-y-4">
                  {/* Article Title in Hindi & English */}
                  <div className="p-4 rounded-xl bg-[#101638] border border-[#1f295c]">
                    <span className="text-[11px] font-mono text-[#16f2b3] uppercase tracking-wider block mb-1">
                      Newspaper Headline
                    </span>
                    <h4 className="text-lg font-bold text-white leading-snug">
                      एलेनहाउस के डिफेंस से जुड़े तीन शोधपत्र प्रकाशित होंगे
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 italic">
                      Three Defense-Related Research Papers from Allenhouse to be Published by IEEE
                    </p>
                  </div>

                  {/* Highlights from Article */}
                  <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-[#121942]/60 border border-[#1d2760]">
                      <span className="text-pink-400 font-bold mt-0.5">■</span>
                      <div>
                        <strong className="text-white">डिफेंस से जुड़े शोध को देश के इंजीनियर्स व वैज्ञानिकों ने सराहा:</strong>
                        <p className="text-gray-400 mt-0.5 text-xs">
                          National defense scientists and engineering community praised the research for addressing critical infrastructure resilience.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-[#121942]/60 border border-[#1d2760]">
                      <span className="text-pink-400 font-bold mt-0.5">■</span>
                      <div>
                        <strong className="text-white">छात्रों की इस उपलब्धि पर संस्थान के नेतृत्व ने दी बधाई:</strong>
                        <p className="text-gray-400 mt-0.5 text-xs">
                          Joint Secretary Javed Hashmi, Director Prof. Manoj Kumar Mishra, Prof. Atul Chaturvedi, and Dean Research Prof. Varun Shukla congratulated Atul and the research team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Focus on Atul's Research Paper */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#131b4d] to-[#0e1438] border border-violet-500/30">
                    <span className="text-[11px] font-mono text-violet-400 uppercase tracking-wider block mb-1">
                      Featured Publication Focus
                    </span>
                    <p className="text-sm font-semibold text-white">
                      फेडरेटेड जेनेरेटिव इंटेलीजेंस फॉर एक्सप्लेनेबल एंड ऑटोनोमस साइबर डिफेंस इन क्रिटिकल इंफ्रास्ट्रक्चर्स
                    </p>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                      &quot;साइबर सुरक्षा को अधिक स्मार्ट, स्वायत्त व भरोसेमंद बनाएगा। विभिन्न स्त्रोतों से डेटा को बिना केंद्रीकृत किए सीखने की क्षमता देता है। संभावित साइबर हमलों के पैटर्न का अनुमान लगाकर तेजी से अलर्ट करेगा।&quot;
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Authors: <strong>Atul</strong>, Mehul Das, Rishabh Tiwari
                    </p>
                  </div>

                  {/* Official IEEE Link */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="https://doi.org/10.1109/ISCS69371.2025.11386415"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-[#16f2b3] to-emerald-400 text-black hover:opacity-95 transition-all shadow-lg shadow-[#16f2b3]/20"
                    >
                      <FaExternalLinkAlt size={11} />
                      <span>View Official IEEE Publication (DOI)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
