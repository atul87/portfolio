"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaDirections, FaCheck, FaCopy } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";

export default function KanpurMapCard() {
  const [copied, setCopied] = useState(false);

  const fullAddress = "1735/02, Awas Vikas, Hanspuram, Naubasta, Kanpur, Uttar Pradesh, India - 208021";
  const mapEmbedUrl = "https://maps.google.com/maps?q=1735%2F02%20awas%20vikas%20hanspuram%20naubasta%20kanpur&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=1735%2F02+awas+vikas+hanspuram+naubasta+kanpur";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=1735%2F02+awas+vikas+hanspuram+naubasta+kanpur";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("1735/02 awas vikas hanspuram naubasta kanpur");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
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

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1f295c]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#16f2b3]/10 text-[#16f2b3]">
            <SiGooglemaps size={18} />
          </div>
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#16f2b3]">
              Location & Native Base
            </span>
            <p className="text-[11px] text-gray-400 font-mono">
              Kanpur, Uttar Pradesh, India
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Native Base
        </span>
      </div>

      {/* Google Map iframe */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[240px] sm:min-h-[270px] rounded-xl overflow-hidden border border-[#2a2e5a] hover:border-[#16f2b3]/50 transition-all duration-300 bg-[#090d24] shadow-inner mb-4">
        <iframe
          src={mapEmbedUrl}
          title="Google Maps Location - 1735/02 Awas Vikas Hanspuram Naubasta Kanpur"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter contrast-[1.05] brightness-[0.92] hover:brightness-100 transition-all duration-300"
        />
      </div>

      {/* Address Details & Metadata */}
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-[#121942]/70 border border-[#1d2760] flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <FaMapMarkerAlt className="text-pink-400 mt-1 shrink-0" size={15} />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
                1735/02, Awas Vikas, Hanspuram
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Naubasta, Kanpur, Uttar Pradesh — 208021
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#1b2358] hover:bg-[#253075] text-gray-300 hover:text-white border border-[#2a3680] transition-colors shrink-0 cursor-pointer"
            title="Copy address"
          >
            {copied ? (
              <>
                <FaCheck size={11} className="text-[#16f2b3]" />
                <span className="text-[#16f2b3]">Copied!</span>
              </>
            ) : (
              <>
                <FaCopy size={11} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Location Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d4a] text-gray-300 border border-[#222d6e]">
            📍 Naubasta, Kanpur
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d4a] text-[#16f2b3] border border-[#222d6e]">
            🎓 Final-Year B.Tech CSE (&apos;27)
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d4a] text-gray-300 border border-[#222d6e]">
            🌐 Relocation / Remote Ready
          </span>
        </div>

        {/* Quick Action Buttons */}
        <div className="pt-2 border-t border-[#1f295c]/60 flex flex-wrap items-center justify-between gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 border border-violet-500/40 hover:border-violet-400 transition-all cursor-pointer"
          >
            <FaExternalLinkAlt size={11} />
            <span>Open in Maps</span>
          </a>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#16f2b3]/20 hover:bg-[#16f2b3]/30 text-[#16f2b3] border border-[#16f2b3]/40 hover:border-[#16f2b3] transition-all cursor-pointer"
          >
            <FaDirections size={12} />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
