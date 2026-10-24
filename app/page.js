import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import StatsSection from "./components/homepage/stats";
import Projects from "./components/homepage/projects";
import ResearchSection from "./components/homepage/research";
import Skills from "./components/homepage/skills";
import HobbiesSection from "./components/homepage/hobbies";
import GallerySection from "./components/homepage/gallery";
import WhatIValueSection from "./components/homepage/values";
import { localBlogs } from "@/utils/data/local-blogs";

async function getData() {
  if (!personalData.devUsername) {
    return [];
  }

  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data)
      ? data
          .filter((item) => Boolean(item?.cover_image))
          .sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0))
      : [];
  } catch {
    return [];
  }
};

export default async function Home() {
  const remoteBlogs = await getData();
  const blogs = [...localBlogs, ...remoteBlogs];

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <WhatIValueSection />
      <Experience />
      <Skills />
      <Projects />
      <ResearchSection />
      <Education />
      <HobbiesSection />
      <GallerySection />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};
