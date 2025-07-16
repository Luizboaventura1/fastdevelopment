import { describe, it, expect } from "vitest";
import getFirstName from "../../../utils/getFirstName";

describe("getFirstName()", () => {
  describe("Valid names", () => {
    it("should return first name from full name", () => {
      expect(getFirstName("Jon Doe")).toBe("Jon");
    });

    it("should return single name when no surname exists", () => {
      expect(getFirstName("Jon")).toBe("Jon");
    });

    it("should handle names with multiple spaces", () => {
      expect(getFirstName("  Jon   Doe  ")).toBe("Jon");
    });

    it("should handle hyphenated names", () => {
      expect(getFirstName("Mary-Jane Watson")).toBe("Mary-Jane");
    });
  });

  describe("Invalid values", () => {
    const USERNAME_NOT_FOUND_MESSAGE = "Username not found";

    it("should return an error for undefined", () => {
      expect(getFirstName(undefined)).toBe(USERNAME_NOT_FOUND_MESSAGE);
    });

    it("should return an error for null", () => {
      expect(getFirstName(null)).toBe(USERNAME_NOT_FOUND_MESSAGE);
    });

    it("should return an error for numbers", () => {
      expect(getFirstName(1234)).toBe(USERNAME_NOT_FOUND_MESSAGE);
    });

    it("should return an error for empty input", () => {
      expect(getFirstName("")).toBe(USERNAME_NOT_FOUND_MESSAGE);
    });

    it("should return an error for whitespace-only", () => {
      expect(getFirstName("   ")).toBe(USERNAME_NOT_FOUND_MESSAGE);
    });

    it("should return an error for object input", () => {
      expect(getFirstName({ name: "Jon" })).toBe(USERNAME_NOT_FOUND_MESSAGE);
    });
  });
});
