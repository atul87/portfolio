import { describe, it, expect } from "vitest";
import { skillsImage } from "@/utils/skill-image";
import { skillsData } from "@/utils/data/skills";

describe("Skill Image Mapping Suite", () => {
  it("every skill in skillsData returns a defined asset mapping", () => {
    expect(skillsData.length).toBeGreaterThan(0);
    for (const skill of skillsData) {
      const asset = skillsImage(skill);
      expect(asset, `Skill '${skill}' must resolve to an asset`).toBeDefined();
      expect(asset, `Skill '${skill}' must not be null`).not.toBeNull();
    }
  });

  it("handles case-insensitivity and variations gracefully", () => {
    expect(skillsImage("python")).toBeDefined();
    expect(skillsImage("PYTHON")).toBeDefined();
    expect(skillsImage("Python")).toBeDefined();
    expect(skillsImage("scikit-learn")).toBeDefined();
    expect(skillsImage("sklearn")).toBeDefined();
  });

  it("returns undefined for unrecognized skill without throwing an error", () => {
    expect(() => skillsImage("unknown-nonexistent-skill-xyz")).not.toThrow();
    expect(skillsImage("unknown-nonexistent-skill-xyz")).toBeUndefined();
  });
});
