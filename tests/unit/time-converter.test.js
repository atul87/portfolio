import { describe, it, expect } from "vitest";
import { formatDate, timeConverter } from "@/utils/time-converter";

describe("Time & Date Utilities", () => {
  describe("formatDate", () => {
    it("formats ISO timestamps into human-readable US English dates", () => {
      expect(formatDate("2026-04-15T00:00:00.000Z")).toBe("Apr 15, 2026");
      expect(formatDate("2025-12-01T10:30:00.000Z")).toBe("Dec 1, 2025");
    });

    it("handles invalid or missing timestamps gracefully", () => {
      expect(formatDate("")).toBe("Recently");
      expect(formatDate(null)).toBe("Recently");
      expect(formatDate(undefined)).toBe("Recently");
      expect(formatDate("invalid-date-string")).toBe("Recently");
    });
  });

  describe("timeConverter", () => {
    it("returns 'Recently' for invalid inputs", () => {
      expect(timeConverter(null)).toBe("Recently");
      expect(timeConverter("")).toBe("Recently");
      expect(timeConverter("not-a-date")).toBe("Recently");
    });

    it("formats recent timestamps accurately", () => {
      const now = Date.now();
      expect(timeConverter(new Date(now - 1000).toISOString())).toBe("Just now");
      expect(timeConverter(new Date(now - 30 * 1000).toISOString())).toBe("30 seconds ago");
      expect(timeConverter(new Date(now - 5 * 60 * 1000).toISOString())).toBe("5 minutes ago");
      expect(timeConverter(new Date(now - 2 * 60 * 60 * 1000).toISOString())).toBe("2 hours ago");
      expect(timeConverter(new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString())).toBe("3 days ago");
    });
  });
});
