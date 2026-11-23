import { describe, it, expect } from "vitest";
import { isValidEmail } from "@/utils/check-email";

describe("isValidEmail Utility", () => {
  it("returns true for standard valid email addresses", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("atul.verma@domain.org")).toBe(true);
    expect(isValidEmail("first.last+tag@sub.domain.co")).toBe(true);
  });

  it("returns false for invalid email formats", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("plainaddress")).toBe(false);
    expect(isValidEmail("@missingusername.com")).toBe(false);
    expect(isValidEmail("missingdomain@")).toBe(false);
    expect(isValidEmail("missing.tld@domain")).toBe(false);
    expect(isValidEmail("spaces in@domain.com")).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});
