"use client";

import { useState } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const CATEGORIES = ["All", "AI & ML", "Full-Stack", "Civic & PWA"];

function filterProject(project, category) {
  if (category === "All") return true;
  const tools = project.tools.map((t) => t.toLowerCase());
  const role = project.role.toLowerCase();
  const desc = project.description.toLowerCase();

  if (category === "AI & ML") {
    return (
      tools.some((t) =>
        ["machine learning", "scikit-learn", "gemini ai", "nlp", "pandas", "numpy", "llm", "ai agent", "computer vision", "style transfer"].includes(t)
      ) ||
      role.includes("ml") ||
      role.includes("data science")
    );
  }
  if (category === "Full-Stack") {
    return (
      role.includes("full-stack") ||
      role.includes("frontend") ||
      tools.includes("react") ||
      tools.includes("flask")
    );
  }
  if (category === "Civic & PWA") {
    return (
      tools.includes("pwa") ||
      desc.includes("civic") ||
      desc.includes("delivery")
    );
  }
  return true;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProjects = projectsData.filter((p) => filterProject(p, selectedCategory));

  return (
    <div id='projects' className="relative z-50  my-12 lg:my-24">
      <div className="sticky top-10 z-20">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-20">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-500/20"
                  : "bg-[#11152c] text-gray-400 hover:text-white border border-[#232746]"
              }`}
            >
              {cat}
            </button>
          ))}
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
