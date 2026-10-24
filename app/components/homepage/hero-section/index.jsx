// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiGeeksforgeeks, SiLeetcode, SiResearchgate } from "react-icons/si";

const coderSkills = [
  'Python',
  'Machine Learning',
  'FastAPI',
  'React',
  'Next.js',
  'Generative AI',
  'Multi-Agent Systems',
  'RAG',
  'XGBoost',
  'SHAP',
  'Docker',
  'MongoDB',
];

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        sizes="100vw"
        className="absolute -top-[98px] -z-10"
        priority
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            I&apos;m <span className="text-pink-500">{personalData.name}</span>, an{" "}
            <span className="text-[#16f2b3]">{personalData.designation}</span>.
          </h1>

          <div className="my-12 flex items-center gap-5">
            <Link
              href={personalData.github}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
              aria-label="GitHub Profile"
            >
              <BsGithub size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
              aria-label="LinkedIn Profile"
            >
              <BsLinkedin size={30} />
            </Link>
            <Link
              href={personalData.leetcode}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
              aria-label="LeetCode Profile"
            >
              <SiLeetcode size={30} />
            </Link>
            <Link
              href={personalData.geeksforgeeks}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
              aria-label="GeeksforGeeks Profile"
            >
              <SiGeeksforgeeks size={30} />
            </Link>
            <Link
              href={personalData.code360}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
              aria-label="Naukri Code360 Profile"
            >
              <FaLaptopCode size={30} />
            </Link>
            <Link
              href={personalData.researchGate}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
              aria-label="ResearchGate Profile"
            >
              <SiResearchgate size={30} />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="#contact" className="group flex min-h-11 items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 p-[1px] transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
              <span className="flex h-full items-center gap-1 rounded-full bg-[#0d1224] px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-white transition-all duration-200 ease-out group-hover:gap-3 md:px-8 md:py-4 md:text-sm md:font-semibold">
                Contact me
                <RiContactsFill size={16} />
              </span>
            </Link>

            <Link
              className="flex min-h-11 items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:gap-3 hover:text-white hover:no-underline md:px-8 md:py-4 md:text-sm md:font-semibold"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              download={personalData.resume ? "Atul_Verma_AI_ML_Resume.pdf" : undefined}
              href={personalData.resume || personalData.github}
            >
              <span>{personalData.resume ? "Get Resume" : "View GitHub"}</span>
              {personalData.resume ? <MdDownload size={16} /> : <BsGithub size={16} />}
            </Link>
          </div>

        </div>
        <div className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">{personalData.name}</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">skills:</span>
                <span className="text-gray-400">{` ['`}</span>
                {coderSkills.map((skill, index) => (
                  <span key={skill}>
                    <span className="text-amber-300">{skill}</span>
                    {index < coderSkills.length - 1 && (
                      <span className="text-gray-400">{`', '`}</span>
                    )}
                  </span>
                ))}
                <span className="text-gray-400">{`'],`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span></div>
              <div><span className="text-gray-400">{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
