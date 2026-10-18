// @flow strict
import Link from 'next/link';
import { FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import { MdOutlineScience, MdMenuBook } from 'react-icons/md';
import { SiResearchgate } from 'react-icons/si';
import { researchData } from '@/utils/data/research-data';
import { personalData } from '@/utils/data/personal-data';

export default function ResearchSection() {
  return (
    <div id="research" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-pink-500/20 rounded-full absolute top-6 left-[30%] translate-x-1/2 filter blur-3xl opacity-20 pointer-events-none"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md font-semibold tracking-wide flex items-center gap-2">
            <MdOutlineScience className="text-pink-500" size={22} />
            Research & Publications
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-6">
        {researchData.map((paper) => (
          <div
            key={paper.id}
            className="rounded-xl border border-[#1b2c68a0] bg-gradient-to-br from-[#0d1224]/95 via-[#10172d]/95 to-[#0a0d37]/95 p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 group"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/30">
                  <MdMenuBook size={14} />
                  {paper.venue}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#16f2b3]/10 text-[#16f2b3] border border-[#16f2b3]/30">
                  <FaAward size={11} />
                  {paper.status}
                </span>
              </div>

              <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-pink-300 transition-colors leading-snug mb-3">
                {paper.title}
              </h3>

              <p className="text-xs font-mono text-gray-400 mb-4">
                DOI: <span className="text-[#16f2b3]">{paper.doi}</span>
              </p>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {paper.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {paper.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-md bg-[#111736] text-violet-300 border border-[#20285a]"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#1b2c68a0] flex items-center justify-between">
                <Link
                  href={paper.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/25 focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none"
                  aria-label={`Read ${paper.title} on IEEE Xplore`}
                >
                  <span>View on IEEE Xplore</span>
                  <FaExternalLinkAlt size={12} />
                </Link>
                <span className="text-xs text-gray-400 font-mono">IEEE · {paper.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ResearchGate Profile Action */}
      <div className="flex justify-center mt-8 lg:mt-10">
        <Link
          href={personalData.researchGate}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#101435] border border-[#1f295c] hover:border-[#00ccbb] text-gray-200 hover:text-white transition-all shadow-xl hover:shadow-[#00ccbb]/20 font-mono text-xs sm:text-sm font-semibold group cursor-pointer"
          aria-label="ResearchGate Profile - Atul"
        >
          <SiResearchgate className="text-[#00ccbb] group-hover:scale-110 transition-transform" size={22} />
          <span>View Full Research Profile on ResearchGate</span>
          <FaExternalLinkAlt size={12} className="text-gray-400 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </div>
  );
}
