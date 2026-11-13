// @flow strict

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[#0d1224]">
      {/* Ambient background glow */}
      <div 
        className="w-[300px] h-[300px] bg-violet-600/15 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-md w-full frosted-glass border border-[#1b2c68a0] rounded-2xl p-8 sm:p-10 text-center shadow-2xl shadow-indigo-950/50">
        <span className="font-mono text-xs uppercase tracking-widest text-[#16f2b3] bg-[#121840] px-3 py-1 rounded-full border border-indigo-900/60 inline-block mb-4">
          Route Not Found
        </span>

        <h1 className="text-7xl sm:text-8xl font-black text-white tracking-tighter">
          4<span className="text-[#16f2b3]">0</span>4
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-white mt-4 tracking-tight">
          Page Not Found
        </h2>

        <p className="mt-2.5 text-sm sm:text-base text-gray-400 leading-relaxed">
          The page or route you are looking for does not exist or has been moved to another coordinate.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 p-[1px] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16f2b3]"
          >
            <span className="flex items-center gap-2 rounded-full bg-[#0d1224] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:text-[#16f2b3]">
              <FaArrowLeft size={13} />
              Go to Home
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
