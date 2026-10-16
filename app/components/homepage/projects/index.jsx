"use client";

import { useState, useMemo } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const CATEGORIES = ["All", "AI & ML", "Full-Stack", "Civic & PWA"];

function filterProject(project, category) {
  if (category === "All") return true;
  const tools = project.tools.map((t) => t.toLowerCase());
  const role = project.role.toLowerCase();
  const desc = project.description.toLowerCase();
  const name = project.name.toLowerCase();

  if (category === "AI & ML") {
    return (
      tools.some((t) =>
        [
          "machine learning",
          "scikit-learn",
          "xgboost",
          "shap",
          "time-series",
          "gemini ai",
          "nlp",
          "pandas",
          "numpy",
          "llm",
          "ai agent",
          "agentic ai",
          "computer vision",
          "style transfer",
        ].includes(t)
      ) ||
      role.includes("ml") ||
      role.includes("data science") ||
      role.includes("ai")
    );
  }
  if (category === "Full-Stack") {
    return (
      role.includes("full-stack") ||
      role.includes("frontend") ||
      tools.includes("react") ||
      tools.includes("flask") ||
      tools.includes("mongodb") ||
      tools.includes("socket.io")
    );
  }
  if (category === "Civic & PWA") {
    return (
      tools.includes("pwa") ||
      desc.includes("civic") ||
      desc.includes("delivery") ||
      name.includes("city") ||
      name.includes("flavour")
    );
  }
  return true;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryCounts = useMemo(() => {
    return {
      "All": projectsData.length,
      "AI & ML": projectsData.filter((p) => filterProject(p, "AI & ML")).length,
      "Full-Stack": projectsData.filter((p) => filterProject(p, "Full-Stack")).length,
      "Civic & PWA": projectsData.filter((p) => filterProject(p, "Civic & PWA")).length,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => filterProject(p, selectedCategory));
  }, [selectedCategory]);

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24 scroll-mt-20">
      <div className="sticky top-10 z-20">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30 pointer-events-none"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md font-semibold tracking-wide">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-20">
        <div className="text-center max-w-2xl mx-auto mb-8 px-4">
          <p className="text-sm md:text-base text-gray-400">
            A curated showcase of autonomous AI agents, machine learning pipelines, and production full-stack systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-500/25 scale-[1.02]"
                  : "bg-[#11152c] text-gray-400 hover:text-white border border-[#232746] hover:border-violet-500/40"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCategory === cat
                    ? "bg-black/25 text-white"
                    : "bg-[#1a1443] text-gray-400"
                }`}
              >
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center text-xs text-gray-500 mb-8">
          Showing <strong className="text-gray-300 font-semibold">{filteredProjects.length}</strong> of {projectsData.length} projects
        </div>

        <div className="flex flex-col gap-6">
          {filteredProjects.map((project, index) => (
            <div
              id={`sticky-card-${index + 1}`}
              key={project.id || index}
              className="sticky-card w-full mx-auto max-w-2xl sticky"
            >
              <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
