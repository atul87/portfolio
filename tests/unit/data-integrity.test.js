import { describe, it, expect } from "vitest";
import { personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import { galleryData } from "@/utils/data/gallery-data";
import { localBlogs } from "@/utils/data/local-blogs";

describe("Static Data Integrity Suite", () => {
  it("personalData contains required author fields", () => {
    expect(personalData.name).toBeTruthy();
    expect(personalData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(personalData.github).toContain("github.com");
    expect(personalData.linkedIn).toContain("linkedin.com");
  });

  it("projectsData contains unique IDs, non-empty tools, and valid URLs", () => {
    expect(projectsData.length).toBeGreaterThan(0);
    const ids = projectsData.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    for (const project of projectsData) {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(Array.isArray(project.tools)).toBe(true);
      expect(project.tools.length).toBeGreaterThan(0);
      if (project.code) {
        expect(project.code).toMatch(/^https?:\/\//);
      }
      if (project.demo) {
        expect(project.demo).toMatch(/^https?:\/\//);
      }
    }
  });

  it("galleryData has unique IDs and valid category types", () => {
    expect(galleryData.length).toBeGreaterThan(0);
    const ids = galleryData.map((g) => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    const validCategories = new Set([
      "CERTIFICATIONS",
      "ACHIEVEMENTS",
      "INTERNSHIPS",
      "HACKATHONS",
      "SMART INDIA HACKATHON",
      "LOGIC LEAGUE CLUB",
      "RESEARCH",
      "INTERNATIONAL CONFERENCE",
      "IIT WORKSHOPS",
    ]);

    for (const item of galleryData) {
      expect(item.title).toBeTruthy();
      expect(validCategories.has(item.category)).toBe(true);
      expect(item.image).toBeTruthy();
    }
  });

  it("localBlogs contains valid slugs, non-empty titles, and summaries", () => {
    expect(localBlogs.length).toBeGreaterThan(0);
    const slugs = localBlogs.map((b) => b.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);

    for (const blog of localBlogs) {
      expect(blog.slug).toMatch(/^[a-z0-9-]+$/);
      expect(blog.title).toBeTruthy();
      expect(blog.description).toBeTruthy();
      expect(blog.readTime).toBeTruthy();
    }
  });
});
