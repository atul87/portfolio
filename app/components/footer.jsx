// @flow strict
import Link from 'next/link';
import { personalData } from '@/utils/data/personal-data';
import { FaLaptopCode } from "react-icons/fa";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiGeeksforgeeks, SiResearchgate } from "react-icons/si";

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white pb-12 md:pb-0">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © Portfolio by <Link target="_blank" rel="noopener noreferrer" href={personalData.linkedIn} className="text-[#16f2b3] hover:underline">{personalData.name}</Link>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.github}
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3] transition-colors"
              aria-label="GitHub Profile"
            >
              <BsGithub />
              <span>GitHub</span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.linkedIn}
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <BsLinkedin />
              <span>LinkedIn</span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.geeksforgeeks}
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3] transition-colors"
              aria-label="GeeksforGeeks Profile"
            >
              <SiGeeksforgeeks />
              <span>GFG</span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.code360}
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3] transition-colors"
              aria-label="Code360 Profile"
            >
              <FaLaptopCode />
              <span>Code360</span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.researchGate}
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3] transition-colors"
              aria-label="ResearchGate Profile"
            >
              <SiResearchgate />
              <span>ResearchGate</span>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Footer;
